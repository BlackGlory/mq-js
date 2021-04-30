import { fetch } from 'extra-fetch'
import { post, put, patch, get, del } from 'extra-request'
import { url, pathname, json, text, searchParam, signal, keepalive } from 'extra-request/lib/es2018/transformers'
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
  keepalive?: boolean
}

export interface IMQClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
}

export interface IMQClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
}

export class MQClient {
  constructor(private options: IMQClientOptions) {}

  async draft(
    namespace: string
  , priority: number | null = null
  , options: IMQClientRequestOptions = {}
  ): Promise<string> {
    const token = options.token ?? this.options.token
    const req = post(
      url(this.options.server)
    , pathname(`/mq/${namespace}/messages`)
    , token && searchParam('token', token)
    , json({ priority })
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async set(
    namespace: string
  , id: string
  , payload: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/mq/${namespace}/messages/${id}`)
    , token && searchParam('token', token)
    , text(payload)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async setJSON<T>(
    namespace: string
  , id: string
  , payload: T
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/mq/${namespace}/messages/${id}`)
    , token && searchParam('token', token)
    , json(payload)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async order(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<string> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${namespace}/messages`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async get(
    namespace: string
  , id: string
  , options?: IMQClientRequestOptions
  ): Promise<{ priority: number | null, payload: string }> {
    const res = await this._get(namespace, id, options)
    const priority = parsePriority(res)
    const payload = await toText(res)

    return { priority, payload }
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async getJSON<T>(
    namespace: string
  , id: string
  , options?: IMQClientRequestOptions
  ): Promise<{ priority: number | null, payload: T }> {
    const res = await this._get(namespace, id, options)
    const priority = parsePriority(res)
    const payload = await toJSON(res) as T

    return { priority, payload }
  }

  /**
   * @throws {NotFound}
   */
  async abandon(
    namespace: string
  , id: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${namespace}/messages/${id}`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async complete(
    namespace: string
  , id: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = patch(
      url(this.options.server)
    , pathname(`/mq/${namespace}/messages/${id}/complete`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async fail(
    namespace: string
  , id: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = patch(
      url(this.options.server)
    , pathname(`/mq/${namespace}/messages/${id}/fail`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {NotFound}
   * @throws {Conflict}
   */
  async renew(
    namespace: string
  , id: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = patch(
      url(this.options.server)
    , pathname(`/mq/${namespace}/messages/${id}/renew`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async getAllFailedMessageIds(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<string[]> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${namespace}/failed-messages`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async abandonAllFailedMessages(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${namespace}/failed-messages`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async renewAllFailedMessages(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = patch(
      url(this.options.server)
    , pathname(`/mq/${namespace}/failed-messages/renew`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async clear(namespace: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/mq/${namespace}`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async stats(
    namespace: string
  , options: IMQClientRequestOptionsWithoutToken = {}
  ): Promise<IStats> {
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${namespace}/stats`)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IStats
  }

  async getAllNamespaces(
    options: IMQClientRequestOptionsWithoutToken = {}
  ): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/mq')
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  private async _get(
    namespace: string
  , id: string
  , options: IMQClientRequestOptions = {}
  ): Promise<Response> {
    const token =  options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/mq/${namespace}/messages/${id}`)
    , token && searchParam('token', token)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
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
