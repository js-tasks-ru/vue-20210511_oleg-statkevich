import Vue from 'vue';
import App from './App.vue';
import '@/assets/styles/app.css';

// Заглушка для router-link
Vue.component('router-link', {
  props: ['to'],
  render(h) {
    return h('a', { attrs: { href: this.to } }, this.$scopedSlots.default());
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
