import { fetch } from 'cross-fetch'
import { post, put, get, del } from 'extra-request'
import { Json } from '@blackglory/types'
import { url, pathname, json, text, searchParam } from 'extra-request/lib/es2018/transformers'
import { ok, toText, toJSON } from 'extra-response'

interface Stats {
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

export class MQClient {
  constructor(private options: MQClientOptions) {}

  async draft(
    queueId: string
  , priority: number | null
  , options: { token?: string } = {}
  ): Promise<string> {
    const token = options.token ?? this.options.token
    const req = post(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages`)
    , token && searchParam('token', token)
    , json({ priority })
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }

  async set(queueId: string, messageId: string, payload: string, options: { token?: string } = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    , text(payload)
    )

    await fetch(req).then(ok)
  }

  async setJSON(queueId: string, messageId: string, payload: Json, options: { token?: string } = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    , json(payload)
    )

    await fetch(req).then(ok)
  }

  async order(queueId: string, options: { token?: string } = {}): Promise<string> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages`)
    , token && searchParam('token', token)
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }

  async get(queueId: string, messageId: string, options?: { token?: string }): Promise<string> {
    return this._get(queueId, messageId, options).then(toText)
  }

  async getJSON(queueId: string, messageId: string, options?: { token?: string }): Promise<Json> {
    return this._get(queueId, messageId, options).then(toJSON)
  }

  async complete(queueId: string, messageId: string, options: { token?: string } = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = post(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    )

    await fetch(req).then(ok)
  }

  async abandon(queueId: string, messageId: string, options: { token?: string } = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    )

    await fetch(req).then(ok)
  }

  async clear(queueId: string, options: { token?: string } = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${queueId}`)
    , token && searchParam('token', token)
    )

    await fetch(req).then(ok)
  }

  async stats(queueId: string): Promise<Stats> {
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${queueId}/stats`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as Stats
  }

  private async _get(queueId: string, messageId: string, options: { token?: string } = {}): Promise<Response> {
    const token =  options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${queueId}/messages/${messageId}`)
    , token && searchParam('token', token)
    )

    return await fetch(req).then(ok)
  }
}
