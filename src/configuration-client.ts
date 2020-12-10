import { fetch } from 'cross-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'

interface Configuration {
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

export interface ConfigurationClientOptions {
  server: string
  adminPassword: string
}

export class ConfigurationClient {
  constructor(private options: ConfigurationClientOptions) {}

  async getIds(): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/mq-with-configurations')
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string): Promise<Configuration> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations`)
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as Configuration
  }

  async setUnique(id: string, val: boolean): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/unique`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeUnique(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/unique`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setDraftingTimeout(id: string, val: number): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/drafting-timeout`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeDraftingTimeout(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/drafting-timeout`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setOrderedTimeout(id: string, val: number): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/ordered-timeout`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeOrderedTimeout(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/ordered-timeout`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setActiveTimeout(id: string, val: number): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/active-timeout`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeActiveTimeout(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/active-timeout`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setConcurrency(id: string, val: number): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/concurrency`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeConcurrency(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/concurrency`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setThrottle(
    id: string
  , val: {
      duration: number
      limit: number
    }
  ): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/throttle`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeThrottle(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/mq/${id}/configurations/throttle`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }
}
