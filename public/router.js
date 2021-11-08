import VueRouter from 'vue-router';
import home from './pages/home';

export default new VueRouter({
    routes: [{
        path: '',
        component: home
    }],
    mode: 'history'
})