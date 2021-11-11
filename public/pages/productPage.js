const productPage = {
    props: ['good', 'image'],
    template: `
    <main>
    <section class="item-place">
        <h1>{{good.product_name}}</h1>
        <div class="item-description">
            <div class="item-description__foto">
                <img :src="image" alt="img">
            </div>
            <div class="item-description__text">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, aut, quod provident corrupti ad magni maxime fugit odit repellat at recusandae! Iste, nisi. Ratione error ad laudantium adipisci, quaerat modi.</p>
                <p>Цена: {{good.price}}₽</p>
                <button class="buy-btn" @click="this.$root.$refs.cart.addProduct(good)">Купить</button>
            </div>
        </div>
        <hr>
        <div class="item-characteristics">
            <h4>Характеристики:</h4>
            <p>Модель: {{good.product_name}}</p>
            <p>Основной цвет: </p>
            <p>Ширина: </p>
            <p>Высота: </p>
            <p>Длина: </p>
            <p>Вес: </p>
        </div>
    </section>
    </main>
    `
}

export default productPage;