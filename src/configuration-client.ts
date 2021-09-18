import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IMQManagerRequestOptions, MQManagerBase } from './utils'

interface IConfiguration {
  unique: boolean | null
  draftingTimeout: number | null
  orderedTimeout: number | null
  activeTimeout: number | null
  concurrency: number | null
  throttle: {
    duration: number
    limit: number
  } | null
}

export class ConfigurationClient extends MQManagerBase {
  async getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/mq-with-config')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<IConfiguration> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IConfiguration
  }

  async setUnique(
    namespaces: string
  , val: boolean
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/unique`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeUnique(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/unique`)
    )

    await fetch(req).then(ok)
  }

  async setDraftingTimeout(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/drafting-timeout`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeDraftingTimeout(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/drafting-timeout`)
    )

    await fetch(req).then(ok)
  }

  async setOrderedTimeout(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/ordered-timeout`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeOrderedTimeout(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/ordered-timeout`)
    )

    await fetch(req).then(ok)
  }

  async setActiveTimeout(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/active-timeout`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeActiveTimeout(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/active-timeout`)
    )

    await fetch(req).then(ok)
  }

  async setConcurrency(
    namespaces: string
  , val: number
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/concurrency`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeConcurrency(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/concurrency`)
    )

    await fetch(req).then(ok)
  }

  async setThrottle(
    namespaces: string
  , val: {
      duration: number
      limit: number
    }
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/throttle`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeThrottle(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/config/throttle`)
    )

    await fetch(req).then(ok)
  }
}
