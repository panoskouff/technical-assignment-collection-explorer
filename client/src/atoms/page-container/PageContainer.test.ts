import {defineComponent} from 'vue';
import { mount } from '@vue/test-utils';
import PageContainer from '@/atoms/page-container/PageContainer.vue'


const SomeComponent = defineComponent({
  template: `
    <div>
      Content
    </div>
  `,
});

describe('PageContainer', () => {
  it('Should render passed SomeComponent ', () => {
    const wrapper = mount(PageContainer, {
      slots: {
        default: SomeComponent,
      },
    });

    expect(wrapper.html()).toContain('Content');
  });
});
