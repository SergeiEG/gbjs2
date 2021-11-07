const cartItem = {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
};

const cart = {
    components: { cartItem },
    data() {
        return {
            imgCart: 'https://via.placeholder.com/50x100',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
        <button class="cart-btn" type="button" @click="showCart = !showCart">
        <svg width="30" height="28" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.93767 16.7805C5.88913 16.7269 5.90887 15.2521 6.93762 15.2009C9.85175 15.211 17.538 15.2036 20.5448 15.2057C21.3672 15.2057 22.0708 14.6461 22.2557 13.8449L23.9631 6.4515C24.0609 6.02818 23.9622 5.59004 23.6924 5.2495C23.4227 4.90896 23.0188 4.7109 22.5844 4.7109C21.3748 4.7109 11.1072 4.66443 5.84819 4.64346L5.01454 1.55027C4.81442 0.811081 4.13986 0.294853 3.37407 0.294853H0.703499C0.31498 0.294853 0 0.609833 0 0.998352C0 1.38687 0.31498 1.70185 0.703499 1.70185H3.37407C3.50591 1.70185 3.62199 1.79073 3.65627 1.91722L6.85789 13.7958C6.29495 13.8163 5.77061 14.0453 5.37299 14.4487C4.95521 14.8727 4.73084 15.4339 4.74121 16.029C4.76194 17.2192 5.74726 18.1875 6.93767 18.1875H7.96346C7.81099 18.5075 7.7254 18.8653 7.7254 19.2428C7.7254 20.6005 8.82999 21.7051 10.1877 21.7051C11.5455 21.7051 12.6501 20.6005 12.6501 19.2428C12.6501 18.8653 12.5644 18.5075 12.412 18.1875H16.8541C16.7018 18.5074 16.6162 18.865 16.6162 19.2424C16.6162 20.6001 17.7209 21.7047 19.0786 21.7047C20.4363 21.7047 21.5409 20.6001 21.5409 19.2424C21.5409 18.8503 21.4484 18.4796 21.2847 18.1503C21.5631 18.0566 21.7638 17.794 21.7638 17.484C21.7638 17.0955 21.4488 16.7805 21.0603 16.7805H6.93767ZM11.243 19.2428C11.243 19.8247 10.7696 20.2981 10.1877 20.2981C9.60576 20.2981 9.13235 19.8247 9.13235 19.2428C9.13235 18.6612 9.60529 18.188 10.1868 18.1875H10.1886C10.7701 18.188 11.243 18.6612 11.243 19.2428ZM19.0786 20.2978C18.4967 20.2978 18.0233 19.8243 18.0233 19.2424C18.0233 18.6663 18.4875 18.1967 19.0615 18.1875H19.0958C19.6698 18.1967 20.134 18.6663 20.134 19.2424C20.134 19.8243 19.6605 20.2978 19.0786 20.2978ZM22.5895 6.12306C22.5937 6.12831 22.5931 6.1308 22.5922 6.13483L21.8728 9.25016H19.4367L19.8516 6.10679L22.5787 6.11776C22.5829 6.11785 22.5854 6.11785 22.5895 6.12306ZM15.3367 13.7987V10.6572H17.8319L17.4173 13.7987H15.3367ZM11.8482 13.7987L11.4302 10.6572H13.9297V13.7987H11.8482ZM8.6096 13.7987H8.6074C8.43593 13.7987 8.28487 13.683 8.24027 13.5182L7.46914 10.6572H10.0108L10.4288 13.7987H8.6096ZM11.243 9.25021L10.8199 6.07044L13.9296 6.08296V9.25021H11.243ZM15.3367 9.25021V6.08863L18.4331 6.10111L18.0175 9.25021H15.3367ZM9.39973 6.06467L9.82356 9.25016H7.08991L6.22789 6.05187L9.39973 6.06467ZM20.5448 13.7987H18.8364L19.251 10.6572H21.5478L20.8848 13.5282C20.848 13.6875 20.7082 13.7987 20.5448 13.7987Z" />
        </svg>
    </button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @remove="remove">
                </cart-item>
            </div>
        </div>`
};

export default cart;