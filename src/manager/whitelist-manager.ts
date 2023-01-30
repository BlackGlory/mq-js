import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { appendPathname } from 'extra-request/transformers'
import { ok, toJSON } from 'extra-response'
import { IMQManagerRequestOptions, Base } from './base.js'

export class WhitelistManager extends Base {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IMQManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/admin/whitelist')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async add(namespaces: string, options: IMQManagerRequestOptions = {}): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/whitelist/${namespaces}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async remove(namespaces: string, options: IMQManagerRequestOptions = {}): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/whitelist/${namespaces}`)
    )

    await fetch(req).then(ok)
  }
}
