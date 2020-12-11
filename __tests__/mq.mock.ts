import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badJson, badToken } from '@test/utils'

export const server = setupServer(
  rest.post('/mq/:mqId/messages', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(
      ctx.status(200)
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

, rest.get('/mq/:mqId/messages/:messageId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(null)
    )
  })

, rest.post('/mq/:mqId/messages/:messageId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    )
  })

, rest.delete('/mq/:mqId/messages/:messageId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
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
        drafting: 0
      , waiting: 0
      , ordered: 0
      , active: 0
      , completed: 0
      })
    )
  })
)
