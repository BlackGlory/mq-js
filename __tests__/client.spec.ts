import { server } from '@test/client.mock.js'
import { MQClient } from '@src/client.js'
import { TOKEN } from '@test/utils.js'
import '@test/polyfill.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('MQClient', () => {
  test('draft(queueId: string): Promise<string>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = await client.draft(queueId)

    expect(result).toBe('id')
  })

  test(`
    set(queueId: string, messageId: string, payload: string): Promise<void>
  `, async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'
    const payload = ''

    const result = await client.set(queueId, messageId, payload)

    expect(result).toBeUndefined()
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

    const result = await client.setJSON(queueId, messageId, payload)

    expect(result).toBeUndefined()
  })

  test('order(queueId: string): Promise<string>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = await client.order(queueId)

    expect(result).toBe('id')
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

      const result = await client.get(queueId, messageId)

      expect(result).toEqual({
        priority: 1
      , payload: '{}'
      })
    })

    test('default priority', async () => {
      const client = createClient()
      const queueId = 'queue-id'
      const messageId = 'default-priority'

      const result = await client.get(queueId, messageId)

      expect(result).toEqual({
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

      const result = await client.getJSON(queueId, messageId)

      expect(result).toEqual({
        priority: 1
      , payload: {}
      })
    })

    test('default priority', async () => {
      const client = createClient()
      const queueId = 'queue-id'
      const messageId = 'default-priority'

      const result = await client.getJSON(queueId, messageId)

      expect(result).toEqual({
        priority: null
      , payload: {}
      })
    })
  })

  test('abandon(queueId: string, messageId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = await client.abandon(queueId, messageId)

    expect(result).toBeUndefined()
  })

  test('complete(queueId: string, messageId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = await client.complete(queueId, messageId)

    expect(result).toBeUndefined()
  })

  test('fail(queueId: string, messageId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = await client.fail(queueId, messageId)

    expect(result).toBeUndefined()
  })

  test('renew(queueId: stirng, messageId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'
    const messageId = 'message-id'

    const result = await client.renew(queueId, messageId)

    expect(result).toBeUndefined()
  })

  test('getAllFailedMessageIds(queueId: string): Promise<string[]>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = await client.getAllFailedMessageIds(queueId)

    expect(result).toStrictEqual(['namespace'])
  })

  test('abandonAllFailedMessages(queueId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = await client.abandonAllFailedMessages(queueId)

    expect(result).toBeUndefined()
  })

  test('renewAllFailedMessages(queueId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = await client.renewAllFailedMessages(queueId)

    expect(result).toBeUndefined()
  })

  test('clear(queueId: string): Promise<void>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = await client.clear(queueId)

    expect(result).toBeUndefined()
  })

  test('stats(queueId: string): Promise<Stats>', async () => {
    const client = createClient()
    const queueId = 'queue-id'

    const result = await client.stats(queueId)

    expect(result).toStrictEqual({
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

    const result = await client.getAllNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })
})

function createClient() {
  return new MQClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
