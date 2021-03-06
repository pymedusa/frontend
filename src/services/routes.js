import HomeComponent from '../views/Home.vue'
import ShowComponent from '../views/Show.vue'
import LoginComponent from '../views/Login.vue'
import LogoutComponent from '../views/Logout.vue'
import NotFoundComponent from '../views/NotFound.vue'

export default [{
    name: 'home',
    path: '/',
    component: HomeComponent,
    meta: {
        auth: ['show:read']
    }
}, {
    name: 'show',
    path: '/show/:showId',
    component: ShowComponent,
    meta: {
        auth: ['show:read']
    }
}, {
    name: 'login',
    path: '/login',
    component: LoginComponent
}, {
    name: 'logout',
    path: '/logout',
    component: LogoutComponent
}, {
    name: 'notFound',
    path: '*',
    component: NotFoundComponent
}];
