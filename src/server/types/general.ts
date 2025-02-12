export type GenericResponse = {
  message: string
}

export type GenericErrorResponse = {
  error: string
}

export interface GeneralResponse<T> {
  status: string
  data: T[]
}
