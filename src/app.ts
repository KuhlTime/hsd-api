import { json, RequestHandler, urlencoded } from 'express'
import cors from 'cors'
import compression from 'compression'
import Sentry from '@config/sentry'
import env from '@env'
import app from '@config/express'
import Router from '@/routes'
import * as middleware from '@/middlewares'

// == Middlewares ==

// setup express to parse request body as JSON
app.use(json({ limit: '1mb' }))
app.use(urlencoded({ extended: true, limit: '1mb' }))

// setup CORS.
app.use(cors())

// setup compression middle-ware.
app.use(compression())

// setup express to use Sentry as middle-ware.
app.use(Sentry.Handlers.requestHandler() as RequestHandler)
app.use(Sentry.Handlers.tracingHandler() as RequestHandler)

// == Routes ==

// setup routes.
app.use('/', Router)

// every route that can not be resolved
// will return a 404 error.
app.use(middleware.notFound)

// == Error Handling ==

// sentry error handler. (must be the first error handler)
app.use(Sentry.Handlers.errorHandler())

// convert any error to an APIError, if needed
app.use(middleware.error.converter)

// return the error as JSON
app.use(middleware.error.handler)

// == Server ==

// start the server.
app.listen(env.port, () => {
  console.info(`Server is running on port ${env.port}`)
})
