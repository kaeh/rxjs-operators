# executeOnError

This operator has been created because we often needed to perform an action on error then rethrow or suppress it with another value.

`executeOnError` is used to execute the given function whenever the stream encounter an error. By default it will rethrow the error but it is possible to suppress it and continue the stream with a default value which will be `null` by default.

It is used like this

```typescript
source$.pipe(notifyOnError(() => console.log("Oh noes")));
```

## Examples

```typescript
const source$ = new Subject<string>();
const firstObserver = source$.pipe(notifyOnError(() => console.log("Oh noes"))).subscribe();
source$.next("a value"); // Emit the value
source$.next("another value"); // Emit the value
source$.next("and another value"); // Emit the value
source$.error("Something went wrong !"); // Console has logged "Oh noes" and the stream is in error
source$.next("you there ?"); // Nothing happens
```

You can suppress the error by using it like this

```typescript
const source$ = new Subject<string>();
const firstObserver = source$
  .pipe(executeOnError(() => console.log("Oh noes"), { suppressErrors: true, defaultValue: "a default value" }))
  .subscribe();
source$.next("a value"); // Emit the value
source$.next("another value"); // Emit the value
source$.next("and another value"); // Emit the value
source$.error("Something went wrong !"); // Console has logged "Oh noes", stream is still valid and has emit "a default value"
source$.next("you there ?"); // Emit the value
```
