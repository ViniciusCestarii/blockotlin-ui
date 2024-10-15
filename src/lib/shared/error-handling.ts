import { AxiosError } from 'axios'
import { toast } from 'sonner'

type ErrType = {
  kind: 'error'
  err: Error
}

type OkType<T> = {
  kind: 'ok'
  result: T
}

export type ErrOkType<T> = ErrType | OkType<T>

class Ok<T> implements OkType<T> {
  kind: 'ok' = 'ok' as const
  result: T

  constructor(result: T) {
    this.result = result
  }
}

class Err implements ErrType {
  kind: 'error' = 'error' as const
  err: Error

  constructor(error: Error) {
    this.err = error
  }
}

export const handleErrors = async <T>(
  promise: Promise<T> | (() => Promise<T>),
): Promise<ErrOkType<T>> => {
  switch (typeof promise) {
    case 'function': {
      try {
        const result = await promise()
        return new Ok(result)
      } catch (error) {
        return new Err(error as Error)
      }
    }
    case 'object': {
      try {
        const result = await promise
        return new Ok(result)
      } catch (error) {
        return new Err(error as Error)
      }
    }
  }
}

export const toastError = (err: ErrType['err']) => {
  if (err instanceof AxiosError) {
    return toast.error(err.response?.data?.message)
  }

  return toast.error(err.message)
}
