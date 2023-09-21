import { mount } from '@vue/test-utils';
import Card from '@/components/card/Card.vue';

describe('Card.vue', () => {

  it('Should render the component without errors', () => {
    const wrapper = mount(Card, {
      props: {
        data: { id: '1', name: 'Alice' },
      },
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should correctly display each key-value pair from the data prop', () => {
    const wrapper = mount(Card, {
      props: {
        data: { id: '1', name: 'Alice' },
      },
    });

    const gridContainers = wrapper.findAll('[class^="gridContainer"]');
    expect(gridContainers.length).toBe(2);

    gridContainers.forEach((container, index) => {
      const spans = container.findAll('span');
      expect(spans.length).toBe(2);
      const key = Object.keys(wrapper.props().data)[index];
      const value = Object.values(wrapper.props().data)[index];

      expect(spans[0].text()).toBe(`${key}:`);
      expect(spans[1].text()).toBe(value);
    });
  });

  it('Should re-render correctly when data prop changes', async () => {
    const wrapper = mount(Card, {
      props: {
        data: { id: '1', name: 'Alice' },
      },
    });

    let gridContainers = wrapper.findAll('[class^="gridContainer"]');
    expect(gridContainers.length).toBe(2);

    await wrapper.setProps({ data: { id: '2' } });

    gridContainers = wrapper.findAll('[class^="gridContainer"]');
    expect(gridContainers.length).toBe(1);

    const idContainer = gridContainers[0];
    const idSpans = idContainer.findAll('span');
    expect(idSpans[0].text()).toBe('id:');
    expect(idSpans[1].text()).toBe('2');
  });

});
