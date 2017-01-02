import Vue from 'vue'
import VueRouter from 'vue-router'
import VueStash from 'vue-stash';
import BootstrapVue from 'bootstrap-vue';
import * as log from 'loglevel';
import store from './services/store.js'
import routes from './services/routes.js'
import App from './App.vue'

window.log = log.noConflict();

Vue.use(VueRouter);
Vue.use(VueStash);
Vue.use(BootstrapVue);

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (to.path === '/login' && user) {
        next({
            name: 'home'
        });
    } else {
        if (to.meta.auth) {
            if (user) {
                let success = to.meta.auth.every(function(v,i) {
                    return user.scopes.indexOf(v) !== -1;
                });
                next(success);
            } else {
                next({
                    name: 'login'
                });
            }
        } else {
            next();
        }
    }
});

const app = new Vue({
    router: router,
    render: h => h(App),
    data: { store }
}).$mount('#app');
