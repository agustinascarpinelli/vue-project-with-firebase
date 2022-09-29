<template>
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
</a-form-item>
<a-form-item
label="Enter a name"
name="alias"

>
<a-input v-model:value="formState.alias"></a-input>
</a-form-item>
<a-form-item>
    <a-button
    type="primary"
    html-type="submit"
    :loading="database.loadingDocs"
    >Add</a-button>
</a-form-item>

</a-form>
</template>


<script setup>
import { useDataBaseStore } from '../store/database';
import {reactive} from 'vue'
import {message} from "ant-design-vue"
import {regExpUrl} from '../utils/regExp'
const database=useDataBaseStore()

const formState=reactive({
    url:"",
    alias:""
})

const onFinish=async(values)=>{
    const res=await database.addUrl(formState.url,formState.alias)
if(!res){
    return message.success("URL added")
}
switch (res){
    default:
        message.error("Error at server")
}
}
</script>