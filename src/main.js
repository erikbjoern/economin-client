import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/styles/index.css'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_SERVER_URL
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
