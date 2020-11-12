<template>
    <div>
        <div class="backdrop">
            <div class="modal">
                <div class="modal__header">
                    BitCoin Converter
                    <p class="modal__header-slogan">Convert {{ currencyCode }} into BitCoin</p>
                </div>

                <div class="modal__body">
                    <p class="error" v-if="validationError">You must enter a number above 0 to calculate</p>

                    <input type="number" :placeholder="'Enter ' + currencyCode" v-model="value" min="0" @keyup.enter="makeConversion()" autofocus>

                    <div class="converted" v-if="this.convertedAmount !== null && this.previousValue === this.value">
                        <p>{{ value + ' ' + currencyCode }} converts to</p>
                        <span>{{ this.convertedAmount }} BTC</span>
                    </div>
                </div>

                <div class="modal__footer">
                    <button class="button" @click="$emit('close')">Close</button>
                    <button :class="value !== '' ? 'button' : 'button button--disabled'" @click="makeConversion()">
                        <span v-if="!converting">Convert Amount</span>
                        <i v-else class="fas fa-spinner fa-spin"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        currencyCode: String
    },

    data() {
        return {
            value: '',
            validationError: false,
            converting: false,
            convertedAmount: null,
            previousValue: ''
        }
    },

    mounted() {
    },

    methods: {
        /*
         * Take the input value and fire it to the blockchain API to retrieve value.
         * Before we make the API request, lets clear any old validation messages.
         * We also want to display a loading spinner incase their API is lagging.
         *
         * We are saving the 'previousValue' so that we know not to display the
         * value box with the old converted number in if they change the input.
         * @param {none}
         */
        makeConversion() {
            this.previousValue = this.value;
            this.validationError = false;
            this.converting = true;
            this.convertedAmount = null;

            if (this.value === '' || this.value < 0) {
                this.validationError = true;
                return false;
            }

            axios.get('https://blockchain.info/tobtc?currency=' + this.currencyCode + '&value=' + this.value).then(response => {
                this.convertedAmount = response.data;
            })
            .catch(error => {
                console.log('ERROR');
                console.log(error)
            })
            .finally(() => this.converting = false);
        },
    }
}
</script>
