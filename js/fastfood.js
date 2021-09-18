'use strict';

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
        this.calorie = 0;
        this.prise = 0;

        this.init();
        this.render();
    }

    addTopping(topping) {
        this.topping.push(topping.value);
    }

    removeTopping(topping) {
        const delTopp = this.topping.findIndex((top) => top === topping);
        if (delTopp !== -1) this.topping.splice(delTopp, 1);
        else
            return;
    }

    getToppings(topping) {
        topping.checked ? this.addTopping(topping) : this.removeTopping(topping);
    }

    initTopping() {
        const flavoring = document.getElementById('flavoring');
        this.getToppings(flavoring);
        const mayo = document.getElementById('mayo');
        this.getToppings(mayo);
    }

    getSize() {
        const radioSize = document.getElementsByName('size');
        for (let i = 0; i < radioSize.length; i++) {
            if (radioSize[i].type == "radio" && radioSize[i].checked) {
                this.size = radioSize[i].value;
                return this.size;
            }
        }
    }

    getStuffing() {
        const radioStuff = document.getElementsByName('stuff');
        for (let i = 0; i < radioStuff.length; i++) {
            if (radioStuff[i].type == "radio" && radioStuff[i].checked) {
                this.stuffing = radioStuff[i].value;
                return this.stuffing;
            }
        }
    }

    init() {
        const btn = document.querySelector('.btn-burger');
        btn.addEventListener('click', () => {
            this.prise = 0;
            this.calorie = 0;
            this.topping = [];
            this.getPriseAndCalToSize(this.getSize());
            this.getPriseAndCalToStuffing(this.getStuffing());
            this.initTopping();
            this.getPriseAndCalToTopping(this.topping);

            this.render();
        })
    }

    getPriseAndCalToSize(s) {
        switch (s) {
            case 'big':
                this.calculatePrice(100);
                this.calculateCalories(40);
                break;
            case 'litle':
                this.calculatePrice(50);
                this.calculateCalories(20);
                break;
        }
    }

    getPriseAndCalToStuffing(s) {
        switch (s) {
            case 'cheese':
                this.calculateCalories(20);
                this.calculatePrice(10);
                break;
            case 'salad':
                this.calculateCalories(5);
                this.calculatePrice(20);
                break;
            case 'potato':
                this.calculateCalories(10);
                this.calculatePrice(15);
                break;
        }
    }

    getPriseAndCalToTopping(arr) {
        arr.forEach(element => {
            if (element === 'flavoring') this.calculatePrice(15);
            if (element === 'mayo') {
                this.calculatePrice(20);
                this.calculateCalories(5);
            }
        });
    }

    calculatePrice(rub) {
        return this.prise += rub;
    }

    calculateCalories(cal) {
        return this.calorie += cal;
    }

    render() {
        const total = document.querySelector('.total');
        total.innerHTML = '';
        total.insertAdjacentHTML('beforeend', `Стоимость бургера: ${this.prise} \u20bd, калорийность: ${this.calorie} ккал.`)
    }
}

const burger = new Hamburger();