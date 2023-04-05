export type SuccessResponse<T> = {
  status: 'success'
  message: string
  data?: T
}

export const newSuccessResponse = <T>(data: T, message = ''): SuccessResponse<T> => (
  {
    status: 'success',
    message,
    data,
  }
)