const { shallowMount, mount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const BaseButton = require(getSolutionPath('components/BaseButton.vue')).default;
const PrimaryButton = require(getSolutionPath('components/PrimaryButton.vue')).default;
const SecondaryButton = require(getSolutionPath('components/SecondaryButton.vue')).default;
const DangerButton = require(getSolutionPath('components/DangerButton.vue')).default;

describe('wrappers/Buttons', () => {
  const slots = { default: '<i>Italic Text</i>' };

  describe('BaseButton', () => {
    it('Компонент BaseButton должен иметь логический параметр block и необязательный строковый параметр tag со значением button по умолчанию', () => {
      const wrapper = shallowMount(BaseButton);
      expect(wrapper.vm.$options.props.block).toBeTruthy();
      expect(wrapper.vm.$options.props.block.type).toBe(Boolean);
      expect(wrapper.vm.$options.props.tag).toBeTruthy();
      expect(wrapper.vm.$options.props.tag.default).toBe('button');
    });

    it('Компонент BaseButton должен рендерить кнопку по умолчанию', () => {
      const wrapper = shallowMount(BaseButton);
      expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('Компонент BaseButton должен рендерить своё содержимое', () => {
      const wrapper = shallowMount(BaseButton, { slots });
      expect(wrapper.find('button').html()).toContain(slots.default);
    });

    it('Компонент BaseButton должен иметь класс button_block только с параметром block', async () => {
      const wrapper = shallowMount(BaseButton);
      expect(wrapper.classes('button_block')).toBe(false);
      await wrapper.setProps({ block: true });
      expect(wrapper.classes('button_block')).toBe(true);
    });

    it('Компонент BaseButton должен рендерить ссылку с tag=a c переданными href и target', () => {
      const attrs = {
        href: 'https://course-vue.javascript.ru',
        target: '_blank',
      };
      const wrapper = shallowMount(BaseButton, {
        slots,
        attrs,
        propsData: { tag: 'a' },
      });
      const button = wrapper.find('a');
      expect(button.exists()).toBe(true);
      expect(button.attributes('href')).toBe(attrs.href);
      expect(button.attributes('target')).toBe(attrs.target);
    });

    it('Компонент BaseButton должен рендерить переданный в tag компонент и передавать на него параметры', () => {
      const attrs = {
        text: 'TEXT',
        rounded: true,
      };
      const ComponentButton = {
        props: ['text', 'rounded'],
        template: `<button>{{ text }}</button>`,
      };
      const wrapper = shallowMount(BaseButton, {
        slots,
        attrs,
        propsData: {
          tag: ComponentButton,
        },
      });
      const button = wrapper.findComponent(ComponentButton);
      expect(button.exists()).toBe(true);
      expect(button.props()).toMatchObject(attrs);
    });

    it('Компонент BaseButton должен обрабатывать клик', () => {
      const handler = jest.fn();
      const wrapper = shallowMount(BaseButton, {
        listeners: {
          click: () => handler(),
        },
      });
      wrapper.trigger('click');
      expect(handler).toHaveBeenCalled();
    });
  });

  describe.each`
    component          | name                 | buttonClass
    ${PrimaryButton}   | ${'PrimaryButton'}   | ${'button_primary'}
    ${SecondaryButton} | ${'SecondaryButton'} | ${'button_secondary'}
    ${DangerButton}    | ${'DangerButton'}    | ${'button_danger'}
  `('$name', ({ name, component, buttonClass }) => {
    it(`Компонент ${name} должен рендерить компонент BaseButton с теми же параметрами, обработчиками событий и содержимым`, async () => {
      const handler = jest.fn();
      const attrs = {
        href: 'https://course-vue.javascript.ru',
        target: '_blank',
      };
      const wrapper = mount(component, {
        slots,
        attrs,
        propsData: { tag: 'a' },
        listeners: {
          click: () => handler(),
        },
      });
      const subButton = wrapper.findComponent(BaseButton);
      expect(subButton.exists()).toBe(true);
      expect(subButton.props('tag')).toBe('a');
      await wrapper.trigger('click');
      expect(handler).toHaveBeenCalled();
    });

    it(`Компонент ${name} должен рендерить кнопку с классом ${buttonClass}`, () => {
      const wrapper = mount(component);
      expect(wrapper.classes(buttonClass)).toBe(true);
    });
  });
});
