import VueRouter from 'vue-router';
import Vue from 'vue';
import rbPerformance from '../views/robotPerformance.vue'
import viewlog from '../views/robotDatalog.vue'
import viewsteam from '../views/robotSteam.vue'
import viewIO from '../views/robotIO.vue'
import viewConnect from '../views/robotConnect.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: "/",
        name:"first",
        component: rbPerformance
    },
    {
        path: "/viewlog",
        name:"secound",
        component: viewlog
    },
    {
        path: "/stream",
        name:"third",
        component: viewsteam
    },
    {
        path: "/device",
        name:"fourth",
        component: viewIO
    },
    {
        path: "/rtdeconenct",
        name:"fif",
        component: viewConnect
    },
];
const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
     routes 
    })
export default router;