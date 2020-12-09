import { server } from '@test/token-policy.mock'
import { TokenPolicyClient } from '@src/token-policy-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TokenPolicyClient', () => {
  it('getIds(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getIds()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  it('get(id: string): Promise<{ publishTokenRequired: boolean | null; consumeTokenRequired: boolean | null }>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.get(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      publishTokenRequired: true
    , consumeTokenRequired: false
    , clearTokenRequired: null
    })
  })

  it('setPublishTokenRequired(id: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = true

    const result = client.setPublishTokenRequired(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removePublishTokenRequired(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removePublishTokenRequired(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setConsumeTokenRequired(id: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = true

    const result = client.setConsumeTokenRequired(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeConsumeTokenRequired(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeConsumeTokenRequired(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setClearTokenRequired(id: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = true

    const result = client.setClearTokenRequired(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeClearTokenRequired(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeClearTokenRequired(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new TokenPolicyClient({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
