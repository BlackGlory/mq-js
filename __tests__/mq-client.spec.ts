import { test, expect } from 'vitest'
import { MQClient, AdditionalBehavior, MessageState } from '@src/mq-client.js'

const server = 'ws://mq:8080'

test('MQClient', async () => {
  const client = await MQClient.create({ server })

  const queueId = 'queue-id'
  const priority = null
  const slotName = 'slot'
  const slotValue = 'value'
  try {
    await client.setQueue(queueId, {
      unique: false
    , draftingTimeout: 60_000
    , orderedTimeout: 60_000
    , activeTimeout: 60_000
    , concurrency: null
    , behaviorWhenAbandoned: AdditionalBehavior.None
    , behaviorWhenCompleted: AdditionalBehavior.None
    })
    const messageId = await client.draftMessage(queueId, priority, [slotName])
    await client.setMessageSlot(queueId, messageId, slotName, slotValue)
    expect(await client.orderMessage(queueId)).toBe(messageId)
    const message = await client.getMessage(queueId, messageId)
    await client.completeMessage(queueId, messageId)
    const stats = await client.getQueueStats(queueId)

    expect(message).toStrictEqual({
      slots: { [slotName]: slotValue }
    , priority
    , state: MessageState.Active
    })
    expect(stats).toStrictEqual({
      drafting: 0
    , waiting: 0
    , ordered: 0
    , active: 0
    , failed: 0
    , completed: 1
    , abandoned: 0
    })
  } finally {
    await client.removeQueue(queueId)
    await client.close()
  }
})
