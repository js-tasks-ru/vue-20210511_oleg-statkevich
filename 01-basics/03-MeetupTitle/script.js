import Vue from './vendor/vue.esm.browser.js';

// Требуется создать Vue приложение

new Vue({
  el: '#app',
  data: () => {
    return {
      meetups: [1,2,3,4,5],
      selectedMeetup:null,
      foundMeetup:null
    };
  },
  watch: {
    selectedMeetup: async function (val) {
      const meetup = await fetch(`https://course-vue.javascript.ru/api/meetups/${val}`).
        then((resp) => 
        resp.json());
      this.foundMeetup = meetup.title;
    },
  }
});
