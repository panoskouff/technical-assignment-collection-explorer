import { Ref, ref } from 'vue';

type FetchFunction<T> = () => Promise<T | null>;
type AdapterFunction<T, U> = (data: T) => U;

export type State<T, U> = {
  data: T | null;
  adaptedData: U | null;
  called: boolean;
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  fetchData: () => Promise<void>;
};

export default function useWatchRequest<T, U>(
  fetchFunction: FetchFunction<T>,
  options?: { adapter?: AdapterFunction<T, U>; immediate?: boolean }
) {
  const state = ref({
    data: null,
    adaptedData: null,
    called: false,
    loading: false,
    hasError: false,
    errorMessage: '',
    fetchData: () => Promise.resolve(),
  }) as Ref<State<T, U>>;

  state.value.fetchData = async () => {
    state.value.called = true;
    state.value.loading = true;
    try {
      const result = await fetchFunction();
      state.value.data = result;
      if (options?.adapter && result) {
        state.value.adaptedData = options.adapter(result);
      }
    } catch (err) {
      state.value.hasError = true;
      state.value.errorMessage = 'unknown error';
      if (err instanceof Error) {
        state.value.errorMessage = err.message;
      }
    } finally {
      state.value.loading = false;
    }
  };

  if (options?.immediate) {
    state.value.fetchData();
  }

  return state;
}
