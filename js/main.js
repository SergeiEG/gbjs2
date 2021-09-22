'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise
let getRequest = (url) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        reject('Error');
                    } else {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }
    // –--------------------------------

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.goodsObjects = [];

        // this._fetchGoods();
        this.getProducts().then((data) => {
            this.goods = data;
            this.render();
        });
    }

    // _fetchGoods() {
    //     getRequest(`${API}/catalogData.json`)
    //         .then((data) => {
    //             console.log(data);
    //             this.goods = JSON.parse(data);
    //             this.render();
    //             console.log(this.goods);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);

        for (const product of this.goods) {
            const productObject = new ProductItem(product);
            this.goodsObjects.push(productObject);

            block.insertAdjacentHTML('beforeend', productObject.getHTMLString())
        }
    }
}

class ProductItem {
    constructor(item, img = 'https://dummyimage.com/200x150/404040/c8c8d9.jpg') {
        this.id = item.id_product;
        this.title = item.product_name;
        this.price = item.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price} \u20bd</p>
                      <button class="buy-btn">Купить</button>
                  </div>
                </div>`;
    }
}

const catalog = new ProductsList();

class CartList {
    constructor(container = '.cart') {
        this.container = container;
        this.goods = {};
        this.goodsObjects = {};
        this.cartBlock = null;

        this._fetchGoods();
        // this.getProducts().then((data) => {
        //     this.goods = data;
        //     this.render();
        // });
    }



    _fetchGoods() {
        getRequest(`${API}/getBasket.json`)
            .then((data) => {
                console.log(data);
                this.goods = JSON.parse(data);
                this.render();
                console.log(this.goods);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getCartListLength() {
        return this.goods.length;
    }

    render() {
        this.getCartListLength() > 0 ? this.renderCartList() : this.renderEmptyCart();
    }

    renderCartList() {
        this.cartBlock = document.querySelector(this.container);
        this.cartBlock.addEventListener('click', event => this.delGoods(event))
        this.cartBlock.innerHTML = ' ';

        for (const product of this.goods) {
            const productObject = new CartItem(product);
            this.goodsObjects.push(productObject);

            this.cartBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString())
        }

        const cartEmptyBtn = document.createElement('button');
        cartEmptyBtn.classList.add('cart-btn__cler');
        cartEmptyBtn.innerHTML = 'Очистить корзину';
        this.cartBlock.appendChild(cartEmptyBtn);
        cartEmptyBtn.addEventListener('click', this.dropCart.bind(this));

        this.cartBlock.insertAdjacentHTML('beforeend', `<br> В корзине всего товара на ${this.countCartPrise(this.goods)} \u20bd.`);
    }

    dropCart() {
        this.goods = [];
        this.render();
    }

    delGoods(event) {
        if (!event.target.classList.contains('del')) return;
        const id_product = +event.target.dataset.id;
        const delGood = this.goods.findIndex((product) => product.id === id_product);
        if (delGood !== -1) this.goods.splice(delGood, 1);

        console.log(delGood);
        this.render();
    }

    renderEmptyCart() {
        this.cartBlock.innerHTML = '';
        this.cartBlock.textContent = 'Корзина пуста.';
    }

    countCartPrise(arr) {
        return arr.reduce((totalPrice, item) => totalPrice += item.quantity * item.price, 0);
    }

}

class CartItem {
    constructor(item, img = 'https://dummyimage.com/100x100/383638/bfbfc7') {
        this.id = item.contents.id_product;
        this.title = item.contents.product_name;
        this.price = item.contents.price;
        this.img = img;
        this.quantity = item.contents.quantity;
    }

    getHTMLString() {
        return `<div class="cart-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="info">
                      <h3>${this.title}</h3>
                      <p>${this.price} \u20bd</p>
                      <p>Количество: ${this.quantity}</p>
                      <p>Общая цена: ${this.quantity * this.price} \u20bd</p>
                  </div>
                  <span class="del" data-id="${this.id}">&#10060</span>
                </div>`;
    }
}

const cart = new CartList();