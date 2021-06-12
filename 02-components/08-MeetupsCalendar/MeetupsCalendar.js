/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  props:{
    meetups:Array,
  },
  data(){
    return{
      data:null,
      filteredMeetups:null
    }
  },

  mounted(){
    console.log(this.meetups)
    this.filteredMeetups = this.meetups.map( meetup => {
      return {
        ...meetup,
        date: new Date(meetup.date)
      }
    })


    let previousMonthDay = new Date(2020, this.getCurrentMonth - 1, 0).getDate();
    let currentMonthDay = new Date(2020, this.getCurrentMonth, 0).getDate();

    let firstDayOfMonth = new Date(2020 + "-" +this.getCurrentMonth + "-01").getDay();
    let lastDayOfMonth = new Date(2020 + "-" +this.getCurrentMonth + `-${ currentMonthDay }`).getDay();

  

    let divide = 7 - lastDayOfMonth;

    let array = [];

    for( let i = 0; i < firstDayOfMonth-1 ; i ++ ){
      array.push({
        month:this.getCurrentMonth - 1,
        dayCount:previousMonthDay - i,
        inactive:true,
      })
    }
    array.reverse();

    for( let i = 1; i <= currentMonthDay; i ++ ){
      array.push({
        month:this.getCurrentMonth ,
        dayCount:i
      })
    }
    for( let i = 1; i <= divide; i ++ ){
      array.push({
        month:this.getCurrentMonth + 1,
        dayCount:i,
        inactive:true,
      })
    }
    this.data = array;

    console.log(this.getCurrentMonthMeetups)
    this.data = this.data.map( day =>{
      let meetup = this.getCurrentMonthMeetups.find( meetup => {
        return meetup.date.getDate() === day.dayCount && meetup.date.getMonth() + 1 === day.month ? meetup : null;
      })
      return{
        ...day,
        meetup
      }

    })
    console.log( this.data)
  },  
  computed:{
    getCurrentMonth(){
      return  new Date().getMonth() + 1;
    },
    getCurrentMonthMeetups(){
      return this.filteredMeetups.filter( meetup =>{
        return meetup.date.getMonth() + 1 === this.getCurrentMonth ? meetup : '';
      })
    }
  },
  methods:{
  
  },
  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left"></button>
          <div>Июнь 2020</div>
          <button class="rangepicker__selector-control-right"></button>
        </div>
      </div>

      <div class="rangepicker__date-grid">
        <div v-for="date in data" class="rangepicker__cell rangepicker__cell" :class="{ 'rangepicker__cell_inactive': date.inactive }"> 
          {{ date.dayCount }}
          <a v-if = "date.meetup" class="rangepicker__event">Митап</a>
        </div>
        </div>
    </div>
  </div>`,
};

export default MeetupsCalendar;



{/* <div class="rangepicker__date-grid">
<div class="rangepicker__cell rangepicker__cell_inactive">28</div>
<div class="rangepicker__cell rangepicker__cell_inactive">29</div>
<div class="rangepicker__cell rangepicker__cell_inactive">30</div>
<div class="rangepicker__cell rangepicker__cell_inactive">31</div>
<div class="rangepicker__cell">
  1
  <a class="rangepicker__event">Митап</a>
  <a class="rangepicker__event">Митап</a>
</div>
<div class="rangepicker__cell">2</div>
<div class="rangepicker__cell">3</div>
</div> */}