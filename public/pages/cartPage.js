const cartPageItem = {
    props: ['item', 'img'],
    template: `
                <div class="cart-page__card">
                    <div class="item-bio">
                        <img :src="img" alt="Some image">
                        <div class="item-desc">
                            <p class="item-title">{{item.product_name}}</p>
                            <p class="item-quantity">Количество: {{item.quantity}}</p>
                            <p class="item-single-price">{{item.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="item-price">{{item.quantity*item.price}}₽</p>
                        <button class="del-btn" @click="$emit('remove', item)">&times;</button>
                    </div>
                </div>
    `
};

const cartPage = {
    props: ['items'],
    components: { cartPageItem },
    data() {
        return {
            image: 'https://dummyimage.com/150x150/afb0b5/0011ff.jpg',

        }
    },
    methods: {
        remove(product) {
            return this.$root.$refs.cart.remove(product);
        },
        priceItems() {
            return this.items.reduce((totalPrice, item) => totalPrice += item.quantity * item.price, 0);
        },
        getQuantity() {
            return this.items.reduce((totalQuantity, item) => totalQuantity += item.quantity, 0);
        }
    },

    template: `
    <main>
    <section class="cart-section">
        <p v-if="!items.length">Корзина пуста</p>
        <h1 class="cart__header">Корзина</h1>
            <div class="cart-page">
                <div class="cart-page__left">
                <cartPageItem class="cart-item" 
                v-for="item of items" 
                :key="item.id_product"
                :item="item" 
                :img="image"
                @remove="remove">
                </cartPageItem>
                </div>
                <div class="cart-page__right">
                    <div>
                        <h3>Ваша корзина</h3>
                    </div>
                    <div>
                        <p>Товары: <span class="cart-page__right--blue">{{getQuantity()}}</span></p>
                        <p>Общей стоимостью: <span class="cart-page__right--blue">{{priceItems()}}</span></p>
                    </div>                    
                </div>
            </div>
    </section>
    </main>
    `
}

export default cartPage;