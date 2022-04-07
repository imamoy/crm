<template lang='pug'>
v-app#app
	MenuBar
	v-main(:class="route.path === '/login' ? 'login-page':''")
		router-view
</template>
<script>
import MenuBar from '@/layout/MenuBar.vue';

export default {
    name: 'App',
    components: {
        MenuBar
    },
    computed: {
        route() {
            return this.$route;
        }
    },
};
</script>

<style lang="scss">
@import '~normalize.css/normalize.css';
@import 'style/allview'; //共用的all.scss
</style>