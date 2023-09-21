import { mount, flushPromises } from '@vue/test-utils';
import CollectionExplorer from '@/components/collection-explorer/CollectionExplorer.vue';
import Card from '@/components/card/Card.vue';

type MockVM = {
  selectedKey: string;
  searchQuery: string;
  searchResults: { id: string; } & Record<string, string>[];
  debounceTime: number;
  updateSelectedKey: (option: string) => void;
  updateSearchQuery: (newQuery: string) => void;
  clearSearchQuery: () => void;
  performSearchImplementation: () => void;
}

describe('CollectionExplorer.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the component without errors', () => {
    const wrapper = mount(CollectionExplorer, {
      props: {
        collection: [],
        defaultSelectedKey: 'id'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('Should initialize with provided collection and default selected key', async () => {
    const wrapper = mount(CollectionExplorer, {
      props: {
        collection: [{ id: '1', name: 'John' }, { id: '2', name: 'Doe' }],
        defaultSelectedKey: 'id'
      }
    });
    await flushPromises();
    expect((wrapper.vm as unknown as MockVM).selectedKey).toBe('id');
  });

  it('Should update `selectedKey` when `updateSelectedKey` is called', async () => {
    const wrapper = mount(CollectionExplorer, {props: {collection: []}});
    (wrapper.vm as unknown as MockVM).updateSelectedKey('name');
    expect((wrapper.vm as unknown as MockVM).selectedKey).toBe('name');
  });

  it('Should update `searchQuery` when `updateSearchQuery` is called', async () => {
    const wrapper = mount(CollectionExplorer, {props: {collection: []}});
    (wrapper.vm as unknown as MockVM).updateSearchQuery('John');
    expect((wrapper.vm as unknown as MockVM).searchQuery).toBe('John');
  });

  it('Should clear `searchQuery` when `clearSearchQuery` is called', async () => {
    const wrapper = mount(CollectionExplorer, {props: {collection: []}});
    (wrapper.vm as unknown as MockVM).clearSearchQuery();
    expect((wrapper.vm as unknown as MockVM).searchQuery).toBe('');
  });

  it("Should show 'no data' when there are no search results", async () => {
    const wrapper = mount(CollectionExplorer, {
      props: {
        collection: []
      }
    });
    await flushPromises();
    expect(wrapper.text()).toContain('no data');
  });

  it('Should show Cards when there are search results', async () => {
    const wrapper = mount(CollectionExplorer, {
      props: {
        collection: [{ id: '1', name: 'John' }]
      }
    });
    await flushPromises();
    const cards = wrapper.findAllComponents(Card);
    expect(cards.length).toBe(1);
  });

  it('Should update debounce time', async () => {
    const wrapper = mount(CollectionExplorer, {props: {collection: []}});
    const input = wrapper.find('input[type="number"]');
    await input.setValue(300);
    expect((wrapper.vm as unknown as MockVM).debounceTime).toBe(300);
    await input.setValue(0);
  });

});
