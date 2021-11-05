Vue.component('products', {
    data() {
        return {
            catalogUrl: '',
            products: [],
            filtered: [],
            imgCatalog: 'https://dummyimage.com/300x200/e0e0e0/404beb.jpg',
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],

    template: `
    <div class="product-item">
        <div class="card__item">
            <img :src="img" alt="Some img">
            <div class="card__overlay">
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
            </div>
        </div>
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <a href="#">Узнать больше</a>
                </div>
            </div>
    `
});