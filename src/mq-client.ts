import { fetch } from 'extra-fetch'
import { post, put, patch, get, del, IHTTPOptionsTransformer } from 'extra-request'
import { url, pathname, json, text, searchParams, signal, keepalive }
  from 'extra-request/lib/es2018/transformers'
import { ok, toText, toJSON } from 'extra-response'
export { NotFound, Conflict, HTTPClientError } from '@blackglory/http-status'
import { raceAbortSignals, timeoutSignal } from 'extra-promise'
import { Falsy } from 'justypes'

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
  timeout?: number
}

export interface IMQClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

export interface IMQClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export class MQClient {
  constructor(private options: IMQClientOptions) {}

  private getCommonTransformers(
    options: IMQClientRequestOptions | IMQClientRequestOptionsWithoutToken
  ): Array<IHTTPOptionsTransformer | Falsy> {
    const token = 'token' in options
                  ? (options.token ?? this.options.token)
                  : this.options.token

    return [
      url(this.options.server)
    , token && searchParams({ token })
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive)
    ]
  }

  async draft(
    namespace: string
  , priority: number | null = null
  , options: IMQClientRequestOptions = {}
  ): Promise<string> {
    const req = post(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/messages`)
    , json({ priority })
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
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/messages/${id}`)
    , text(payload)
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
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/messages/${id}`)
    , json(payload)
    )

    await fetch(req).then(ok)
  }

  async order(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<string> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/messages`)
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
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/messages/${id}`)
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
    const req = patch(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/messages/${id}/complete`)
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
    const req = patch(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/messages/${id}/fail`)
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
    const req = patch(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/messages/${id}/renew`)
    )

    await fetch(req).then(ok)
  }

  async getAllFailedMessageIds(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/failed-messages`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async abandonAllFailedMessages(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/failed-messages`)
    )

    await fetch(req).then(ok)
  }

  async renewAllFailedMessages(
    namespace: string
  , options: IMQClientRequestOptions = {}
  ): Promise<void> {
    const req = patch(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/failed-messages/renew`)
    )

    await fetch(req).then(ok)
  }

  async clear(namespace: string, options: IMQClientRequestOptions = {}): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}`)
    )

    await fetch(req).then(ok)
  }

  async stats(
    namespace: string
  , options: IMQClientRequestOptionsWithoutToken = {}
  ): Promise<IStats> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/stats`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IStats
  }

  async getAllNamespaces(
    options: IMQClientRequestOptionsWithoutToken = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/mq')
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
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/mq/${namespace}/messages/${id}`)
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
