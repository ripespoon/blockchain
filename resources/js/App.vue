<template>
    <div>
        <header class="header">
            <div class="header__wrapper">
                <img class="header__logo" src="public/images/logo.svg" alt="Blockchain" title="Blockchain">
            </div>
        </header>

        <router-view class="page"></router-view>

        <footer class="footer">
            &copy; Copyright Some Company Name
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },

    mounted() {
    },

    methods: {
    }
}
</script>
