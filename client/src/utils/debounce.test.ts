import { debounce } from '@/utils/debounce'

describe('debounce function', () => {

  jest.useFakeTimers();

  let mockFn: jest.Mock;

  beforeEach(() => {
    mockFn = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('Should call the passed function immediately if the delay is zero', () => {
    const debouncedFn = debounce(mockFn, 0);
    debouncedFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('Should not call the passed function until the delay has elapsed', () => {
    const delay = 1000;
    const debouncedFn = debounce(mockFn, delay);
    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward until the delay has elapsed
    jest.advanceTimersByTime(delay);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('Should clear any previous delayed function call when called multiple times within the delay', () => {
    const delay = 1000;
    const debouncedFn = debounce(mockFn, delay);
    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward until the delay has elapsed
    jest.advanceTimersByTime(delay);

    // Function should have been called only once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('Should pass all arguments to the debounced function correctly', () => {
    const delay = 1000;
    const debouncedFn = debounce(mockFn, delay);
    debouncedFn('arg1', 'arg2');

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});
