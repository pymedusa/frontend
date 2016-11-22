import Vue from 'vue'
import VueRouter from 'vue-router'
import api from './services/api.js'
import store from './services/store.js'
import routes from './services/routes.js'
import App from './App.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    // mode: 'history' // This can be enabled once we have a real server
});

const app = new Vue({
    router: router,
    render: h => h(App),
    created() {
        // Get the initial config data
        var vm = this;
        api.get('config').then(function(response) {
            for (var key in response.data) {
                if (key === 'useSubtitles'){
                    Vue.set(store.state, 'subtitles', {
                        enabled: response.data[key]
                    });
                } if(key === 'plex') {
                    Vue.set(store.state, 'plex', {
                        server: response.data[key]
                    });
                } else {
                    Vue.set(store.state, key, response.data[key]);
                }
            }
        }).catch(function(error) {
            throw new Error(error);
        });
    }
}).$mount('#app');
