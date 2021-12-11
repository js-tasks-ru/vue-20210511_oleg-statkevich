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
      filteredMeetups:null,
      calendar:null,
      todayDateDate:null,
      currentMonth:null,
      currentYear:null,
    }
  },

  mounted(){
    this.todayDate = moment(Date.now())
    this.recalculatedMonths();
    this.calculateMonthAndYear();
  },  
  computed:{
  },
  methods:{
    recalculatedMonths(){
      const calendar = [];

      const startDay = this.todayDate.clone().startOf('month').startOf('week');
      const endDay = this.todayDate.clone().endOf('month').endOf('week');
    
      let date = startDay.clone();
  
      while (date.isBefore(endDay, 'day')) 
      calendar.push(
          Array(7).fill(0).map(() => date.add(1, 'day').clone())
      );
      let mutatedArrayToDate = calendar.flat().map(date=>{
        let mutatedDate = new Date(date);
        return{
          meetups:this.getCurrentDayMeetups(mutatedDate),
          inactive:this.checkCurrentMonth(mutatedDate.getMonth()),
          date:mutatedDate,
          currentDayNumber:mutatedDate.getDate()
        }
      })
      this.calendar =  mutatedArrayToDate;
    },
    getCurrentDayMeetups(day){
      let formatedDate =  moment(day).format('YYYY-MM-DD');
      let meetupOfTheseDay = this.meetups.filter(meetup=>{
        let formatedDate2 = moment(new Date(meetup.date)).format('YYYY-MM-DD');
        if(moment(formatedDate).isSame(formatedDate2))
        return meetup;
      });
      return meetupOfTheseDay
    },
    checkCurrentMonth(month){
      return new Date(this.todayDate).getMonth() !== month
    },
    calcDate(substract = false){
      this.todayDate = substract ? moment(this.todayDate).subtract(1, 'months') : moment( this.todayDate).add(1, 'months');
      this.recalculatedMonths();
      this.calculateMonthAndYear();
    },
    calculateMonthAndYear(){
      this.currentMonth = new Date(this.todayDate).toLocaleString('default', { month: 'long' });
      this.currentYear = new Date(this.todayDate).getFullYear();
    },
  },
  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button @click.prevent="calcDate(true)"  class="rangepicker__selector-control-left"></button>
          <div v-if="currentMonth && currentYear">{{currentMonth}} {{currentYear}}</div>
          <button @click.prevent="calcDate(false)" class="rangepicker__selector-control-right"></button>
        </div>
      </div>
      <div v-if="calendar" class="rangepicker__date-grid">
            <div class="rangepicker__cell" :class={rangepicker__cell_inactive:day.inactive} v-for="day in calendar">
              {{day.currentDayNumber}}
              <a v-for="meetup in day.meetups" class="rangepicker__event">{{meetup.title}}</a>
            </div>
        </div>
    </div>
  </div>`,
};

export default MeetupsCalendar;