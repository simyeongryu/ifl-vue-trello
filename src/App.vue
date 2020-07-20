<template>
  <div id="app">
    <NavBar />
    <!-- 라우트에 따라 화면이 변하는 부분 -->
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'app',
  components: { NavBar },
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
