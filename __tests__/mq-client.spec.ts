import { server } from '@test/mq.mock'
import { MQClient } from '@src/mq-client'
import { TOKEN } from '@test/utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('MQClient', () => {
  it('draft(queueId: string, priority: number | null, options?: { token?: string }): Promise<string>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const priority = null

    const result = client.draft(queueId, priority)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('id')
  })

  it('set(queueId: string, messageId: string, payload: string, options?: { token?: string }): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'
    const payload = ''

    const result = client.set(queueId, messageId, payload)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setJSON(queueId: string, messageId: string, payload: Json, options?: { token?: string }): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'
    const payload = null

    const result = client.setJSON(queueId, messageId, payload)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('active(queueId: string, options?: { token?: string }): Promise<string>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.active(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('id')
  })

  it('get(queueId: string, messageId: string, options?: { token?: string }): Promise<string>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = client.get(queueId, messageId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('null')
  })

  it('getJSON(queueId: string, messageId: string, options?: { token?: string }): Promise<Json>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = client.getJSON(queueId, messageId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe(null)
  })

  it('consume(queueId: string, messageId: string, options?: { token?: string }): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = client.consume(queueId, messageId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('del(queueId: string, messageId: string, options?: { token?: string }): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = client.del(queueId, messageId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('clear(queueId: string, options?: { token?: string }): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.clear(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('stats(queueId: string): Promise<{ draft: number; waiting: number; active: number; completed: number }>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.stats(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      draft: 0
    , waiting: 0
    , active: 0
    , completed: 0
    })
  })
})

function createClient() {
  return new MQClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
