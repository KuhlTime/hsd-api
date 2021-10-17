/**
 * https://github.com/ptkdev/ptkdev-logger
 */
import Logger, { LoggerOptions } from '@ptkdev/logger'

const options: LoggerOptions = {
  language: 'en',
  colors: true,
  debug: true,
  info: true,
  warning: true,
  error: true,
  sponsor: true,
  write: true,
  type: 'log',
  rotate: {
    size: '10M',
    encoding: 'utf8'
  },
  path: {
    // remember: add string *.log to .gitignore
    debug_log: './logs/debug.log',
    error_log: './logs/errors.log'
  }
}

const logger = new Logger(options)

export default logger
