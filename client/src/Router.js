import Router from 'svelte-easyroute';
import Profile from './components/Profile.svelte';
import Login from './components/Login.svelte';
import { getCookie, eraseCookie } from './utils';
export const router = new Router({
  mode: 'history', // "hash", "history" or "silent"
  omitTrailingSlash: true, // should we remove the last slash in the url,
  // e.g. "/my/path/" => "/my/path"
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'Index',
    },
    {
      path: '/',
      component: Login,
      name: 'Profile',
    },
    {
      path: '/profile',
      component: Profile,
      name: 'Profile',
    },
    {
      path: '/logout',
      component: Login,
      name: 'Login',
      beforeEnter: (to, from, next) => {
        eraseCookie('isLogin');
        next('/');
      },
    },
  ],
});
