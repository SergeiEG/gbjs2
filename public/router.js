import VueRouter from 'vue-router';
import home from './pages/home';
import products from './js/ProducComp';

export default new VueRouter({
    routes: [{
            path: '',
            component: home,
            children: [{
                path: '',
                component: products
            }]
        },

    ],
    mode: 'history'
})