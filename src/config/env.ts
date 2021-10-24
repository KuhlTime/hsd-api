import * as dotenv from 'dotenv'
import Joi from 'joi'
import { env, exit } from 'process'
import log from '@log'

// load the .env file
dotenv.config()

const envSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  SENTRY_DSN: Joi.string().allow(''),
  PORT: Joi.number().default(8080),
  FIREBASE_SERVICE_ACC_BASE64: Joi.string().base64().required()
}).unknown()

// validate environment variables
const { error, value: envVars } = envSchema.validate(env)

if (error) {
  log.error(`Config validation error: ${error.message}`)
  exit(1)
}

// log the environment nodejs is running in
log.info(`Running in ${envVars.NODE_ENV} mode`)

export default {
  /**
   * The environment mode.
   */
  nodeEnv: envVars.NODE_ENV as string,

  /**
   * The port to run the server on
   */
  port: envVars.PORT as number,

  /**
   * (Optional) The Sentry DSN to use for error reporting
   */
  sentryDsn: envVars.SENTRY_DSN as string | undefined,

  /**
   * The decoded Firebase service account credentials object
   */
  firebaseServiceAccount: JSON.parse(
    Buffer.from(envVars.FIREBASE_SERVICE_ACC_BASE64, 'base64').toString()
  )
}
