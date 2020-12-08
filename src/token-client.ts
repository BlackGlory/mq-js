import { fetch } from 'cross-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'

interface TokenInfo {
  token: string
  publish: boolean
  consume: boolean
  clear: boolean
}

export interface TokenClientOptions {
  server: string
  adminPassword: string
}

export class TokenClient {
  constructor(private options: TokenClientOptions) {}

  async getIds(): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/mq-with-tokens')
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getTokens(id: string): Promise<TokenInfo[]> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens`)
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as TokenInfo[]
  }

  async addPublishToken(id: string, token: string): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/publish`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async removePublishToken(id: string, token: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/publish`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async addConsumeToken(id: string, token: string): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/consume`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async removeConsumeToken(id: string, token: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/consume`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async addClearToken(id: string, token: string): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/clear`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async removeClearToken(id: string, token: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/tokens/${token}/clear`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }
}
