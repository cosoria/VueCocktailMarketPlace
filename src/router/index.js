import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CatalogView from '../views/CatalogView.vue';
import InventoryView from '../views/InventoryView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import ProductEditView from '../views/ProductEditView.vue';
import LoginView from '../views/LoginView.vue';
import CartView from '../views/CartView.vue';
import RegisterView from '../views/RegisterView.vue';
import NotFoundView from '../views/NotFoundView.vue';

import { useUserStore } from '../stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: false },
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
      meta: { auth: false },
    },
    {
      path: '/catalog/:id',
      name: 'product_detail',
      component: ProductDetailView,
      props: true,
      meta: { auth: false },
    },
    {
      path: '/catalog/edit/:id',
      name: 'product_edit',
      component: ProductEditView,
      props: true,
      meta: { auth: true },
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView,
      meta: { auth: true },
    },
    {
      path: '/inventory/:id',
      name: 'inventory_detail',
      component: ProductDetailView,
      props: true,
      meta: { auth: true },
    },
    {
      path: '/inventory/edit/:id',
      name: 'inventory_edit',
      component: ProductEditView,
      props: true,
      meta: { auth: true },
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { auth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { auth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { auth: false },
    },
    {
      path: '/404',
      name: 'not_found',
      component: NotFoundView,
      meta: { auth: false },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      meta: { auth: false },
    },
  ]
});



router.beforeEach((to, from) => {
  const userStore = useUserStore();

  // if (to.meta.auth && !userStore.isAuthenticated) {
  //   return { name: "login" };
  // }
});

export default router;
