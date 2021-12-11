import Vue from './vendor/vue.esm.browser.js';
// Требуется создать Vue приложение
new Vue({
  el: '#app',
  data: () => {
    return {
      count: 0,
    };
  },

  methods: {
    updateCount() {
      this.count++;
    },
  },
});
