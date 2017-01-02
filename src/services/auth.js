import api from './api.js';
import jwt_decode from 'jwt-decode';

export default {
    isAuthenticated() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (this.hasScopes(['developer'])) {
            log.setDefaultLevel('trace');
        } else {
            log.setDefaultLevel('error');
        }
        return !!localStorage.getItem('idToken');
    },
    login() {
        var vm = this;
        // @NOTE: If you're not logged in then all URLs will be naked
        vm.baseUrl = vm.baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
        api.post(vm.baseUrl + '/authenticate', {
            username: vm.username,
            password: vm.password
        }).then(function (response) {
            let token = jwt_decode(response.data);
            if(token) {
                // @TODO: We should check for x-medusa-server header to make sure it actually is Medusa
                //        If we don't we could get weird JSON/HTML back and that breaks a LOT of the config data
                // Set the token and user profile in local storage
                // @TODO: Replace apiKey with idToken once we have JWT
                localStorage.setItem('idToken', response.data);
                localStorage.setItem('baseUrl', vm.baseUrl);
                localStorage.setItem('user', JSON.stringify({
                    scopes: token.scopes,
                    username: token.username,
                    apiKey: token.apiKey // Currently this is for images, etc. that can't send headers
                }));

                vm.$store.user = {
                    scopes: token.scopes
                };

                api.get('config').then(function(response) {
                    for (var key in response.data) {
                        vm.$store.config[key] = response.data[key];
                    }
                    // We leave this to just before $router.push
                    // so nothing loads before config is set
                    vm.$store.authenticated = true;
                    vm.$router.push({
                        name: 'home'
                    });
                }).catch(function(error) {
                    if ('error' in error.response.data) {
                        vm.error = error.response.data.error;
                    }
                    throw new Error(error);
                });
            } else {
                throw new Error('UPDATE MEDUSA');
            }
        }).catch(function (error) {
            if ('response' in error){
                if ('error' in error.response.data) {
                    vm.error = error.response.data.error;
                }
            } else {
                throw new Error(error);
            }
        });
    },
    logout() {
        // To log out, we just need to remove the token and profile from local storage and $store
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('baseUrl');
        localStorage.removeItem('user');
        this.$store.authenticated = false;
        this.$store.user = {};
        this.$router.push({
            name: 'home'
        });
    },
    hasScopes(scopes) {
        // If the user has the scope in their scopes array then return true, otherwise return false
        scopes = (Array.isArray(scopes) ? scopes : [scopes]);
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            if ('scopes' in user && user['scopes'].length > 0) {
                return scopes.every(function(v, i) {
                    return user.scopes.indexOf(v) !== -1;
                });
            }
            return false;
        } else {
            return false;
        }
    }
}
