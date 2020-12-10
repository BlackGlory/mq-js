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
    , draftingTimeout: null
    , orderedTimeout: null
    , activeTimeout: null
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

  it('setDraftingTimeout(id: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = 100

    const result = client.setDraftingTimeout(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeDraftingTimeout(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeDraftingTimeout(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setOrderedTimeout(id: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = 100

    const result = client.setOrderedTimeout(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeOrderedTimeout(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeOrderedTimeout(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setActiveTimeout(id: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = 100

    const result = client.setActiveTimeout(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeActiveTimeout(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeActiveTimeout(id)
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
