import * as dotenv from 'dotenv'
import Joi from 'joi'
import { exit } from 'process'
import log from '@log'

// load the .env file
dotenv.config()

const envSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  SENTRY_DSN: Joi.string().allow(''),
  FIREBASE_SERVICE_ACC_BASE64: Joi.string().base64().required()
}).unknown()

// validate environment variables
const { error, value: envVars } = envSchema.validate(process.env)

if (error) {
  log.error(`Config validation error: ${error.message}`)
  exit(1)
}

// log the environment nodejs is running in
log.info(`Running in ${envVars.NODE_ENV} mode`)

export default {
  nodeEnv: envVars.NODE_ENV as string,
  sentryDsn: envVars.SENTRY_DSN as string | undefined,
  // decode base64 encoded envVars.FIREBASE_SERVICE_ACC_BASE64
  firebaseServiceAccount: JSON.parse(
    Buffer.from(envVars.FIREBASE_SERVICE_ACC_BASE64, 'base64').toString()
  )
}
