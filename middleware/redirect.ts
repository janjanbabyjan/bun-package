export default defineNuxtRouteMiddleware((to, from) => {
    console.log("🚀 ~ defineNuxtRouteMiddleware ~ to:", to)
    // if (to.path == '/') {
    //     return navigateTo("/public/dashboard")
    // }
    // return
});

