<template>
    <div>
        <h1>Edit</h1>

   
<a-form
:model="formState"
@finish="onFinish"
name="basicAdd"
layout="vertical"
autocomplete="off"
>
<a-form-item
label="Enter a URL"
name="url"
:rules="[
    {
        required:true,
        whitespace:true,
        pattern:regExpUrl,
        message:'Enter a valid URL',
    }
]"
>
<a-input v-model:value="formState.url"></a-input>

<a-space>
    <a-button
    type="primary"
    html-type="submit"
    :loading="database.loading"
    >Update</a-button>
<a-button danger @click="router.push('/')">Back</a-button>
</a-space>
</a-form-item>
</a-form>
</div>
</template>

<script setup>
    import { useDataBaseStore } from '../store/database';
    import {reactive,onMounted} from 'vue'
    import {message} from "ant-design-vue"
    import {regExpUrl} from '../utils/regExp'
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';
    const database=useDataBaseStore()
    const router=useRouter()
    const route=useRoute()
    
    const formState=reactive({
        url:""
    })
    
    const onFinish=async(values)=>{
        const res=await database.updateUrl(route.params.id,formState.url)
    if(!res){
        formState.url = "";
        message.success("URL updated")
        return router.push('/')
    }
    switch (res){
        default:
            message.error("Error at server")
    }
    }
    
    onMounted(async()=>{
formState.url=await database.readDoc(route.params.id)


})

</script>





