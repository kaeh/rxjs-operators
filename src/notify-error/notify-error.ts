import { Observable, of, OperatorFunction, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface Options<T = unknown> {
  suppressErrors: boolean;
  defaultValue: T;
}

const defaultOptions: Options<null> = { suppressErrors: false, defaultValue: null };

/**
 * Execute a function when the stream is on an error state.
 *
 * Options gives the possibility to suppress the error and return a default value in the stream instead
 *
 * @deprecated Use executeOnError instead. It will be removed in a future release.
 */
export const notifyOnError = <T = unknown>(notifyFn: (error: unknown) => void, options?: Partial<Options<T>>): OperatorFunction<T, T> => {
  const sanitizedOptions = { ...defaultOptions, ...(options ? options : {}) };

  return catchError<T, Observable<T>>((err) => {
    notifyFn(err);
    return sanitizedOptions.suppressErrors ? of(sanitizedOptions.defaultValue) : throwError(err);
  });
};
