import Vue from './vendor/vue.esm.browser.js';

// From https://jsonplaceholder.typicode.com/comments

const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

// Требуется создать Vue приложение

new Vue({
  el: '#app',
  data: () => {
    return {
      rawEmails: null,
      inputValue: '',
    };
  },

  computed: {
    filteredEmails() {
      if (!this.rawEmails) return null;

      return this.rawEmails.filter((email) => {
        console.log(email.email.includes(this.inputValue));
        if (email.email.includes(this.inputValue) && this.inputValue) {
          email.marked = true;
          return email;
        }
        email.marked = false;
        return email;
      });
    },
  },

  mounted() {
    this.rawEmails = emails.map((email) => {
      return {
        email,
        marked: false,
      };
    });
  },
});
