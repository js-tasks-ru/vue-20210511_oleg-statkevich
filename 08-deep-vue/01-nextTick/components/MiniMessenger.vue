<template>
  <main>
    <messages-list class="messages" :messages="messages" />
    <form style="display: flex" @submit.prevent="send">
      <input v-model="newMessage" type="text" placeholder="New message" />
      <button>Send</button>
    </form>
  </main>
</template>

<script>
import MessagesList from './MessegesList';

let id = 0;

// Раскомментируйте эту строку
// export const TASK_SOLVED = true;

export default {
  name: 'MiniMessenger',

  components: { MessagesList },

  data() {
    return {
      newMessage: '',
      messages: [
        { id: id++, text: 'First message' },
        { id: id++, text: 'Second message' },
        { id: id++, text: 'Third message' },
        { id: id++, text: 'Forth message' },
      ],
    };
  },

  methods: {
    send() {
      this.messages.push({
        id: id++,
        text: this.newMessage,
      });
      this.newMessage = '';
    },
  },
};
</script>

<style scoped>
main {
  font-family: sans-serif;
  border: 1px solid #333;
  width: 200px;
  background-color: #efefef;
}
.messages {
  padding: 0 1rem;
  height: 300px;
  overflow: auto;
}
input {
  padding: 0.5rem;
  width: 100%;
  flex: 1 1 100%;
}
</style>
