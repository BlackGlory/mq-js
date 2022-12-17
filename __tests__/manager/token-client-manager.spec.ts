import { server } from './token-manager.mock'
import { TokenManager } from '@manager/token-manager'
import { ADMIN_PASSWORD } from '@test/utils'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TokenManager', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createManager()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test(`
    getTokens(
      namespace: string
    ): Promise<Array<{ token: string; write: boolean; read: boolean }>>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.getTokens(namespace)

    expect(result).toStrictEqual([{
      token: 'token'
    , produce: true
    , consume: false
    , clear: false
    }])
  })

  test('addProduceToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.addProduceToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test(`
    removeProduceToken(namespace: string, token: string): Promise<void>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.removeProduceToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test('addConsumeToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.addConsumeToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test(`
    removeConsumeToken(namespace: string, token: string): Promise<void>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.removeConsumeToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test('addClearToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.addClearToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test(`
    removeClearToken(namespace: string, token: string): Promise<void>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.removeClearToken(namespace, token)

    expect(result).toBeUndefined()
  })
})

function createManager() {
  return new TokenManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
