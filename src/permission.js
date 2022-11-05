import router from './router'
import cookies from '@/utils/cookies'
import { TOKEN } from '@/config/constant'
import getPageTitle from '@/utils/getPageTitle'
import { useUserStore, usePermissionStore } from '@/store'
import NProgress from '@/utils/progress'

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta?.title)
  const hasToken = cookies.get(TOKEN);
  const userStore = useUserStore()
  const permissionStore = usePermissionStore();
  console.log(hasToken);
  if (hasToken && hasToken !== 'undefined') {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = userStore.SET_ROLE_INFO()
          // usePermissionStore().generateRoutes().then(accessRoutes => {
          // console.log(accessRoutes)
          const accessRoutes = await permissionStore.SET_ROUTES(roles)
          accessRoutes.forEach(item => {
            router.addRoute(item)
          })
          console.log
          next({ ...to, replace: true })
          // })
        } catch (error) {
          await userStore.RESET_INFO()
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
