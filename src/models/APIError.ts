/**
 * An extension to the JS default Error class which
 * adds a few extra properties.
 */
export default class APIError extends Error {
  /**
   * The http status code of the error.
   */
  statusCode: number

  /**
   * The stack trace of the error.
   */
  stack?: string

  constructor(statusCode: number, message: string, stack?: string) {
    super(message)

    this.statusCode = statusCode
    this.stack = stack
  }
}
