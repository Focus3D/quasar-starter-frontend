import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/*
  Avoid lazy loading while in dev mode
  to benefit from HMR
 */
function load (name) {
  if (process.env.NODE_ENV === 'development') {
    return require('components/' + name + '.vue')
  }
  else {
    return (resolve) => {
      require('bundle?lazy!components/' + name + '.vue')(resolve)
    }
  }
}

let routes = {
  // Not found
  '*': {
    component: load('error404')
  },

  // Index
  '/': {
    component: load('index')
  },

  '/login': {
    component: load('auth/login')
  },

  '/register': {
    component: load('auth/register')
  },

  '/profile': {
    component: load('layouts/menu'),
    subRoutes: {
      '/': {component: load('profile')}
    }
  },

  '/jokes': {
    component: load('layouts/menu'),
    subRoutes: {
      '/': {component: load('jokes')}
    }
  }
}

let Router = new VueRouter()
Router.map(routes)

export default Router
