import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios';

Vue.component('App', require('./App.vue').default);

import Home from './Home.vue';

export const routes = [
    { path: '/', component: Home, name: 'Home' }
];

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    components: {},
    router
});
