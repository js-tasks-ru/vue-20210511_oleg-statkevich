<template>
  <div id="app" class="page wrapper bg-grey" style="display: flex; flex-direction: row">
    <div style="margin: 2rem; flex: 1 0">
      <meetups-page />
    </div>
    <div style="margin: 2rem; flex: 1 0">
      <cats-list />
    </div>
  </div>
</template>

<script>
import MeetupsPage from './views/MeetupsPage';
import CatsList from './components/CatsList';

export default {
  name: 'App',
  components: { CatsList, MeetupsPage },
};
</script>

<style></style>
