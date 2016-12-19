import api from './api.js';

export default {
    isAuthenticated() {
        return !!localStorage.getItem('idToken');
    },
    login() {
        var vm = this;
        // @NOTE: If you're not logged in then all URLs will be naked
        vm.baseUrl = vm.baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
        api.post(vm.baseUrl + '/auth/login', {
            username: vm.username,
            password: vm.password
        }).then(function (response) {
            // Set the token and user profile in local storage
            // @TODO: Replace apiKey with idToken once we have JWT
            localStorage.setItem('idToken', response.data.apiKey);
            localStorage.setItem('baseUrl', vm.baseUrl);
            localStorage.setItem('user', JSON.stringify({
                roles: ['admin', 'user']
            }));
            // @TODO: These will need JWT added to Medusa, ATM we fake the user
            // localStorage.setItem('refreshToken', response.data.refreshToken);
            // localStorage.setItem('user', JSON.stringify(response.data.user));

            // Update auth service
           vm.$store.authenticated = true;
           vm.$store.user = {
               roles: ['admin', 'user']
           };

            api.get('config').then(function(response) {
                for (var key in response.data) {
                    vm.$store.config[key] = response.data[key];
                }
                vm.$router.push({
                    name: 'home'
                });
            }).catch(function(error) {
                if (error.response.data.error) {
                    vm.error = error.response.data.error;
                }
                throw new Error(error);
            });
        }).catch(function (error) {
            if (error.response.data.error) {
                vm.error = error.response.data.error;
            }
            throw new Error(error);
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
    hasRoles(roles) {
        // If the user has the role in their roles array then return true, otherwise return false
        roles = (Array.isArray(roles) ? roles : [roles]);
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return roles.every(function(v,i) {
                return user.roles.indexOf(v) !== -1;
            });
        } else {
            return false;
        }
    }
}
