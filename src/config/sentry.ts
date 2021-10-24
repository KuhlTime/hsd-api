import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import app from '@config/express'
import env from '@env'

if (!env.sentryDsn) {
  console.warn('Sentry DSN not set. Skipping Sentry.')
} else {
  // Initialize Sentry
  // https://docs.sentry.io/platforms/node/configuration/options/
  Sentry.init({
    dsn: env.sentryDsn,
    // debug: env.nodeEnv === 'development',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app })
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  })
}

export default Sentry
