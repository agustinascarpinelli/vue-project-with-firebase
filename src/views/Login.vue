<template>
    <div>
<h1> Login </h1>
<form @submit.prevent="handleSubmit">
<input type="email" placeholder="Email" v-model="email">
<input type="password" placeholder="Password" v-model="password">
<button type="submit" >Log in</button>
</form>
</div>
</template>

<script setup> 
import { ref } from 'vue';
import { useUserStore } from '../store/user';

const userStore=useUserStore()
    const email=ref("")
    const password=ref("")
    const handleSubmit=()=>{
       if(!email.value || password.value.length<6){
    alert("Please,complete the fields")    
    }
    userStore.loginUser(email.value,password.value)
    }

</script>

<style >

</style>