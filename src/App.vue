<script setup>
import { useUserStore } from './store/user';
import {watch,ref} from 'vue'
import {useRoute} from 'vue-router'

const userStore = useUserStore()
const selectedKeys=ref([])
const route=useRoute()

watch(
  ()=>route.name,
  ()=>selectedKeys.value=[route.name]
)

</script>

<template>
  <a-layout >
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu mode="horizontal" theme="dark" :style="{lineHeight:'64px'}" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-if="userStore.userData" key="home">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.userData" key="memegenerator">
          <router-link to="/memegenerator">Generate a meme</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.userData" key="memes">
          <router-link to="/mymemes">My memes</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="login">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.userData" @click="userStore.logoutUser" key="logout">
          <router-link to="/">Logout</router-link>
        </a-menu-item>
        <a-sub-menu v-if="userStore.userData" key="profile">
          <template #icon>
          <a-avatar
        :src="userStore.userData.photoURL" 
        ></a-avatar>
        </template>
        <a-menu-item key="1"> <router-link to="/profile">
            Profile
            </router-link></a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="container">
        <div v-if="userStore.loadingSession" class="text-center">Loading...</div>
        <router-view v-else></router-view>
      </div>
    </a-layout-content>
    </a-layout>
</template>

<style>
  .container{
    height: 100vh;
  padding: 24px;
  background: #fff;
  margin: 0;

  }

  .text-center{
    text-align: center;
  }
</style>