import type { StatusCode } from '../enums/status_code'

type HTTPExceptionOptions = {
  res?: Response
  message?: string
  cause?: unknown
}

export class HTTPException extends Error {
  readonly res?: Response
  readonly status: StatusCode

  constructor(status: StatusCode, options?: HTTPExceptionOptions) {
    super(options?.message)
    this.res = options?.res
    this.status = status
  }
}
