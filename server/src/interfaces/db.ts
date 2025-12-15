/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDbResponseError {
  message: string
}

export interface IDbResponse {
  uid?: number
  list?: any[]
  error?: IDbResponseError
}
