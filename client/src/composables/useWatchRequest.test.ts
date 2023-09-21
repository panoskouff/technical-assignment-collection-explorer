import { mount } from '@vue/test-utils';
import useWatchRequest, { State } from '@/composables/useWatchRequest';

describe('useWatchRequest Composable', () => {

  let mockFetchFunction: jest.Mock;

  beforeEach(() => {
    mockFetchFunction = jest.fn();
  });

  it('Should initialize with correct default properties', async () => {
    mockFetchFunction.mockReturnValueOnce(Promise.resolve(null));

    const wrapper = mount({
      template: `<div></div>`,
      setup() {
        const state = useWatchRequest(mockFetchFunction);
        return { state };
      },
    });

    const state = wrapper.vm.state as unknown as State<unknown, unknown>;
    expect(state.data).toBeNull();
    expect(state.adaptedData).toBeNull();
    expect(state.called).toBeFalsy();
    expect(state.loading).toBeFalsy();
    expect(state.hasError).toBeFalsy();
    expect(state.errorMessage).toBe('');
    expect(mockFetchFunction).not.toHaveBeenCalled();
  });

  it('Should set `called` to true, `loading` to false, and populate `data` and `adaptedData`', async () => {
    const mockAdapter = jest.fn((data: string) => data.toUpperCase());
    mockFetchFunction.mockReturnValueOnce(Promise.resolve('fetched data'));

    const wrapper = mount({
      template: `<div></div>`,
      setup() {
        const state = useWatchRequest(mockFetchFunction, { adapter: mockAdapter });
        return { state };
      },
    });

    const state = wrapper.vm.state as unknown as State<string, string>;
    await state.fetchData();

    expect(state.called).toBeTruthy();
    expect(state.loading).toBeFalsy();
    expect(state.data).toEqual('fetched data');
    expect(state.adaptedData).toEqual('FETCHED DATA');
  });

  it('Should set `called` to true, `loading` to false, `hasError` to true, and `errorMessage`', async () => {
    mockFetchFunction.mockReturnValueOnce(Promise.reject(new Error('Fetch Error')));

    const wrapper = mount({
      template: `<div></div>`,
      setup() {
        const state = useWatchRequest(mockFetchFunction);
        return { state };
      },
    });

    const state = wrapper.vm.state as unknown as State<unknown, unknown>;
    await state.fetchData();

    expect(state.called).toBeTruthy();
    expect(state.loading).toBeFalsy();
    expect(state.hasError).toBeTruthy();
    expect(state.errorMessage).toEqual('Fetch Error');
  });

});
