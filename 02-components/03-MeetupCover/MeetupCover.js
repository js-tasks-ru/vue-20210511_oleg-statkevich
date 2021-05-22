const MeetupCover = {
  name: 'MeetupCover',
  props:{
     link:{
       String
     },
     title:{
       String
     }
  },
  mounted(){
    console.log(this.link);
  },

  template: `
    <div class="meetup-cover" :style="link ? { '--bg-url' : 'url(' + link + ')' } : null">
        <h1 class="meetup-cover__title">{{title}}</h1>
    </div>`,
};

export default MeetupCover;
