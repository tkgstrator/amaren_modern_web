import { enqueueSnackbar } from 'notistack'
import { ZodError, type ZodSchema } from 'zod'
import { ParameterEncoding } from '../enums/parameter_encoding'
import type { StatusCode } from '../enums/status_code'
import I18n from '../utils/i18n'
import { HTTPException } from './http_exception'
import type { RequestType } from './request_type'

export const request = async <S extends RequestType, T, U>(
  request: S,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  schema: ZodSchema<T, any, U>
): Promise<T> => {
  const url = new URL(request.path, import.meta.env.VITE_API_URL)
  if (request.encoding === ParameterEncoding.QUERY && request.body !== undefined) {
    url.search = new URLSearchParams(
      Object.entries(request.body).map(([key, value]) => [key, value.toString()])
    ).toString()
  }
  if (request.encoding === ParameterEncoding.JSON) {
    request.headers = { ...request.headers, ...{ 'Content-Type': 'application/json' } }
  }
  if (request.encoding === ParameterEncoding.FORM) {
    request.headers = { ...request.headers, ...{ 'Content-Type': 'application/x-www-form-urlencoded' } }
  }
  if (request.method === 'GET') {
    request.body = undefined
  }
  try {
    const response = await fetch(url.href, {
      method: request.method,
      headers: request.headers,
      credentials: 'same-origin',
      // credentials: 'include',
      body:
        request.body === undefined
          ? undefined
          : request.encoding === ParameterEncoding.JSON
            ? JSON.stringify(request.body)
            : new URLSearchParams(Object.entries(request.body).map(([key, value]) => [key, value.toString()]))
    })
    if (response.ok) {
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        return schema.parse(await response.json())
      }
      return schema.parse(await response.text())
    }
    throw new HTTPException(response.status as StatusCode, { message: response.statusText })
  } catch (error) {
    const { t } = I18n
    // 非同期通信でエラー発生時にはnotistackを利用してメッセージを表示する
    // NOTE: 非同期通信でのエラーはErrorBoundaryでは吸収できないため
    if (error instanceof TypeError) {
      // Logger.error('[TypeError]:', error, error.message)
      enqueueSnackbar(error.message, { variant: 'error' })
      throw error
    }
    if (error instanceof HTTPException) {
      // Logger.error('[HTTPException]:', error)
      enqueueSnackbar(t(`errors.${error.status}`, { ns: 'common' }), { variant: 'warning' })
      throw error
    }
    if (error instanceof ZodError) {
      // Logger.error('[ZodError]:', error)
      error.errors.map((error) => enqueueSnackbar(error.message, { variant: 'error' }))
      throw error
    }
    throw error
  }
}
