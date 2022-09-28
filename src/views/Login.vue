<template>
        <div class="text-center">
        <h2>Login</h2>
<a-row>
    <a-col
    :xs="{span:24}"
    :sm="{span:18,offset:3}"
    :lg="{span:12,offset:6}">
<a-form
    :model="formState"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    name="basic"
    layout="vertical"
    autocomplete="off">
<a-form-item 
    label="Email"
    name="email"
    :rules="[
        {
            required:true,
            type:'email',
            message:'Please, enter a valid email',
            whitespace:true
        }
    ]"
>
<a-input v-model:value="formState.email"></a-input>
</a-form-item>
<a-form-item 
    label="Password"
    name="password"
    :rules="[
        {
            required:true,
            whitespace:true,

           
        }
    ]"
>
<a-input-password v-model:value="formState.password"></a-input-password>
</a-form-item>
<a-form-item>
    <a-button
     type="primary" 
     html-type="submit"
      :disabled="userStore.loadingUser"
     :loading="userStore.loadingUser">
   Log in
    </a-button>
</a-form-item>
</a-form>
<a-button
type="danger"
@click="handleReset">
Forgot password
</a-button>
</a-col>
</a-row>
</div>
</template>
 


<script setup> 
import { reactive } from 'vue';
import { useUserStore } from '../store/user';
import {message} from "ant-design-vue"
import router from '../router/router';

const userStore=useUserStore()
const formState= reactive({
    email:"",
    password:""
})

const onFinishFailed=(errorInfo)=>{
    console.log("Failed",errorInfo)
}


const handleReset=async()=>{
    if (formState.email !== ""){
    const res=await userStore.resetPass(formState.email)
    if(!res){
        message.success("We send you an email to reset your password")
    }else{
        message.error("You are not register")
        router.push('/register')
    }
}
else{
    message.error("Write an email")
}
}

const onFinish=async(values)=>{
    console.log("Success",values)
    const res=await  userStore.loginUser(formState.email,formState.password)
    if (!res){
        return message.success("Welcome again")
    }
    switch(res){
        case "auth/user-not-found":
            message.error("The email is not registered")
            break;
        case "auth/wrong-password":
            message.error("Wrong password")
            break;
    }
}
   
</script>

<style >

</style>