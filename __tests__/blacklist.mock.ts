import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth } from '@test/utils'

export const server = setupServer(
  rest.get('/api/blacklist', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.put('/api/blacklist/:id', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/api/blacklist/:id', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
