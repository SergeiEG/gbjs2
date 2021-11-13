const productPage = {
    props: ['item'],
    data() {
        return {
            image: 'https://dummyimage.com/400x300/e3e3e3/1523eb.jpg',

        }
    },

    template: `
    <main>
    <section class="item-place">
        <h1>{{item.product_name}}</h1>
        <div class="item-description">
            <div class="item-description__foto">
                <img :src="image" alt="img">
            </div>
            <div class="item-description__text">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, aut, quod provident corrupti ad magni maxime fugit odit repellat at recusandae! Iste, nisi. Ratione error ad laudantium adipisci, quaerat modi.</p>
                <p>Цена: {{item.price}}₽</p>
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(item)">Купить</button>
            </div>
        </div>
        <hr>
        <div class="item-characteristics">
            <h4>Характеристики:</h4>
            <p>Основной цвет: {{item.color}}</p>
            <p>Ширина: {{item.width}} см</p>
            <p>Высота: {{item.height}} см</p>
            <p>Длина: {{item.length}} см</p>
            <p>Вес: {{item.weight}} г.</p>
        </div>
    </section>
    </main>
    `
}

export default productPage;