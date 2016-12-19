<template>
</template>
<script>
import auth from '../services/auth.js';

export default {
    name: 'logout',
    store: ['authenticated', 'user'],
    data() {
        return {
        }
    },
    mounted() {
        this.logout();
    },
    methods: {
        logout: auth.logout
    }
}
</script>
