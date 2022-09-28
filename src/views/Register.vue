<template>
    <div class="text-center">
        <h2>Register</h2>
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
            message:'Please, enter a 6 digit password',
            whitespace:true,
            min:6
        }
    ]"
>
<a-input-password v-model:value="formState.password"></a-input-password>
</a-form-item>
<a-form-item 
    label="Re enter password"
    name="repassword"
    :rules="[
        {
            validator:validatePassword,
            required:true,
        }
    ]"
>
<a-input-password v-model:value="formState.repassword"></a-input-password>
</a-form-item>
<a-form-item>
    <a-button 
    type="primary"
     html-type="submit"
     :disabled="userStore.loadingUser"
     :loading="userStore.loadingUser" >
        Create user
    </a-button>
</a-form-item>
</a-form>
<a-button 
type="primary"
:disabled="userStore.loadingUser"
:loading="userStore.loadingUser"
@click="userStore.singInWithGoogle"
>
    Log in with google
</a-button>
</a-col>
</a-row>
</div>
</template>

<script setup> 
import { reactive } from 'vue';
import { useUserStore } from '../store/user';
import {message} from "ant-design-vue"

const userStore=useUserStore()
const formState=reactive({
    password:"",
    repassword:"",
    email:""
})

const validatePassword=async(_rule,value)=>{
    if(value===""){
        return Promise.reject("Please, re enter password")
    }
    if(value !== formState.password){
        return Promise.reject("Passwords must match")
    }
    Promise.resolve()
}

const onFinish=async(values)=>{
    console.log("Success",values)
    const res=await userStore.registerUser(formState.email,formState.password)
    if(!res){
        return message.success("Check your email to continue")
    }
    switch(res){
        case "auth/email-already-in-use":
            message.error("Email already in use")
            break;
    }
}

const onFinishFailed=(errorInfo)=>{
    console.log("Failed",errorInfo)
}
</script>

<style >

</style>