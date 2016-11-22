import HomeComponent from '../views/Home.vue'
import ShowComponent from '../views/Show.vue'
import NotFoundComponent from '../views/NotFound.vue'

export default [{
    name: 'home',
    path: '/',
    component: HomeComponent
}, {
    name: 'show',
    path: '/show/:showId',
    component: ShowComponent
}, {
    name: 'notFound',
    path: '*',
    component: NotFoundComponent
}];
