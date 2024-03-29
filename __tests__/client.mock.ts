import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badJson, badToken } from '@test/utils.js'

export const server = setupServer(
  rest.post('/mq/:mqId/messages', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(
      ctx.status(204)
    , ctx.text('id')
    )
  })

, rest.put('/mq/:mqId/messages/:messageId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.get('/mq/:mqId/messages', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.text('id')
    )
  })

, rest.get('/mq/:mqId/messages/custom-priority', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('X-MQ-Priority', '1')
    , ctx.json({})
    )
  })

, rest.get('/mq/:mqId/messages/default-priority', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('X-MQ-Priority', 'null')
    , ctx.json({})
    )
  })

, rest.delete('/mq/:mqId/messages/:messageId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.patch('/mq/:mqId/messages/:messageId/complete', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.patch('/mq/:mqId/messages/:messageId/fail', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.patch('/mq/:mqId/messages/:messageId/renew', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.get('/mq/:mqId/failed-messages', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    , ctx.json(['namespace'])
    )
  })

, rest.delete('/mq/:mqId/failed-messages', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.patch('/mq/:mqId/failed-messages/renew', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.delete('/mq/:mqId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    )
  })

, rest.get('/mq/:mqId/stats', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json({
        namespace: req.params.mqId
      , drafting: 0
      , waiting: 0
      , ordered: 0
      , active: 0
      , completed: 0
      , failed: 0
      })
    )
  })

, rest.get('/mq', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(['namespace'])
    )
  })
)
