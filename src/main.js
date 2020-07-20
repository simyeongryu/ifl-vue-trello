import Vue from 'vue';
import router from './router'; // 폴더 이름만 명시하면 index.js 를 가져온다
import App from './App.vue';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
