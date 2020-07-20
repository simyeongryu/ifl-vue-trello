import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeComponent from '../components/HomeComponent';
import LoginComponent from '../components/LoginComponent';
import NotFound from '../components/NotFound';
import BoardComponent from '../components/BoardComponent';
import CardComponent from '../components/CardComponent';

Vue.use(VueRouter); // 라이브러리 사용

const router = new VueRouter({
  mode: 'history', // history 라우팅 사용. 기본값은 해쉬.
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/login', component: LoginComponent },
    // children 프로퍼티로 중첩라우팅 구현
    {
      path: '/b/:bId',
      component: BoardComponent,
      children: [{ path: 'c/:cId', component: CardComponent }]
    },
    { path: '*', component: NotFound } // 위에 라우팅되지 않은 경로로 접근하면 404 page.
  ]
});

export default router;
