import { fetch } from 'extra-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { IMQManagerOptions } from './mq-manager'
import { IMQManagerRequestOptions } from './types'

interface ITokenInfo {
  token: string
  produce: boolean
  consume: boolean
  clear: boolean
}

export class TokenClient {
  constructor(private options: IMQManagerOptions) {}

  async getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/admin/mq-with-tokens')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getTokens(
    namespace: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<ITokenInfo[]> {
    const req = get(
      url(this.options.server)
    , pathname(`/admin/mq/${namespace}/tokens`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenInfo[]
  }

  async addProduceToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/produce`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeProduceToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/produce`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async addConsumeToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/consume`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeConsumeToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/consume`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async addClearToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/clear`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeClearToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/clear`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
