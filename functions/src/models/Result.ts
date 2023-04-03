// https://yatsbashy.hatenablog.com/entry/typescript-simple-result

export type Result<T, E> = Success<T> | Failure<E>

type Success<T> = {
  readonly isSuccess: true
  readonly isFailure: false
  readonly value: T
}

type Failure<E> = {
  readonly isSuccess: false
  readonly isFailure: true
  readonly value: E
}

export const newSuccess = <T>(value: T): Success<T> => (
  {
    isSuccess: true,
    isFailure: false,
    value,
  }
)

export const newFailure = <E>(value: E): Failure<E> => (
  {
    isSuccess: false,
    isFailure: true,
    value,
  }
)