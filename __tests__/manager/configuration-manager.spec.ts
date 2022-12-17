import { server } from './configuration-manager.mock'
import { ConfigurationManager } from '@manager/configuration-manager'
import { ADMIN_PASSWORD } from '@test/utils'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ConfigurationManager', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createManager()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test('get(namespace: string): Promise<Configuration>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.get(namespace)

    expect(result).toStrictEqual({
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

    const result = await client.setUnique(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeUnique(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeUnique(namespace)

    expect(result).toBeUndefined()
  })

  test('setDraftingTimeout(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = await client.setDraftingTimeout(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeDraftingTimeout(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeDraftingTimeout(namespace)

    expect(result).toBeUndefined()
  })

  test('setOrderedTimeout(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = await client.setOrderedTimeout(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeOrderedTimeout(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeOrderedTimeout(namespace)

    expect(result).toBeUndefined()
  })

  test('setActiveTimeout(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = await client.setActiveTimeout(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeActiveTimeout(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeActiveTimeout(namespace)

    expect(result).toBeUndefined()
  })

  test('setConcurrency(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = await client.setConcurrency(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeConcurrency(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeConcurrency(namespace)

    expect(result).toBeUndefined()
  })
})

function createManager() {
  return new ConfigurationManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
