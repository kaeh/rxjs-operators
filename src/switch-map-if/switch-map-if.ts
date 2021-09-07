import { Observable, of, OperatorFunction } from "rxjs";
import { switchMap } from "rxjs/operators";

export function switchMapIf<T = unknown>(condition: (x: T) => boolean, obs: Observable<T>): OperatorFunction<T, T>;
export function switchMapIf<T = unknown>(condition: (x: T) => boolean, predicate: (x: T) => Observable<T>): OperatorFunction<T, T>;
export function switchMapIf<T = unknown>(
  condition: (x: T) => boolean,
  obsOrPredicate: Observable<T> | ((x: T) => Observable<T>)
): OperatorFunction<T, T> {
  return switchMap((value) =>
    condition(value) ? (typeof obsOrPredicate === "function" ? obsOrPredicate(value) : obsOrPredicate) : of(value)
  );
}
