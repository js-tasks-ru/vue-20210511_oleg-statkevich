import Vue from './vendor/vue.esm.browser.js';

// Требуется создать Vue приложение

new Vue({
  el: '#app',
  data: () => {
    return {
      meetups: null,
      selectedMeetup:null
    };
  },

  computed: {
    filteredMeetups(){
      if(!this.meetups)
        return null;

      return this.meetups.splice(0,5)
    }
  },

  async mounted() {
    this.meetups = await fetch('https://course-vue.javascript.ru/api/meetups').
    then((resp) => 
    resp.json());
  },
});
