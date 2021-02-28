import { fetch } from 'extra-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { IMQManagerOptions } from './mq-manager'
import { MQManagerRequestOptions } from './types'

interface TokenPolicy {
  produceTokenRequired: boolean | null
  consumeTokenRequired: boolean | null
  clearTokenRequired: boolean | null
}

export class TokenPolicyClient {
  constructor(private options: IMQManagerOptions) {}

  async getIds(options: MQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/mq-with-token-policies')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string, options: MQManagerRequestOptions = {}): Promise<TokenPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as TokenPolicy
  }

  async setProduceTokenRequired(id: string, val: boolean, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/produce-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeProduceTokenRequired(id: string, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/produce-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setConsumeTokenRequired(id: string, val: boolean, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/consume-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeConsumeTokenRequired(id: string, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/consume-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setClearTokenRequired(id: string, val: boolean, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/clear-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeClearTokenRequired(id: string, options: MQManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/token-policies/clear-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
