/**
 * https://github.com/ptkdev/ptkdev-logger
 */
import Logger, { LoggerOptions } from '@ptkdev/logger'
import { existsSync, fstat, mkdirSync } from 'fs'
import path from 'path'

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

const folderPath = path.join(__dirname, 'logs')

// create direcotry if not exists
if (!existsSync(folderPath)) {
  mkdirSync(folderPath)
}

const logger = new Logger(options)

export default logger
