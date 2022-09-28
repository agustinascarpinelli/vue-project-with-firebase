<template>

        <div class="text-center">
        <h2>Profile</h2>
        <a-avatar
        :src="userStore.userData.photoURL" 
        class="text-center mb-2"
       :size="150"
        ></a-avatar>
      
<a-row>
    <a-col
    :xs="{span:24}"
    :sm="{span:18,offset:3}"
    :lg="{span:12,offset:6}">
<a-form
    :model="userStore.userData"
    @finish="onFinish"
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
<a-input  disabled v-model:value="userStore.userData.email"></a-input>
</a-form-item>
<a-form-item 
    label="Name"
    name="displayName"
    :rules="[
        {
            required:true,
            message:'Please, enter a name'
        
        }
    ]"
>
<a-input  v-model:value="userStore.userData.displayName"></a-input>
</a-form-item>
<a-upload
v-model:file-list="fileList"
list-type="picture"
:before-upload="beforeUpload"
@change="handleChange"

>
<a-button>Upload photo</a-button>
</a-upload>
<a-form-item>
    <a-button
     class="mt-2"
     type="primary" 
     html-type="submit"
      :disabled="userStore.loadingUser"
     :loading="userStore.loadingUser">
 Update profile
    </a-button>
</a-form-item>
</a-form>
</a-col>
</a-row>
</div>


</template>

<script setup>
import { message } from 'ant-design-vue';
import { useUserStore } from '../store/user';
import { ref } from 'vue';

const userStore=useUserStore()
const fileList=ref([])

const beforeUpload=(file)=>{
return false /* beforeupload try to make a req to the server. We have to return false to not get an error of the request */
    
}
const handleRemove=file=>{
    const index=fileList.value.indexOf(file)
    const newFileList=fileList.value.slice()
    newFileList.splice(index,1)
    fileList.value=newFileList
}

const handleChange=info=>{
    //validation for images types
    if(info.file.status !== "uploading"){
        const isJpgorPng=info.file.type==='image/jpeg' ||  info.file.type==='image/png'
        if(!isJpgorPng){
           message.error('You can only upload JPG or PNG file')
           handleRemove(info.file)
           return
        }
        const isLt2M=info.file.size /1024/1024 <2
        if(! isLt2M){
            message.error('Image must be smaller than 2MB')
            handleRemove(info.file)
            return
        }
    }


    //make a validation to only upload one image,if user upload another the other will be replaced
    let resFileList = [...info.fileList];
    resFileList = resFileList.slice(-1);
    resFileList = resFileList.map((file) => {
        if (file.response) {
            file.url = file.response.url;
        }
        return file;
    });
    fileList.value = resFileList;

   
}


const onFinish=async()=>{

const res=await userStore.upDateUser(userStore.userData.displayName,fileList.value[0])

if (!res){
    return message.success("Profile updated")
}
switch (res){
case "storage/unauthorized":
    message.error("Image must be png or jpeg and smaller than 5MB")
    break;
default:
    message.error("Error at server")
    break
}}


</script>

<style>
    .mb-2{
        margin-bottom: 2rem;
    }
    .mt-2{
        margin-top: 2rem;
    }
</style>