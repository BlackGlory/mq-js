import { server } from '@test/configuration.mock'
import { ConfigurationClient } from '@src/configuration-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ConfigurationClient', () => {
  it('getIds(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getIds()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  it('get(id: string): Promise<Configuration>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.get(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      unique: null
    , enqueueTimeout: null
    , dequeueTimeout: null
    , consumeTimeout: null
    , concurrency: null
    , throttle: null
    })
  })

  it('setUnique(id: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = true

    const result = client.setUnique(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeUnique(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeUnique(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setEnqueueTimeout(id: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = 100

    const result = client.setEnqueueTimeout(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeEnqueueTimeout(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeEnqueueTimeout(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setDequeueTimeout(id: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = 100

    const result = client.setDequeueTimeout(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeDequeueTimeout(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeDequeueTimeout(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setConsumeTimeout(id: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = 100

    const result = client.setConsumeTimeout(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeConsumeTimeout(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeConsumeTimeout(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setConcurrency(id: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = 100

    const result = client.setConcurrency(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeConcurrency(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeConcurrency(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setThrottle(id: string, val: { duration: number; limit: number }): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = {
      duration: 100
    , limit: 100
    }

    const result = client.setThrottle(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeThrottle(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeThrottle(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new ConfigurationClient({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
