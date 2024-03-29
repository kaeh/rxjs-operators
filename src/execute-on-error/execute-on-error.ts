import { Observable, of, OperatorFunction, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface Options<T = unknown> {
  suppressErrors: boolean;
  defaultValue: T | null | undefined;
}

const defaultOptions: Options<null> = { suppressErrors: false, defaultValue: null };

/**
 * Execute a function when the stream is on an error state.
 *
 * Options gives the possibility to suppress the error and return a default value in the stream instead
 */
export const executeOnError = <TIn = unknown, TOut = TIn>(
  fn: (error: unknown) => void,
  options?: Partial<Options<TOut>>
): OperatorFunction<TIn, TOut | null | undefined> => {
  const sanitizedOptions = { ...defaultOptions, ...(options ? options : {}) };

  return catchError<TIn, Observable<TOut | null | undefined>>((err: unknown) => {
    fn(err);
    return sanitizedOptions.suppressErrors ? of(sanitizedOptions.defaultValue) : throwError(err);
  }) as OperatorFunction<TIn, TOut | null | undefined>;
};
