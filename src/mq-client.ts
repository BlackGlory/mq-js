import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy } from 'delight-rpc'
import { IAPI, IMessage, IQueueConfig, IQueueStats, MessageState } from './contract.js'
import { raceAbortSignals, timeoutSignal, isAbortSignal } from 'extra-abort'
import { isString, JSONValue, NonEmptyArray } from '@blackglory/prelude'

export {
  IMessage
, IQueueConfig
, IQueueStats
, MessageState
, AdditionalBehavior
, QueueNotFound
, MessageNotFound
, SlotNotFound
, DuplicateMessage
, DuplicateMessageId
, BadMessageState
} from './contract.js'

export interface IMQClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

export interface IMQClientRequestOptions {
  signal?: AbortSignal
  timeout?: number | false
}

export class MQClient {
  static async create(options: IMQClientOptions): Promise<MQClient> {
    const { client, close } = await createRPCClient(
      options.server
    , options.retryIntervalForReconnection
    , options.timeout
    )
    return new MQClient(client, close, options.timeout)
  }

  private constructor(
    private client: ClientProxy<IAPI>
  , private closeClients: () => Promise<void>
  , private timeout?: number
  ) {}

  async close(): Promise<void> {
    await this.closeClients()
  }

  async getAllQueueIds(
    signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<string[]> {
    return await this.client.getAllQueueIds(
      this.createSignal(signalOrOptions)
    )
  }

  async getQueue(
    queueId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<IQueueConfig | null> {
    return await this.client.getQueue(
      queueId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 队列已存在的情况下, 调用该方法会更新队列的配置, 但有以下注意事项:
   * - 由于旧消息缺乏相应的字段, 旧消息不会因为`unique`启用而去重, 且新消息仍可能会与旧消息的内容重复.
   * - 已经处于`completed`状态的消息不受`behaviorWhenCompleted`的改变影响.
   * - 已经处于`abandoned`状态的消息不受`behaviorWhenAbandoned`的改变影响.
   */
  async setQueue(
    queueId: string
  , config: IQueueConfig
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.setQueue(
      queueId
    , config
    , this.createSignal(signalOrOptions)
    )
  }

  async removeQueue(
    queueId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.removeQueue(
      queueId
    , this.createSignal(signalOrOptions)
    )
  }

  async getQueueStats(
    queueId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<IQueueStats | null> {
    return await this.client.getQueueStats(
      queueId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 重置队列:
   * - 清空队列中的消息.
   * - 重置统计数据.
   */
  async resetQueue(
    queueId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.resetQueue(
      queueId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 产生一个处于`drafting`状态的消息.
   * 
   * @param priority 消息的优先级, 有符号整数, 值越大则优先级越大.
   * `null`为特殊值, 表示无优先级, 代表优先级最低.
   * 如果需要设置优先级, 推荐做法是将`0`视作默认优先级, 在此基础上调整优先级.
   * @throws {QueueNotFound}
   * @throws {DuplicateMessageId}
   */
  async draftMessage(
    queueId: string
  , priority: number | null
  , slotNames: NonEmptyArray<string>
  , messageId?: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<string>
  async draftMessage(
    queueId: string
  , priority: number | null
  , slotNames: NonEmptyArray<string>
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<string>
  async draftMessage(...args:
  | [
      queueId: string
    , priority: number | null
    , slotNames: NonEmptyArray<string>
    , messageId?: string
    , signalOrOptions?: AbortSignal | IMQClientRequestOptions
    ]
  | [
      queueId: string
    , priority: number | null
    , slotNames: NonEmptyArray<string>
    , signalOrOptions?: AbortSignal | IMQClientRequestOptions
    ]
  ): Promise<string> {
    const [
      queueId
    , priority
    , slotNames
    , messageIdOrSignalOrOptions
    , signalOrOptionsOrUndefined
    ] = args

    if (isString(messageIdOrSignalOrOptions)) {
      const messageId = messageIdOrSignalOrOptions
      const signalOrOptions = signalOrOptionsOrUndefined

      return await this.client.draftMessage(
        queueId
      , priority
      , slotNames
      , messageId
      , this.createSignal(signalOrOptions)
      )
    } else {
      const signalOrOptions = messageIdOrSignalOrOptions ?? signalOrOptionsOrUndefined

      return await this.client.draftMessage(
        queueId
      , priority
      , slotNames
      , this.createSignal(signalOrOptions)
      )
    }
  }

  /**
   * 当消息的每个slot都有值时, 消息将从`drafting`转为`waiting`状态.
   * 
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   * @throws {SlotNotFound}
   * @throws {BadMessageState}
   * @throws {DuplicateMessage}
   */
  async setMessageSlot(
    queueId: string
  , messageId: string
  , slotName: string
  , value: JSONValue
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.setMessageSlot(
      queueId
    , messageId
    , slotName
    , value
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 从队列中取出一个处于`waiting`状态的消息的id.
   * 该消息将转为`ordered`状态.
   * 
   * @throws {QueueNotFound}
   * @throws {AbortError}
   */
  async orderMessage(
    queueId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<string> {
    return await this.client.orderMessage(
      queueId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 获取一个消息.
   * 对于处于`ordered`状态的消息, 该方法存在副作用, 将导致该消息转为`active`状态.
   * 
   * @throws {QueueNotFound}
   */
  async getMessage(
    queueId: string
  , messageId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<IMessage | null> {
    return await this.client.getMessage(
      queueId
    , messageId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 无副作用地获取一个消息.
   * 
   * @throws {QueueNotFound}
   */
  async peekMessage(
    queueId: string
  , messageId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<IMessage | null> {
    return await this.client.peekMessage(
      queueId
    , messageId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 将一个处于`active`状态的消息转为`completed`状态.
   * 
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   * @throws {BadMessageState}
   */
  async completeMessage(
    queueId: string
  , messageId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.completeMessage(
      queueId
    , messageId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 将一个处于`active`状态的消息转为`failed`状态.
   * 
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   * @throws {BadMessageState}
   */
  async failMessage(
    queueId: string
  , messageId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.failMessage(
      queueId
    , messageId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 将一个处于`renew`状态的消息转为`waiting`状态.
   * 
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   * @throws {BadMessageState}
   */
  async renewMessage(
    queueId: string
  , messageId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.renewMessage(
      queueId
    , messageId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 将一个消息转为`abandoned`状态.
   * 
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   */
  async abandonMessage(
    queueId: string
  , messageId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.abandonMessage(
      queueId
    , messageId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * @throws {QueueNotFound}
   */
  async removeMessage(
    queueId: string
  , messageId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.removeMessage(
      queueId
    , messageId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * @throws {QueueNotFound}
   */
  async abandonAllFailedMessages(
    queueId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.abandonAllFailedMessages(
      queueId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * @throws {QueueNotFound}
   */
  async renewAllFailedMessages(
    queueId: string
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.renewAllFailedMessages(
      queueId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * @throws {QueueNotFound}
   */
  async getMessageIdsByState(
    queueId: string
  , state: MessageState
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<string[]> {
    return await this.client.getMessageIdsByState(
      queueId
    , state
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 根据状态清空队列中的消息.
   * 统计数据的对应项目将减去删除的消息数量.
   * 
   * @throws {QueueNotFound}
   */
  async clearMessagesByState(
    queueId: string
  , state: MessageState
  , signalOrOptions?: AbortSignal | IMQClientRequestOptions
  ): Promise<void> {
    await this.client.clearMessagesByState(
      queueId
    , state
    , this.createSignal(signalOrOptions)
    )
  }

  private createSignal(
    signalOrOptions: AbortSignal | IMQClientRequestOptions = {}
  ): AbortSignal {
    const options: IMQClientRequestOptions = isAbortSignal(signalOrOptions)
                                           ? { signal: signalOrOptions }
                                           : signalOrOptions

    return raceAbortSignals([
      options.signal
    , options.timeout !== false && (
        (options.timeout && timeoutSignal(options.timeout)) ??
        (this.timeout && timeoutSignal(this.timeout))
      )
    ])
  }
}
