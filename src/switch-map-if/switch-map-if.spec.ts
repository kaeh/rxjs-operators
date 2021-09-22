import { of } from "rxjs";
import { switchMapIf } from "./switch-map-if";

describe(switchMapIf.name, () => {
  describe("With observable", () => {
    const source1$ = of(1);
    const source2$ = of(2);

    it("should switch to observable when condition is met", (done) => {
      source1$.pipe(switchMapIf((x) => x === 1, source2$)).subscribe((result) => {
        expect(result).toBe(2);
        done();
      });
    });

    it("should not switch to observable when condition is met", (done) => {
      source1$.pipe(switchMapIf((x) => x === 42, source2$)).subscribe((result) => {
        expect(result).toBe(1);
        done();
      });
    });
  });

  describe("With predicate", () => {
    const source1$ = of(1);

    it("should switch to observable when condition is met", (done) => {
      source1$
        .pipe(
          switchMapIf(
            (x) => x === 1,
            () => of(2)
          )
        )
        .subscribe((result) => {
          expect(result).toBe(2);
          done();
        });
    });

    it("should not switch to observable when condition is met", (done) => {
      source1$
        .pipe(
          switchMapIf(
            (x) => x === 42,
            () => of(2)
          )
        )
        .subscribe((result) => {
          expect(result).toBe(1);
          done();
        });
    });
  });

  describe("Typings", () => {
    const source1$ = of(1);
    const source2$ = of("test");

    it("should keep type of source when condition is not met", (done) => {
      source1$.pipe(switchMapIf((x) => x === 42, source2$)).subscribe((result) => {
        expect(typeof result).toBe("number");
        done();
      });
    });

    it("should take type of switched source when condition is met", (done) => {
      source1$.pipe(switchMapIf((x) => x === 1, source2$)).subscribe((result) => {
        expect(typeof result).toBe("string");
        done();
      });
    });
  });
});
