import { fetch } from 'extra-fetch'
import { Json } from 'justypes'
import { get, put, del } from 'extra-request'
import { appendPathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IMQManagerRequestOptions, Base } from './base'

export class JsonSchemaManager extends Base {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/admin/mq-with-json-schema')
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
  ): Promise<unknown> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/json-schema`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON)
  }

  /**
   * @throws {AbortError}
   */
  async set(
    namespaces: string
  , schema: Json
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/json-schema`)
    , json(schema)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async remove(
    namespaces: string
  , options: IMQManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/mq/${namespaces}/json-schema`)
    )

    await fetch(req).then(ok)
  }
}
