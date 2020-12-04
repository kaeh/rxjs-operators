import { throwError } from "rxjs";
import { notifyOnError } from "./notify-error";

describe(notifyOnError.name, () => {
  beforeEach(() => {
    jest.spyOn(global.console, "log");
  });

  it("should notify with given function", (done) => {
    // Given an observable on an error state
    const source$ = throwError(42);

    // When it's piped with operator
    source$
      .pipe(notifyOnError((err) => console.log(err)))
      // and it's subscribed
      .subscribe(
        () => {
          throw new Error("You should never have come here");
        },
        () => {
          // Then the console should have called it's log function once
          expect(console.log).toHaveBeenCalledTimes(1);
          expect(console.log).toHaveBeenCalledWith(42);

          done();
        }
      );
  });

  it("should be able to suppress error", (done) => {
    // Given an observable on an error state
    const source$ = throwError(42);

    // When it's piped with operator
    source$
      .pipe(notifyOnError((err) => console.log(err), { suppressErrors: true }))
      // and it's subscribed
      .subscribe(
        () => {
          // Then the console should have called it's log function once
          expect(console.log).toHaveBeenCalledTimes(1);
          expect(console.log).toHaveBeenCalledWith(42);

          done();
        },
        () => {
          throw new Error("You should never have come here");
        }
      );
  });

  it("should be able to suppress error and provide a default returned value", (done) => {
    // Given an observable on an error state
    const source$ = throwError(42);

    // When it's piped with operator
    source$
      .pipe(notifyOnError((err) => console.log(err), { suppressErrors: true, defaultValue: 8 }))
      // and it's subscribed
      .subscribe(
        (result) => {
          // Then the console should have called it's log function once
          expect(console.log).toHaveBeenCalledTimes(1);
          expect(console.log).toHaveBeenCalledWith(42);
          expect(result).toBe(8);

          done();
        },
        () => {
          throw new Error("You should never have come here");
        }
      );
  });

  it("should not suppress error and provide a default value if the suppressError property is falsy", (done) => {
    // Given an observable on an error state
    const source$ = throwError(42);

    // When it's piped with operator
    source$
      .pipe(notifyOnError((err) => console.log(err), { defaultValue: 8 }))
      // and it's subscribed
      .subscribe(
        () => {
          throw new Error("You should never have come here");
        },
        () => {
          // Then the console should have called it's log function once
          expect(console.log).toHaveBeenCalledTimes(1);
          expect(console.log).toHaveBeenCalledWith(42);

          done();
        }
      );
  });
});
