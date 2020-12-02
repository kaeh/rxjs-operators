import { MonoTypeOperatorFunction } from "rxjs";
import { tap } from "rxjs/operators";

interface DebugStepOptions {
  background: string;
  fontSize: string;
  fontColor: string;
}
interface DebugOptions {
  next: Partial<DebugStepOptions>;
  error: Partial<DebugStepOptions>;
  complete: Partial<DebugStepOptions>;
}

const defaultFontSize = "12px";
const defaultFontColor = "#fff";
const defaultDebugOptions = {
  next: {
    background: "#009688",
    fontSize: defaultFontSize,
    fontColor: defaultFontColor,
  },
  error: {
    background: "#E91E63",
    fontSize: defaultFontSize,
    fontColor: defaultFontColor,
  },
  complete: {
    background: "#00BCD4",
    fontSize: defaultFontSize,
    fontColor: defaultFontColor,
  },
};

const generateStyles = ({ background, fontSize, fontColor }: Partial<DebugStepOptions>) =>
  `background: ${background}; color: ${fontColor}; padding: 3px; font-size: ${fontSize};`;

export const debug = <T = unknown>(tag: string, options?: Partial<DebugOptions>): MonoTypeOperatorFunction<T> => {
  const sanitizedOptions: DebugOptions = {
    next: { ...defaultDebugOptions.next, ...options?.next },
    error: { ...defaultDebugOptions.error, ...options?.error },
    complete: { ...defaultDebugOptions.complete, ...options?.complete },
  };

  return tap<T>({
    next(value) {
      console.log(`%c[${tag}]: Next`, generateStyles(sanitizedOptions.next), value);
    },
    error(error) {
      console.log(`%c[${tag}]: Error`, generateStyles(sanitizedOptions.error), error);
    },
    complete() {
      console.log(`%c[${tag}]: Complete`, generateStyles(sanitizedOptions.complete));
    },
  });
};
