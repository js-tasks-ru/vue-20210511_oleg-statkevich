import MeetupCover from './MeetupCover.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupAgenda from './MeetupAgenda.js';
import MeetupInfo from './MeetupInfo.js';
import { getImageUrlByImageId } from './data.js';

const MeetupView = {
  name: 'MeetupView',
  props:{
    meetup:{
      required:true
    }
  },
  components:{
    MeetupCover,
    MeetupDescription,
    MeetupInfo,
    MeetupAgenda
  },
  computed:{
    meetupImageLink(){
       if(this.meetup)
       return this.meetup.imageId ?  getImageUrlByImageId(this.meetup.imageId) : null; 
    }
  },
  template: `
    <div v-if="meetup">
      <meetup-cover :link="meetupImageLink" :title="meetup.title"></meetup-cover>
      <!-- meetup cover -->
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :description="meetup.description"></meetup-description>
            <!-- meetup description -->

            <h3>Программа</h3>
            <!-- meetup agenda -->
            <meetup-agenda :agenda="meetup.agenda"></meetup-agenda>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" ></meetup-info>
          </div>
        </div>
      </div>
    </div>`,
};

export default MeetupView;
