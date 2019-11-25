import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Create from '@/pages/components/Create'
import Chat from '@/pages/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: 'Create',
      component: Create
    },{
      path: 'Chat/:id/:topic',
      component: Chat
    }]
  }]
})
