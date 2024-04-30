export default defineNuxtRouteMiddleware((to, from) => {
    const isLogin = localStorage.getItem("isLogin");
    console.log("🚀 ~ defineNuxtRouteMiddleware ~ isLogin:", isLogin)
    console.log(to.path)
    if (!isLogin && to.path !== '/login' && to.path.includes('admin')) {
        return navigateTo("/auth/login")
    }
    return
});