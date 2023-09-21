import { mount } from '@vue/test-utils';
import Search from '@/components/search/Search.vue';

describe('Search.vue', () => {

  it('Should render the component without errors', () => {
    const wrapper = mount(Search, {
      props: {
        query: '',
        options: [],
        selected: ''
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('Should initialize input and select with the provided props', () => {
    const wrapper = mount(Search, {
      props: {
        query: 'test query',
        options: ['option1', 'option2'],
        selected: 'option1'
      }
    });

    const input = wrapper.find('input');
    const select = wrapper.find('select');

    expect(input.element.value).toBe('test query');
    expect(select.element.value).toBe('option1');
  });

  it('Should display a list of options and the select label', () => {
    const wrapper = mount(Search, {
      props: {
        query: '',
        options: ['option1', 'option2'],
        selected: '',
        selectLabel: 'Choose an option'
      }
    });

    const options = wrapper.findAll('option');
    const label = wrapper.find('label');

    expect(options.length).toBe(2);
    expect(label.text()).toBe('Choose an option');
  });

  it('Should emit appropriate events based on interactions', async () => {
    const wrapper = mount(Search, {
      props: {
        query: '',
        options: ['option1', 'option2'],
        selected: ''
      }
    });

    const input = wrapper.find('input');
    await input.setValue('new query');
    expect(wrapper.emitted().updateQuery).toBeTruthy();
    expect(wrapper.emitted().updateQuery[0]).toEqual(['new query']);

    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted().clearQuery).toBeTruthy();

    const select = wrapper.find('select');
    await select.setValue('option2');
    expect(wrapper.emitted().updateSelected).toBeTruthy();
    expect(wrapper.emitted().updateSelected[0]).toEqual(['option2']);
  });

});
