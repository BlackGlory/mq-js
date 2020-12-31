import { fetch } from 'cross-fetch'
import { post, put, get, del } from 'extra-request'
import { url, pathname, json, text, searchParam, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toText, toJSON } from 'extra-response'

interface Stats {
  id: string
  drafting: number
  waiting: number
  ordered: number
  active: number
  completed: number
}

export interface MQClientOptions {
  server: string
  token?: string
}

export interface MQClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

export class MQClient {
  constructor(private options: MQClientOptions) {}

  async draft(
    queueId: string
  , priority: number | null
  , options: MQClientRequestOptions = {}
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

  async set(queueId: string, messageId: string, payload: string, options: MQClientRequestOptions = {}): Promise<void> {
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

  async setJSON<T>(queueId: string, messageId: string, payload: T, options: MQClientRequestOptions = {}): Promise<void> {
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

  async order(queueId: string, options: MQClientRequestOptions = {}): Promise<string> {
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

  async get(queueId: string, messageId: string, options?: MQClientRequestOptions): Promise<string> {
    return this._get(queueId, messageId, options).then(toText)
  }

  async getJSON<T>(queueId: string, messageId: string, options?: MQClientRequestOptions): Promise<T> {
    return this._get(queueId, messageId, options).then(toJSON) as Promise<T>
  }

  async complete(queueId: string, messageId: string, options: MQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = post(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async abandon(queueId: string, messageId: string, options: MQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async clear(queueId: string, options: MQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${queueId}`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async stats(queueId: string, options: MQClientRequestOptions = {}): Promise<Stats> {
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${queueId}/stats`)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as Stats
  }

  private async _get(queueId: string, messageId: string, options: MQClientRequestOptions = {}): Promise<Response> {
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
