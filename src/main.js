import Vue from 'vue'
import VueRouter from 'vue-router'
import VueStash from 'vue-stash';
import store from './services/store.js'
import routes from './services/routes.js'
import App from './App.vue'

Vue.use(VueRouter);
Vue.use(VueStash);

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let success = to.meta.auth.every(function(v,i) {
                return user.roles.indexOf(v) !== -1;
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
});

const app = new Vue({
    router: router,
    render: h => h(App),
    data: { store }
}).$mount('#app');
