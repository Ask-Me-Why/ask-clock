import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/index';
export const AllRoutersMap = [{
        path: '/',
        name: 'Index',
        component: Index
}
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    // }
];


Vue.use(Router);
const beforeEach = (toRoute, fromRoute, next) => {
    next();
};
const afterEach = (toRoute, fromRoute) => {};


const router = new Router({
    routes: AllRoutersMap
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);
export default router;
