import { server } from '@test/client.mock'
import { MQClient } from '@src/client'
import { TOKEN } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('MQClient', () => {
  test('draft(queueId: string): Promise<string>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.draft(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('id')
  })

  test(`
    set(queueId: string, messageId: string, payload: string): Promise<void>
  `, async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'
    const payload = ''

    const result = client.set(queueId, messageId, payload)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test(`
    setJSON(
      queueId: string
    , messageId: string
    , payload: Json
    ): Promise<void>
  `, async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'
    const payload = null

    const result = client.setJSON(queueId, messageId, payload)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('order(queueId: string): Promise<string>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.order(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('id')
  })

  describe(`
    get(
      queueId: string
    , messageId: string
    ): Promise<{ priority: number | null; payload: string }>
  `, () => {
    test('custom priority', async () => {
      const client = createClient()
      const queueId = 'queue-id'
      const messageId = 'custom-priority'

      const result = client.get(queueId, messageId)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual({
        priority: 1
      , payload: '{}'
      })
    })

    test('default priority', async () => {
      const client = createClient()
      const queueId = 'queue-id'
      const messageId = 'default-priority'

      const result = client.get(queueId, messageId)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual({
        priority: null
      , payload: '{}'
      })
    })
  })

  describe(`
    getJSON(
      queueId: string
    , messageId: string
    ): Promise<{ priority: number | null; payload: Json }>
  `, () => {
    test('custom priority', async () => {
      const client = createClient()
      const queueId = 'queue-id'
      const messageId = 'custom-priority'

      const result = client.getJSON(queueId, messageId)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual({
        priority: 1
      , payload: {}
      })
    })

    test('default priority', async () => {
      const client = createClient()
      const queueId = 'queue-id'
      const messageId = 'default-priority'

      const result = client.getJSON(queueId, messageId)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual({
        priority: null
      , payload: {}
      })
    })
  })

  test('abandon(queueId: string, messageId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = client.abandon(queueId, messageId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('complete(queueId: string, messageId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = client.complete(queueId, messageId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('fail(queueId: string, messageId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = client.fail(queueId, messageId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('renew(queueId: stirng, messageId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = client.renew(queueId, messageId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('getAllFailedMessageIds(queueId: string): Promise<string[]>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.getAllFailedMessageIds(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test('abandonAllFailedMessages(queueId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.abandonAllFailedMessages(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('renewAllFailedMessages(queueId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.renewAllFailedMessages(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('clear(queueId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.clear(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('stats(queueId: string): Promise<Stats>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = client.stats(queueId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      namespace: queueId
    , drafting: 0
    , waiting: 0
    , ordered: 0
    , active: 0
    , completed: 0
    , failed: 0
    })
  })

  test('getAllQueueIds(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getAllNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })
})

function createClient() {
  return new MQClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}