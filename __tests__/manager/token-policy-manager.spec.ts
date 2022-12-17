import { server } from './token-policy-manager.mock'
import { TokenPolicyManager } from '@manager/token-policy-manager'
import { ADMIN_PASSWORD } from '@test/utils'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TokenPolicyManager', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createManager()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test(`
    get(namespace: string): Promise<{
      produceTokenRequired: boolean | null
      consumeTokenRequired: boolean | null
    }>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.get(namespace)

    expect(result).toStrictEqual({
      produceTokenRequired: true
    , consumeTokenRequired: false
    , clearTokenRequired: null
    })
  })

  test(`
    setProduceTokenRequired(namespace: string, val: boolean): Promise<void>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = true

    const result = await client.setProduceTokenRequired(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeProduceTokenRequired(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeProduceTokenRequired(namespace)

    expect(result).toBeUndefined()
  })

  test(`
    setConsumeTokenRequired(namespace: string, val: boolean): Promise<void>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = true

    const result = await client.setConsumeTokenRequired(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeConsumeTokenRequired(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeConsumeTokenRequired(namespace)

    expect(result).toBeUndefined()
  })

  test(`
    setClearTokenRequired(namespace: string, val: boolean): Promise<void>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = true

    const result = await client.setClearTokenRequired(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeClearTokenRequired(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeClearTokenRequired(namespace)

    expect(result).toBeUndefined()
  })
})

function createManager() {
  return new TokenPolicyManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
