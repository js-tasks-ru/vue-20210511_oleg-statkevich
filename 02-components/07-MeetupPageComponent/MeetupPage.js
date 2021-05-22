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
    <meetup-view :meetup="meetup"></meetup-view>
  </div>`,
};

export default MeetupPage;
