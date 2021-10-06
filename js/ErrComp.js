Vue.component('err', {
    data() {
        return {
            showErr: false,
            message: '',
        }
    },
    methods: {
        visionErr(error) {
            this.message = error;
            this.showErr = true;
        }
    },
    template: `<div v-show="showErr">
                    <h2>Произошла ошибка.</h2>
                    <p>{{ message }}</p>
               </div>`
});