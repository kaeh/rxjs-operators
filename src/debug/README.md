# debug

This operator has been inspired by this [Netanel Basal's Medium post](https://netbasal.com/creating-custom-operators-in-rxjs-32f052d69457) and by me being tired of repeating `tap(console.log)` everytime i needed to debug a stream.

`debug` is used to follow the value of a stream during it's lifecycle in the console. It is stylized and its style can be change for each lifecycle with the second parameter.

## Examples

```typescript
// With a stream in a valid state
const source$ = new Subject<string>();
const firstObserver = source$.pipe(debug("first observer")).subscribe();
source$.next("a value");
source$.next("another value");
source$.next("and another value");
source$.complete();
// With a stream in an error state
const secondObserver = throwError("an error").pipe(debug("second observer")).subscribe();
```

You will get the following result

![Debug operator](/assets/debug-operator.png)
