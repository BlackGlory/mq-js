import { fetch } from 'extra-fetch'
import { Json } from 'justypes'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IMQManagerRequestOptions, MQManagerBase } from './utils'

export class JsonSchemaClient extends MQManagerBase {
  async getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/mq-with-json-schema')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<unknown> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/json-schema`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON)
  }

  async set(
    namespaces: string
  , schema: Json
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/json-schema`)
    , json(schema)
    )

    await fetch(req).then(ok)
  }

  async remove(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/mq/${namespaces}/json-schema`)
    )

    await fetch(req).then(ok)
  }
}
