import { server } from './configuration-manager.mock'
import { ConfigurationManager } from '@manager/configuration-manager'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ConfigurationManager', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createManager()

    const result = client.getNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test('get(namespace: string): Promise<Configuration>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = client.get(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      unique: null
    , draftingTimeout: null
    , orderedTimeout: null
    , activeTimeout: null
    , concurrency: null
    })
  })

  test('setUnique(namespace: string, val: boolean): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = true

    const result = client.setUnique(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('removeUnique(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = client.removeUnique(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('setDraftingTimeout(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = client.setDraftingTimeout(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('removeDraftingTimeout(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = client.removeDraftingTimeout(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('setOrderedTimeout(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = client.setOrderedTimeout(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('removeOrderedTimeout(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = client.removeOrderedTimeout(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('setActiveTimeout(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = client.setActiveTimeout(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('removeActiveTimeout(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = client.removeActiveTimeout(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('setConcurrency(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = client.setConcurrency(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('removeConcurrency(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = client.removeConcurrency(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createManager() {
  return new ConfigurationManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}