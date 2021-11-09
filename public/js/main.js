import cart from './CartComp'
import products from './ProducComp'
import search from './FilterComp'
import error from './ErrorComp'

const appMain = {
    components: {
        cart,
        products,
        search,
        error,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        deleteJson(url, data) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
    },
    template: `<div class="app">
    <header>
    <div class="header">
        <section class="header-top">
            <div class="header-top__item">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <p>Москва</p>
            </div>
            <div class="header-top__item">
                <div>
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    <p>Пн-Вс с 10.00 до 20.00</p>
                </div>
                <div>
                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                    <a href="mailto:tech@mail.com">
                        <p>tech@mail.com</p>
                    </a>
                </div>
            </div>
        </section>
        <section class="header-bottom">
            <router-link tag="a" to="/">
                <h1 class="header-bottom__item">
                    <span class="header-bottom__item--blue">Тех</span>ника.ру
                </h1>
            </router-link>
            <div class="header-bottom__item">
                <div class="cart">
                    <cart ref="cart"></cart>
                </div>
                <div class="header-bottom__wrap">
                    <img src="img/tel.png" alt="telephone">
                    <a href="tel:+7 000 000 00 00">
                        <h2>+7 000 000 00 00</h2>
                    </a>
                </div>
            </div>
        </section>
        <hr>
    </div>
</header>

<router-view></router-view>

<footer>
    <section class="footer">
        <div class="contact">
            <h3>КОНТАКТЫ</h3>
            <div class="contact__item">
                <h5 class="place">Наш адрес</h5>
                <p>Московская обл., Мытищи, Шараповский пр-д, 7 <br> Санкт-Петербург, ул.Федора Абрамова, д.18
                </p>
                <h5 class="teleph">Наш телефон</h5>
                <p>+7 000 000 00 00</p>
                <h5 class="mail">Наша почта</h5>
                <p>tech@mail.com</p>
            </div>
        </div>
        <div class="about">
            <h3>О МАГАЗИНЕ</h3>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod aperiam ullam, delectus corrupti repellat esse suscipit impedit itaque rem officia aliquam possimus. In, ipsam.</h5>
            <div class="about__item">
                <h5>ИП Корнев Иван Сергеевич</h5>
                <p>Адрес офиса: Московская область город Мытищи Шараповский проезд Строение 7 <br> ИНН 503809142008,<br> ОГРН 320508100210632,<br> Расчетный счет 40802810500001545520, <br> Банк АО "ТИНЬКОФФ БАНК", <br> ИНН банка 7710140679, <br>                            БИК банка 044525974
                </p>
            </div>
        </div>
        <div class="awards"><img src="img/awards.png" alt=""></div>
    </section>
</footer>
</div> `
};

export default appMain;