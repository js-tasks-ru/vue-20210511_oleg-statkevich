import Vue from './vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение по идентификатору, например, изображение митапа
 * @param imageId {number} - идентификатор изображения
 * @return {string} - ссылка на изображение
 */
function getImageUrlByImageId(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

// Требуется создать Vue приложение


new Vue({
  el: '#app',
  data:() => ({
    choosenMeetupId:MEETUP_ID,
    meetup:null,
    meetupImage:null,
    meetupAgenda:null
  }),
  async mounted(){

    this.meetup = await fetch(`${API_URL}/meetups/${this.choosenMeetupId}`).
      then((resp) => 
      resp.json());

     if(this.meetup.imageId)
      this.meetupImage = await getImageUrlByImageId(this.meetup.imageId);

     if(this.meetup.agenda)
     this.meetupAgenda = this.meetup.agenda.map( meetup =>{
        let icon = this.setMeetupIcon(meetup);
        if(!meetup.title)
          meetup.title = this.setDefaultTitle(meetup);
       return{
        ...meetup,
        icon
       }
     })
  },
  computed:{
    filteredDate(){
      if(this.meetup.date)
      return new Date(this.meetup.date).toLocaleString(navigator.language,{
        year:'numeric',
        month:'long',
        day:'numeric'
      })
    }
  },
  methods:{
    setDefaultTitle(meetup){
      for (let [key, value] of Object.entries(agendaItemDefaultTitles)) {
        if(key === meetup.type){
          return value;
        }
      }
    },
    setMeetupIcon(meetup){
      for (let [key, value] of Object.entries(agendaItemIcons)) {
        if(key === meetup.type){
          return `/assets/icons/icon-${value}.svg`;
        }
      }
    }
  }
});
