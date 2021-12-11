const { getSolutionPath } = require('taskbook-test-utils');
const MeetupsList = require(getSolutionPath('components/MeetupsList')).default;
const ListView = require(getSolutionPath('components/ListView')).default;
import { RouterLinkStub, mount, shallowMount } from '@vue/test-utils';
import { meetups } from './__fixtures__/meetups';
import ListViewCard from '../components/ListViewCard';
import MeetupInfo from '../components/MeetupInfo';

describe('scoped-slots/ListView', () => {
  describe('ListView', () => {
    it('ListView должен иметь входной параметр items', () => {
      const wrapper = shallowMount(ListView, {
        propsData: { items: [] },
      });
      expect(wrapper.vm.$options.props.items).toBeTruthy();
    });

    it('ListView должен рендерить список items', () => {
      const items = ['Item_A', 'Item_B', 'Item_C'];
      const wrapper = shallowMount(ListView, {
        propsData: { items },
        scopedSlots: {
          default(props) {
            return this.$createElement(
              'div',
              {
                attrs: {
                  'data-test-div': '',
                },
              },
              Object.values(props).toString(),
            );
          },
        },
      });

      const divs = wrapper.findAll('[data-test-div]').wrappers;
      const divTexts = divs.map((div) => div.text());
      expect(divTexts).toHaveLength(items.length);
      expect(divTexts.every((text, i) => text.includes(items[i]))).toBe(true);
    });
  });

  describe('MeetupsList с ListView', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(MeetupsList, {
        propsData: { meetups },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      });
    });

    it('MeetupsList должен выводить список митапов компонентом ListView', async () => {
      const listView = wrapper.findComponent(ListView);
      expect(listView.exists()).toBe(true);
    });

    it('MeetupsList должен выводить список митапов через компоненты ListView, ListViewCard и MeetupInfo', async () => {
      const listView = wrapper.findComponent(ListView);
      const cards = listView.findAllComponents(ListViewCard).wrappers;
      const meetupsInfo = cards.map((card) => card.findComponent(MeetupInfo));

      const cardTitles = cards.map((card) => card.props('title'));
      const meetupsTitles = meetups.map((meetup) => meetup.title);
      expect(cardTitles).toEqual(meetupsTitles);

      const meetupsInfoPlaces = meetupsInfo.map((info) => info.props('place'));
      const meetupsPlaces = meetups.map((meetup) => meetup.place);
      expect(meetupsInfoPlaces).toEqual(meetupsPlaces);
    });
  });
});
