import VueRouter from 'vue-router';
import home from './pages/home';
import products from './js/ProducComp';
import search from './js/FilterComp';
import productPage from './pages/productPage';

export default new VueRouter({
    routes: [{
            path: '',
            component: home,
            children: [{
                path: '',
                component: products,
                children: [{
                    path: '',
                    component: search
                }]
            }, ]
        },
        {
            path: '/good',
            name: 'good',
            component: productPage,
            props: ['good', 'image'],
        }

    ],
    mode: 'history'
})