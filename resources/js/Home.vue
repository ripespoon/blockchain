<template>
    <div>
        <h1 class="page__title">Latest Tickers</h1>
        <p class="page__ticker-update">
            <span>Last Updated: {{ this.lastUpdated }}</span>
            <span>Updating in: {{ this.timeTillUpdate }} seconds</span>
        </p>

        <div class="list-wrap">
            <table class="list">
                <thead>
                    <th>Currency</th>
                    <th>15m</th>
                    <th>Last</th>
                    <th>Buy</th>
                    <th>Sell</th>
                    <th>Convert</th>
                </thead>
                <tbody>
                    <tr v-for="(data, currencyCode) in this.tickerData">
                        <td>{{ currencyCode }}</td>
                        <td>{{ data.symbol + data['15m'] }}</td>
                        <td>{{ data.symbol + data.last }}</td>
                        <td>{{ data.symbol + data.buy }}</td>
                        <td>{{ data.symbol + data.sell }}</td>
                        <td><button class="button" type="button" @click="openConversionModal(currencyCode)">Convert {{ currencyCode }}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <conversion-modal :currencyCode="selectedCurrencyCode" v-if="displayConversionModal" v-on:close="displayConversionModal = false" />
    </div>
</template>

<script>
import axios from 'axios';
import ConversionModal from './ConversionModal.vue';

export default {
    components: {
        ConversionModal
    },

    data() {
        return {
            loading: true,
            displayConversionModal: false,
            tickerData: [],
            selectedCurrencyCode: '',
            lastUpdated: null,
            timeTillUpdate: 30
        }
    },

    mounted() {
        this.fetchTickerData();

        /*
         * We'll set a 30 second interval here to fetch the API data
         * In curcumstances this would be better to utilise
         * a WebSocket API instead.
         */
        var self = this;

        setInterval(function() {
            self.timeTillUpdate = (self.timeTillUpdate - 1);

            if (self.timeTillUpdate === 0) {
                self.resetCountdown();
            }
        }, 1000);
    },

    methods: {
        /*
         * Fetch Ticker data from BlockChain API.
         * @param {none}
         */
        fetchTickerData() {
            axios.get('https://blockchain.info/ticker').then(response => {
                this.tickerData = response.data;

                var date = new Date();
                var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                this.lastUpdated = time;
            })
            .catch(error => {
                alert('Sorry we couldn\'t fetch BlockChain data at this time, please try again later.');
            })
            .finally(() => this.loading = false);
        },

        /*
         * Pop up the conversion modal form.
         * @param {currencyCode} string
         */
        openConversionModal(currencyCode) {
            this.selectedCurrencyCode = currencyCode;
            this.displayConversionModal = true;
        },

        /*
         * Reset the countdown timer back to 30 and fetch API data.
         * @param {none}
         */
        resetCountdown() {
            this.fetchTickerData();
            this.timeTillUpdate = 30;
        }
    }
}
</script>
