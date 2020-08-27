import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeComponent from '../components/HomeComponent';
import LoginComponent from '../components/LoginComponent';
import NotFound from '../components/NotFound';
import BoardComponent from '../components/BoardComponent';
import CardComponent from '../components/CardComponent';
import store from '../store'

Vue.use(VueRouter); // 라이브러리 사용

// 인증 함수
const requireAuth = (to, from, next) => {
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;
  store.getters.isAuth ? next() : next(loginPath);
};

const router = new VueRouter({
  mode: 'history', // history 라우팅 사용. 기본값은 해쉬.
  routes: [
    // beforEnter: navigation guard. 어떤 라우트로 접근하기 전에 인증하는 vue-router 함수 프로퍼티
    { path: '/', component: HomeComponent, beforeEnter: requireAuth },
    { path: '/login', component: LoginComponent },
    {
      path: '/b/:bId',
      component: BoardComponent,
      beforeEnter: requireAuth,
      children: [
        // children 프로퍼티로 중첩라우팅 구현
        { path: 'c/:cId', component: CardComponent, beforeEnter: requireAuth }
      ]
    },
    { path: '*', component: NotFound } // 위에 라우팅되지 않은 경로로 접근하면 404 page.
  ]
});

export default router;
