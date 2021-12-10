import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../views/Test.vue'
import Admin from '../views/Admin.vue'
import CustomIndex from '../views/CustomIndex.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Activate from '../views/Activate'
import ProductManager from '../components/ProductManager.vue'
import SellStatistics from '../components/SellStatistics.vue'
import UserBuyTrace from '../components/UserBuyTrace.vue'
import UserViewTrace from '../components/UserViewTrace.vue'
import CustomGoodDetailView from '../views/CustomGoodDetailView.vue'
import CartView from '../views/CartView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    component: Test
  },
  {
    path: '/admin',
    component: Admin,
    children:[
      {
        path:'',
        components:{
              default: ProductManager,
              SellStatistics: SellStatistics,
              UserBuyTrace: UserBuyTrace,
              UserViewTrace: UserViewTrace
        }
      }
    ]
  },
  {
    path: '/home',
    component: CustomIndex
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/userActivate',
    component: Activate
  },
  {
    path:'/goodDetail',
    component: CustomGoodDetailView
  },
  {
    path: '/user/cart',
    component: CartView
  },
  {
    path:'',
    redirect:'/home'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
