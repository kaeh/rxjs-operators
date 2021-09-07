import { of } from "rxjs";
import { switchMapIf } from "./switch-map-if";

describe(switchMapIf.name, () => {
  it("should switch to observable when condition is met", (done) => {
    const source1$ = of(1);
    const source2$ = of(2);

    source1$.pipe(switchMapIf((x) => x === 1, source2$)).subscribe((result) => {
      expect(result).toBe(2);
      done();
    });
  });

  it("should not switch to observable when condition is met", (done) => {
    const source1$ = of(1);
    const source2$ = of(2);

    source1$.pipe(switchMapIf((x) => x === 42, source2$)).subscribe((result) => {
      expect(result).toBe(1);
      done();
    });
  });
});
