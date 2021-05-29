<template><button :value="count" @click="incrementValue">+</button></template>

<script>
export default {
  name: 'CounterButton',
  model: {
    props: 'count',
    event: 'increment',
  },

  props: {
    count: {
      default: 0,
    },
  },

  methods: {
    incrementValue(e) {
      let counter = e.target.value;
      counter++;
      this.$emit('increment', counter);
    },
  },
};
</script>

<style></style>
