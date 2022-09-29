<template>
 <div class="text-center">
        <h2>Create a meme</h2>
      
<a-row>
    <a-col
    :xs="{span:24}"
    :sm="{span:18,offset:3}"
    :lg="{span:12,offset:6}">
<a-form
    :model="formState"
    @finish="onFinish"
    name="basic"
    layout="vertical"
    autocomplete="off">
<a-form-item 
    label="Top text"
    name="topText"
>
<a-input v-model:value="formState.topText"></a-input>
</a-form-item>
<a-form-item 
    label="Bottom Text"
    name="bottomText"
 
>
<a-input  v-model:value="formState.bottomText"></a-input>
</a-form-item>
<a-form-item 
    label="Name"
    name="name"
>
<a-input v-model:value="formState.name"></a-input>
</a-form-item>
<a-upload
v-model:file-list="formState.fileList"
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
     >
Create it!
    </a-button>
</a-form-item>
</a-form>
<div v-if="useMeme.download" >
<a v-bind:href="formState.url"> Download </a>
</div>
</a-col>
</a-row>
</div>


</template>



<script setup>

import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import { useMemeGenerator } from '../store/memegenerator';

const useMeme=useMemeGenerator()



const formState=reactive({
   topText:"",
   bottomText:"",
   fileList:[],
   url:"",
   name:""
})

const beforeUpload=(file)=>{
return false
} 


const handleRemove=file=>{
    const index=fileList.value.indexOf(file)
    const newFileList=fileList.value.slice()
    newFileList.splice(index,1)
   formState.fileList=newFileList
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
    formState.fileList = resFileList;

   
}


const onFinish=async()=>{
if (formState.fileList[0]!==null){
const res=await useMeme.createMeme(formState.topText,formState.bottomText,formState.fileList[0],formState.name)

if (!res){
    formState.url=useMeme.memeData
    console.log(formState.url)

    return message.success("Meme created")}

else if (res){
    message.error("Couldnt create a meme, try again later")
}
}
else{
    message.error("You have to upload an image")
}
}


</script>