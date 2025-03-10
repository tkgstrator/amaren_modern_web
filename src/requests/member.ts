import { HTTPMethod } from '../enums/http_method'
import { ParameterEncoding } from '../enums/parameter_encoding'
import type { HTTPHeaders, HTTPParameters, RequestType } from './request_type'

export class MemberQuery implements RequestType {
  method = HTTPMethod.GET
  path = 'members'
  headers?: HTTPHeaders | undefined = undefined
  body?: HTTPParameters | undefined = undefined
  encoding?: ParameterEncoding | undefined = ParameterEncoding.JSON
}
