import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import log from '@log'
import env from '@env'

if (!env.sentryDsn) {
  log.warning('Sentry DSN not set. Skipping Sentry.')
} else {
  Sentry.init({
    dsn: env.sentryDsn,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  })

  const transaction = Sentry.startTransaction({
    op: 'test',
    name: 'My First Test Transaction'
  })

  setTimeout(() => {
    try {
      throw new Error('Oops!')
    } catch (e) {
      Sentry.captureException(e)
    } finally {
      transaction.finish()
    }
  }, 99)
}
