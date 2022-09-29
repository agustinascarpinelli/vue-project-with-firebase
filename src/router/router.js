import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { useUserStore } from '../store/user'
import Edit from '../views/Edit.vue'
import Profile from '../views/Profile.vue'
import MemeGenerator from '../views/MemeGenetator.vue'
import NotFound from '../views/NotFound.vue'
import { useDataBaseStore } from '../store/database'
import MyMemes from '../views/MyMemes.vue'

const requireAuth=async(to,from,next)=>{
    const userStore=useUserStore()
    userStore.loadingSession=true
    const user=await userStore.currentUser()
    if(user && user.emailVerified){
        next()
    }else{
        next("/login")
    }
    userStore.loadingSession=false
 }


const redirect=async(to,from,next)=>{
    const userStore=useDataBaseStore()
    const database=useDataBaseStore()
    userStore.loadingSession=true
    const name = await database.getURL(to.params.pathMatch[0]);
    if (!name) {
        next();
        userStore.loadingSession = false;
    } else {
        window.location.href = name;
        userStore.loadingSession = true;
        next();
    }

}

const routes=[
    {path:"/", component:Home, beforeEnter: requireAuth,name:"home"},
    {path:"/memegenerator", component:MemeGenerator, beforeEnter: requireAuth,name:"memegenerator"},
    {path:"/mymemes", component:MyMemes, beforeEnter: requireAuth,name:"memes"},
    {path:"/login", component:Login,name:"login"},
    {path:"/register", component:Register,name:"register"},
    {path:"/edit/:id",component:Edit,beforeEnter:requireAuth,name:"edit"},
    {path:"/profile",component:Profile,beforeEnter:requireAuth,name:"profile"},
    {path:"/:pathMatch(.*)*", component:NotFound,name:'redirect',beforeEnter:redirect}
]

const router=createRouter({
    routes,
    history:createWebHistory()
})

export default router