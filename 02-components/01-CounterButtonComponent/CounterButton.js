const CounterButton = {
  name: 'CounterButton',
  
  // Компонент должен иметь входной параметр
  props:{
    count:{
      default:0
    }
  },


  // Компонент должен иметь модель
  model:{
    props:'value',
    event:'increment'
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы

  methods:{
    incrementValue(e){
      let counter  = e.target.value;
      counter++;
      this.$emit('increment',counter)
    }
  },

  // Шаблон потребуется отредактировать
  template: `<button :value="count" @click="incrementValue" type="button">+</button>`,
};

export default CounterButton;
