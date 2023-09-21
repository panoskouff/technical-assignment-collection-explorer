import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import CollectionExplorer from '@/components/collection-explorer/CollectionExplorer.vue';
import useWatchRequest from '@/composables/useWatchRequest';

jest.mock('@/composables/useWatchRequest', () => {
  return jest.fn();
});

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should show 'loading data..' when collection is in a loading state", () => {
    (useWatchRequest as jest.Mock).mockImplementation(() => ({
      loading: true,
    }));

    const wrapper = mount(App);
    expect(wrapper.text()).toContain('loading data..');
  });

  it("Should display the error message when collection.hasError is true", () => {
    (useWatchRequest as jest.Mock).mockImplementation(() => ({
      hasError: true,
      errorMessage: "An error occurred",
    }));

    const wrapper = mount(App);
    expect(wrapper.text()).toContain("An error occurred");
  });

  it("Should show 'something went wrong :(' when collection.called is true and collection.adaptedData is null", () => {
    (useWatchRequest as jest.Mock).mockImplementation(() => ({
      called: true,
      adaptedData: null,
    }));

    const wrapper = mount(App);
    expect(wrapper.text()).toContain('something went wrong :(');
  });

  it("Should render the CollectionExplorer component when collection is successfully loaded", () => {
    (useWatchRequest as jest.Mock).mockImplementation(() => ({
      loading: false,
      adaptedData: [{id: '1'}],
    }));

    const wrapper = mount(App);
    expect(wrapper.findComponent(CollectionExplorer).exists()).toBe(true);
  });

  it("Should pass the correct props to the CollectionExplorer component", () => {
    const adaptedData = [{id: '1'}];
    (useWatchRequest as jest.Mock).mockImplementation(() => ({
      loading: false,
      adaptedData,
    }));

    const wrapper = mount(App);
    const collectionExplorer = wrapper.findComponent(CollectionExplorer);
    expect(collectionExplorer.props('collection')).toBe(adaptedData);
    expect(collectionExplorer.props('defaultSelectedKey')).toBe('fullName');
  });
});
