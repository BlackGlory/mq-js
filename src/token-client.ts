import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IMQManagerRequestOptions, MQManagerBase } from './utils'

interface ITokenInfo {
  token: string
  produce: boolean
  consume: boolean
  clear: boolean
}

export class TokenClient extends MQManagerBase {
  async getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/mq-with-tokens')
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
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespace}/tokens`)
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
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/produce`)
    )

    await fetch(req).then(ok)
  }

  async removeProduceToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/produce`)
    )

    await fetch(req).then(ok)
  }

  async addConsumeToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/consume`)
    )

    await fetch(req).then(ok)
  }

  async removeConsumeToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/consume`)
    )

    await fetch(req).then(ok)
  }

  async addClearToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/clear`)
    )

    await fetch(req).then(ok)
  }

  async removeClearToken(
    namespace: string
  , token: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespace}/tokens/${token}/clear`)
    )

    await fetch(req).then(ok)
  }
}
