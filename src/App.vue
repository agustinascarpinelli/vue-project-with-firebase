<script setup>
  import { useUserStore } from './store/user';
  const userStore=useUserStore()


</script>

<template>
<div v-if="userStore.loadingSession">Loading...</div>
<div v-else>
<h1>App</h1>
<nav >
  <router-link to="/" v-if="userStore.userData" >Home</router-link>
   <router-link to="/login" v-if="!userStore.userData">Login</router-link>
    <router-link to="/register" v-if="!userStore.userData" >Register</router-link>
    <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
</nav>
<router-view></router-view>
</div>
</template>
