export function debounce<F extends (...args: any[]) => any>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutID: number | null = null;

  return (...args: Parameters<F>) => {
    if (timeoutID !== null) {
      clearTimeout(timeoutID);
    }

    if (delay === 0) {
      fn(...args);
    } else {
      // the return type of setTimeout in the scope of the browser is always a number
      // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#return_value
      timeoutID = setTimeout(() => fn(...args), delay) as unknown as number;
    }
  };
}
