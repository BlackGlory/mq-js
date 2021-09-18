import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IMQManagerRequestOptions, MQManagerBase } from './utils'

export class BlacklistClient extends MQManagerBase {
  async getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/blacklist')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async add(namespaces: string, options: IMQManagerRequestOptions = {}): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/blacklist/${namespaces}`)
    )

    await fetch(req).then(ok)
  }

  async remove(namespaces: string, options: IMQManagerRequestOptions = {}): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/blacklist/${namespaces}`)
    )

    await fetch(req).then(ok)
  }
}
