# mq-js
## Install
```sh
npm install --save @blackglory/mq-js
# or
yarn add @blackglory/mq-js
```

## API
### MQClient
```ts
interface IMQClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

interface IQueueConfig extends JSONObject {
  unique: boolean
  draftingTimeout: number
  orderedTimeout: number
  activeTimeout: number
  concurrency: number | null
  behaviorWhenCompleted: AdditionalBehavior
  behaviorWhenAbandoned: AdditionalBehavior
}

interface IMessage {
  slots: Record<string, JSONValue>
  priority: number | null
  state: MessageState
}

interface IQueueStats {
  drafting: number
  waiting: number
  ordered: number
  active: number
  failed: number
  completed: number
  abandoned: number
}

enum MessageState {
  Drafting
, Waiting
, Ordered
, Active
, Failed
, Completed
, Abandoned
}

enum AdditionalBehavior {
  None
, RemoveMessage
, RemoveAllSlots
}

class QueueNotFound extends CustomError {}
class MessageNotFound extends CustomError {}
class SlotNotFound extends CustomError {}
class DuplicateMessage extends CustomError {}
class BadMessageState extends CustomError {}

class MQClient {
  static create(options: IMQClientOptions): Promise<MQClient>

  close(): Promise<void>

  getAllQueueIds(signal?: AbortSignal): Promise<string[]>

  getQueue(queueId: string, signal?: AbortSignal): Promise<IQueueConfig | null>

  setQueue(queueId: string, config: IQueueConfig, signal?: AbortSignal): Promise<void>

  removeQueue(queueId: string, signal?: AbortSignal): Promise<void>

  getQueueStats(queueId: string, signal?: AbortSignal): Promise<IQueueStats | null>

  resetQueue(queueId: string, signal?: AbortSignal): Promise<void>

  /**
   * @throws {QueueNotFound}
   */
  draftMessage(
    queueId: string
  , priority: number | null
  , slotNames: NonEmptyArray<string>
  , signal?: AbortSignal
  ): Promise<string>

  /**
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   * @throws {SlotNotFound}
   * @throws {BadMessageState}
   * @throws {DuplicateMessage}
   */
  setMessageSlot(
    queueId: string
  , messageId: string
  , slotName: string
  , value: JSONValue
  , signal?: AbortSignal
  ): Promise<void>

  /**
   * @throws {QueueNotFound}
   * @throws {AbortError}
   */
  orderMessage(queueId: string, signal?: AbortSignal): Promise<string>

  /**
   * @throws {QueueNotFound}
   */
  getMessage(
    queueId: string
  , messageId: string
  , signal?: AbortSignal
  ): Promise<IMessage | null>

  /**
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   * @throws {BadMessageState}
   */
  completeMessage(queueId: string, messageId: string, signal?: AbortSignal): Promise<void>

  /**
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   * @throws {BadMessageState}
   */
  failMessage(queueId: string, messageId: string, signal?: AbortSignal): Promise<void>

  /**
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   * @throws {BadMessageState}
   */
  renewMessage(queueId: string, messageId: string, signal?: AbortSignal): Promise<void>

  /**
   * @throws {QueueNotFound}
   * @throws {MessageNotFound}
   */
  abandonMessage(queueId: string, messageId: string, signal?: AbortSignal): Promise<void>

  /**
   * @throws {QueueNotFound}
   */
  removeMessage(queueId: string, messageId: string, signal?: AbortSignal): Promise<void>

  /**
   * @throws {QueueNotFound}
   */
  abandonAllFailedMessages(queueId: string, signal?: AbortSignal): Promise<void>

  /**
   * @throws {QueueNotFound}
   */
  renewAllFailedMessages(queueId: string, signal?: AbortSignal): Promise<void>

  /**
   * @throws {QueueNotFound}
   */
  getMessageIdsByState(
    queueId: string
  , state: MessageState
  , signal?: AbortSignal
  ): Promise<string[]>

  /**
   * @throws {QueueNotFound}
   */
  clearMessagesByState(
    queueId: string
  , state: MessageState
  , signal?: AbortSignal
  ): Promise<void>
}
```
