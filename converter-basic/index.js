import Vue from 'vue';
import _ from 'lodash';
import VueResource from 'vue-resource';

import './style.css';

Vue.use(VueResource);

function callAPI() {
    return undefined;
}



new Vue({
    el: '#app',
    data: {
        euros: '',
        taux: '',
        conversion: ''
    },
    watch: {
        euros() {
            if(!this.euros) {
                this.conversion = "La conversion necessite un nombre !";
                return;
            } else if (this.euros.search(/^[d.,]+$/) === -1) {
                this.conversion = "Impossible de convertir autre chose qu'un nombre"
                return;
            }
            this.conversion = "Wait the end of writing...";
            this.getConversion();
        }
    },
    methods: {
        getConversion: _.debounce(() => {
            this.conversion = "Currency retrieving...";
            this.$http.get('https://api.exchangeratesapi.io/latest')
                .then(response => {
                    this.taux = response.body.rates.USD;
                    this.conversion = "Currency retrived !";
                    this.conversion = `${(this.taux * this.euros.replace(',', '.')).toFixed(2)}`
                })
                .catch(error => {
                    this.conversion = `Error: API inaccessible. \n ${error}`
                })
        }, 500)
    }
});