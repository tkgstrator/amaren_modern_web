import type { HTTPMethod } from '../enums/http_method'
import type { ParameterEncoding } from '../enums/parameter_encoding'

export type HTTPHeaders = Record<string, string>

export type HTTPParameters = Record<string, string | number | boolean>

export interface RequestType {
  method: HTTPMethod
  path: string
  headers?: HTTPHeaders
  body?: HTTPParameters
  encoding?: ParameterEncoding
}
