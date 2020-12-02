import { BehaviorSubject, of, throwError } from "rxjs";
import { debug } from "./debug";

describe(debug.name, () => {
  beforeEach(() => {
    jest.spyOn(global.console, "log");
  });

  it("should notify on new stream value", (done) => {
    // Given an observable
    const source$ = new BehaviorSubject<number>(42);

    // When it's piped with operator
    source$
      .pipe(debug("source$"))
      // and it's subscribed
      .subscribe(() => {
        // Then the console should have called it's log function once
        expect(console.log).toHaveBeenCalledTimes(1);

        done();
      });
  });

  it("should notify on new stream error", (done) => {
    // Given an observable in an error state
    const source$ = throwError("oupsy");

    // When it's piped with operator
    source$
      .pipe(debug("source$"))
      // and it's subscribed
      .subscribe(
        () => {
          throw new Error("you never should have come here");
        },
        () => {
          // Then the console should have called it's log function once
          expect(console.log).toHaveBeenCalledTimes(1);

          done();
        }
      );
  });

  it("should notify on new stream complete", (done) => {
    // Given an observable in a complete state
    const source$ = of(42);

    // When it's piped with operator
    source$
      .pipe(debug("source$"))
      // and it's subscribed
      .subscribe(() => {
        // Then the console should have called it's log function once
        expect(console.log).toHaveBeenCalledTimes(1);

        done();
      });
  });
});
