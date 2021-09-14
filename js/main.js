const products = [{
        id: 1,
        title: 'Notebook',
        img: 'img/Laptop.png',
        price: 1000
    },
    { id: 2, title: 'Mouse', img: 'img/mouse.png', price: 100 },
    { id: 3, title: 'Keyboard', price: 250 },
    { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct = (img = 'img/def.jpg', title, price) => {
    return `<div class="product-item">
              <img src="${img}">
              <h3>${title}</h3>
              <p>${price}</p>
              <button class="by-btn">Добавить</button>
          </div>`;
};

const renderProducts = (list) => {
    const productList = list.map((item) => renderProduct(item.img, item.title, item.price));

    document.querySelector('.products').innerHTML = productList.join(' ');
};

renderProducts(products);