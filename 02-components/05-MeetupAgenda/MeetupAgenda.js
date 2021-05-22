import MeetupAgendaItem from './MeetupAgendaItem.js';

const MeetupAgenda = {
  name: 'MeetupAgenda',

  props:{
    agenda:{
      Array,
      required:true
    }
  },

  components:{
    MeetupAgendaItem
  },

  template: `
    <div class="meetup-agenda">
       <meetup-agenda-item :agendaItem="agendaItem" v-for="agendaItem in agenda" :key="agendaItem.id"></meetup-agenda-item>
    </div>`,
};

export default MeetupAgenda;
