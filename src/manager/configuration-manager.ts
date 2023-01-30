import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { appendPathname, json } from 'extra-request/transformers'
import { ok, toJSON } from 'extra-response'
import { IMQManagerRequestOptions, Base } from './base.js'

interface IConfiguration {
  unique: boolean | null
  draftingTimeout: number | null
  orderedTimeout: number | null
  activeTimeout: number | null
  concurrency: number | null
}

export class ConfigurationManager extends Base {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/admin/mq-with-config')
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
  ): Promise<IConfiguration> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IConfiguration
  }

  /**
   * @throws {AbortError}
   */
  async setUnique(
    namespaces: string
  , val: boolean
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/unique`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeUnique(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/unique`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setDraftingTimeout(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/drafting-timeout`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeDraftingTimeout(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/drafting-timeout`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setOrderedTimeout(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/ordered-timeout`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeOrderedTimeout(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/ordered-timeout`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setActiveTimeout(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/active-timeout`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeActiveTimeout(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/active-timeout`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setConcurrency(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/concurrency`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeConcurrency(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/config/concurrency`)
    )

    await fetch(req).then(ok)
  }
}
