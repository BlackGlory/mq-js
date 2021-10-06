import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IMQManagerRequestOptions, MQManagerBase } from './utils'

interface ITokenPolicy {
  produceTokenRequired: boolean | null
  consumeTokenRequired: boolean | null
  clearTokenRequired: boolean | null
}

export class TokenPolicyClient extends MQManagerBase {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/mq-with-token-policies')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async get(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<ITokenPolicy> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/token-policies`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenPolicy
  }

  /**
   * @throws {AbortError}
   */
  async setProduceTokenRequired(
    namespaces: string
  , val: boolean
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/token-policies/produce-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeProduceTokenRequired(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/token-policies/produce-token-required`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setConsumeTokenRequired(
    namespaces: string
  , val: boolean
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/token-policies/consume-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeConsumeTokenRequired(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/token-policies/consume-token-required`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setClearTokenRequired(
    namespaces: string
  , val: boolean
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/token-policies/clear-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeClearTokenRequired(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/token-policies/clear-token-required`)
    )

    await fetch(req).then(ok)
  }
}
