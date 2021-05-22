export default {
  name: 'MeetupInfo',

  props:{
    organizer:{
      String,
      required:true
    },
    place:{
      String,
      required:true
    },
    date:{
      Date,
      required:true
    }
  },

  computed:{
    localizedDate(){
      return new Date(this.date).toLocaleString(navigator.language,{
        year:'numeric',
        month:'long',
        day:'numeric'
      })
    }
  },

  template: `
    <ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{organizer}}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{place}}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time datetime="2020-01-01">{{localizedDate}}</time>
      </li>
    </ul>`,
};
