import VueRouter from 'vue-router';
import home from './pages/home';
import products from './js/ProducComp';
import search from './js/FilterComp';
import productPage from './pages/productPage';
import cartPage from './pages/cartPage';

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
            path: '/good/:id',
            name: 'good',
            component: productPage,
            props: true,
        },
        {
            path: '/cart',
            name: 'cart',
            component: cartPage,
            props: true
        }

    ],
    mode: 'history'
})