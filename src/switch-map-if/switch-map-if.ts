import { Observable, of, OperatorFunction } from "rxjs";
import { switchMap } from "rxjs/operators";

/**
 * Switch map to the given observable if condition is met
 * @param condition The condition to validate
 * @param obs The observable to switch to
 */
export function switchMapIf<TInput = unknown, TOutput = TInput>(
  condition: (x: TInput) => boolean,
  obs: Observable<TOutput>
): OperatorFunction<TInput, TOutput>;

/**
 * Switch map to the result of the given predicate if condition is met
 * @param condition The condition to validate
 * @param predicate The predicate returning the observable to switch to
 */
export function switchMapIf<TInput = unknown, TOutput = TInput>(
  condition: (x: TInput) => boolean,
  predicate: (x: TInput) => Observable<TOutput>
): OperatorFunction<TInput, TOutput>;
export function switchMapIf<TInput = unknown, TOutput = TInput>(
  condition: (x: TInput) => boolean,
  obsOrPredicate: Observable<TOutput> | ((x: TInput) => Observable<TOutput>)
): OperatorFunction<TInput, TInput | TOutput> {
  return switchMap((value) =>
    condition(value) ? (typeof obsOrPredicate === "function" ? obsOrPredicate(value) : obsOrPredicate) : of(value)
  );
}
