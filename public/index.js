import appMain from './js/main';
import './style/style.scss';
import VueRouter from 'vue-router';
import router from './router'

Vue.use(VueRouter)
const app = new Vue({
    router,
    render: (h) => h(appMain)
}, ).$mount('#app');
// new Vue({
//     router,
//     render: (h) => h(appMain)
// }).$mount('#app');