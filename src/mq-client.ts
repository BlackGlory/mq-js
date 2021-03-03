import { fetch } from 'extra-fetch'
import { post, put, patch, get, del } from 'extra-request'
import { url, pathname, json, text, searchParam, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toText, toJSON } from 'extra-response'
export { NotFound, Conflict, HTTPClientError } from '@blackglory/http-status'

interface IStats {
  id: string
  drafting: number
  waiting: number
  ordered: number
  active: number
  completed: number
  failed: number
}

export interface IMQClientOptions {
  server: string
  token?: string
}

export interface IMQClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

export interface IMQClientRequestOptionsWithoutToken {
  signal?: AbortSignal
}

export class MQClient {
  constructor(private options: IMQClientOptions) {}

  async draft(
    queueId: string
  , priority: number | null
  , options: IMQClientRequestOptions = {}
  ): Promise<string> {
    const token = options.token ?? this.options.token
    const req = post(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages`)
    , token && searchParam('token', token)
    , json({ priority })
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async set(queueId: string, messageId: string, payload: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    , text(payload)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async setJSON<T>(queueId: string, messageId: string, payload: T, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    , json(payload)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async order(queueId: string, options: IMQClientRequestOptions = {}): Promise<string> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async get(queueId: string, messageId: string, options?: IMQClientRequestOptions): Promise<{ priority: number | null, payload: string }> {
    const res = await this._get(queueId, messageId, options)
    const priority = parsePriority(res)
    const payload = await toText(res)

    return { priority, payload }
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async getJSON<T>(queueId: string, messageId: string, options?: IMQClientRequestOptions): Promise<{ priority: number | null, payload: T }> {
    const res = await this._get(queueId, messageId, options)
    const priority = parsePriority(res)
    const payload = await toJSON(res) as T

    return { priority, payload }
  }

  /**
   * @throws {NotFound}
   */
  async abandon(queueId: string, messageId: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async complete(queueId: string, messageId: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = patch(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}/complete`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async fail(queueId: string, messageId: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = patch(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}/fail`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async renew(queueId: string, messageId: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = patch(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}/renew`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async getAllFailedMessageIds(queueId: string, options: IMQClientRequestOptions = {}): Promise<string[]> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${queueId}/failed-messages`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async abandonAllFailedMessages(queueId: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${queueId}/failed-messages`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async renewAllFailedMessages(queueId: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = patch(
      url(this.options.server)
    , pathname(`/mq/${queueId}/failed-messages/renew`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async clear(queueId: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${queueId}`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async stats(queueId: string, options: IMQClientRequestOptionsWithoutToken = {}): Promise<IStats> {
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${queueId}/stats`)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IStats
  }

  async getAllQueueIds(options: IMQClientRequestOptionsWithoutToken = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/mq')
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  private async _get(queueId: string, messageId: string, options: IMQClientRequestOptions = {}): Promise<Response> {
    const token =  options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    return await fetch(req).then(ok)
  }
}

function parsePriority(res: Response): number | null {
  const priority = res.headers.get('X-MQ-Priority')
  if (priority && priority !== 'null') {
    return Number.parseInt(priority, 10)
  } else {
    return null
  }
}
