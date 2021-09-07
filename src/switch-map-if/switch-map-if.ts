import { Observable, of, OperatorFunction } from "rxjs";
import { switchMap } from "rxjs/operators";

export const switchMapIf = <T = unknown>(condition: (x: T) => boolean, obs: Observable<T>): OperatorFunction<T, T> =>
  switchMap((value) => (condition(value) ? obs : of(value)));
