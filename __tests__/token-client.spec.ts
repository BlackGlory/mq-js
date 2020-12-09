import { server } from '@test/token.mock'
import { TokenClient } from '@src/token-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TokenClient', () => {
  it('getIds(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getIds()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  it('getTokens(id: string): Promise<Array<{ token: string; write: boolean; read: boolean }>>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.getTokens(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual([{
      token: 'token'
    , produce: true
    , consume: false
    , clear: false
    }])
  })

  it('addProduceToken(id: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const token = 'token'

    const result = client.addProduceToken(id, token)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeProduceToken(id: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const token = 'token'

    const result = client.removeProduceToken(id, token)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('addConsumeToken(id: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const token = 'token'

    const result = client.addConsumeToken(id, token)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeConsumeToken(id: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const token = 'token'

    const result = client.removeConsumeToken(id, token)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('addClearToken(id: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const token = 'token'

    const result = client.addClearToken(id, token)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeClearToken(id: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const token = 'token'

    const result = client.removeClearToken(id, token)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new TokenClient({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
