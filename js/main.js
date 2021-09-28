const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        searchLine: '',
        imgCart: 'https://via.placeholder.com/50x100',
        cart: [],
        isVisibleCart: true,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(good) {
            console.dir(good);
        },
        filterGoods() {
            return this.products.filter(product => {
                return product.product_name.toLowerCase().indexOf(this.searchLine) > -1
            })
        }
    },
    beforeCreate() {

    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                this.products = data;
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                this.cart = data.contents;
            });
    },
    beforeMount() {

    },
    mounted() {

    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },
});