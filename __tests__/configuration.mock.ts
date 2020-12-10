import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth, badJson } from '@test/utils'

export const server = setupServer(
  rest.get('/api/mq-with-configurations', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.get('/api/mq/:id/configurations', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json({
        unique: null
      , draftingTimeout: null
      , orderedTimeout: null
      , activeTimeout: null
      , concurrency: null
      , throttle: null
      })
    )
  })

, rest.put('/api/mq/:id/configurations/unique', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/api/mq/:id/configurations/unique', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/api/mq/:id/configurations/drafting-timeout', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/api/mq/:id/configurations/drafting-timeout', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/api/mq/:id/configurations/ordered-timeout', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/api/mq/:id/configurations/ordered-timeout', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/api/mq/:id/configurations/active-timeout', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/api/mq/:id/configurations/active-timeout', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/api/mq/:id/configurations/concurrency', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/api/mq/:id/configurations/concurrency', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/api/mq/:id/configurations/throttle', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/api/mq/:id/configurations/throttle', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
