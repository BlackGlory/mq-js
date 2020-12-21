import { fetch } from 'cross-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { MQManagerOptions } from './mq-manager'
import { MQManagerRequestOptions } from './types'

interface TokenInfo {
  token: string
  produce: boolean
  consume: boolean
  clear: boolean
}

export class TokenClient {
  constructor(private options: MQManagerOptions) {}

  async getIds(options: MQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/mq-with-tokens')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getTokens(id: string, options: MQManagerRequestOptions = {}): Promise<TokenInfo[]> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as TokenInfo[]
  }

  async addProduceToken(id: string, token: string, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/produce`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeProduceToken(id: string, token: string, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/produce`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async addConsumeToken(id: string, token: string, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/consume`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeConsumeToken(id: string, token: string, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/consume`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async addClearToken(id: string, token: string, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/clear`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeClearToken(id: string, token: string, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/clear`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
