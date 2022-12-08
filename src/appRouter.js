import { createRouter, createWebHistory } from "vue-router";

import Movie from './components/Movie.vue'
import Search from './components/Search.vue'
import Create from './components/Create.vue'

const routes = [
  { path: "/", component: Movie },
  { path: "/search", component: Search },
  { path: "/create", component: Create }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
});