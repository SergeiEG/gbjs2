import search from './FilterComp'
import error from './ErrorComp'

const product = {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },

    template: `
    <div class="product-item">
        <div class="card__item">
            <img :src="img" alt="Some img">
            <div class="card__overlay">
                <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
            </div>
        </div>
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <a href="#">Узнать больше</a>
                </div>
            </div>
    `
};

const products = {
    components: { product, search, error },
    data() {
        return {
            products: [],
            filtered: [],
            imgCatalog: 'https://dummyimage.com/300x200/e0e0e0/404beb.jpg',
        }
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
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
    <section class="catalog">
        <h1>Каталог в наличии</h1>
        <search></search>
        <div id="catalog" class="catalog__item">
            <div class="products">
                <product v-for="item of filtered" :key="item.id_product"    :img="imgCatalog" :product="item"></product>
            </div>
            <error ref="error"></error>
        </div>
    </section>
    `
};

export default products;