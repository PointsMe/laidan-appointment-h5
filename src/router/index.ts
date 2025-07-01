import { createRouter, createWebHashHistory } from 'vue-router'
import mobileRouter from "@/router/mobileRouter"
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: mobileRouter,
  scrollBehavior() {
    // to, from, savedPosition
    createWebHashHistory
    return { top: 0 }
  }
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
