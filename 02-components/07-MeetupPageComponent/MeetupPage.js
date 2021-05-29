import MeetupView from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

const MeetupPage = {
  name: 'MeetupPage',
  data() {
    return {
      meetup:null
    }
  },
  async mounted(){
    this.meetup = await fetchMeetup(MEETUP_ID);
  },
  components:{
    MeetupView
  },

  template: `<div>
    <meetup-view v-if="meetup" :meetup="meetup"></meetup-view>
  </div>`,
};

export default MeetupPage;
