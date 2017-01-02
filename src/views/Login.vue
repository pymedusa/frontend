<template>
    <div id="content">
        <div class="login">
            <form action="" method="post">
                <h1>Medusa</h1>
                <span v-if="error" style="color: red; font-size: 20px;">ERROR: {{error}}</span>
                <div class="ctrlHolder">
                    <input class="inlay" v-model="username" type="text" placeholder="Username" autocomplete="off" />
                </div>
                <div class="ctrlHolder">
                    <input class="inlay" v-model="password" type="password" placeholder="Password" autocomplete="off" />
                </div>
                <div class="ctrlHolder">
                    <input class="inlay" v-model="baseUrl" type="text" placeholder="http://localhost:8081/api/v2" autocomplete="off" />
                </div>
                <div class="ctrlHolder">
                    <label class="remember_me" title="for 30 days">
                        <input class="inlay" v-model="rememberMe" type="checkbox" value="1" />&nbsp;<span>Remember me</span>
                    </label>
                    <input v-on:click.submit.prevent="login()" class="button" name="submit" type="submit" value="Login" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import api from '../services/api.js';
import auth from '../services/auth.js';

export default {
    name: 'login',
    store: ['authenticated', 'user'],
    data() {
        return {
            username: '',
            password: '',
            baseUrl: 'http://localhost:8081/api/v2',
            rememberMe: true,
            error: ''
        }
    },
    methods: {
        login: auth.login,
        logout: auth.logout
    }
}
</script>
