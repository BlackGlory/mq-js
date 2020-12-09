import { fetch } from 'cross-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'

interface TokenPolicy {
  produceTokenRequired: boolean | null
  consumeTokenRequired: boolean | null
  clearTokenRequired: boolean | null
}

export interface TokenPolicyClientOptions {
  server: string
  adminPassword: string
}

export class TokenPolicyClient {
  constructor(private options: TokenPolicyClientOptions) {}

  async getIds(): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/mq-with-token-policies')
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string): Promise<TokenPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies`)
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as TokenPolicy
  }

  async setProduceTokenRequired(id: string, val: boolean): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/produce-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeProduceTokenRequired(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/produce-token-required`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setConsumeTokenRequired(id: string, val: boolean): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/consume-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeConsumeTokenRequired(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/consume-token-required`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setClearTokenRequired(id: string, val: boolean): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/clear-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeClearTokenRequired(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/clear-token-required`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }
}
