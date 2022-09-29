<template>
    <div class="text-center">
<h1>Home </h1>
<h2>Welcome {{userStore.userData?.displayName}}</h2>
<AddForm></AddForm>
<a-spin v-if="database.loading"></a-spin>
<h2>Urls</h2>
<a-input-search
type="text"
v-model:value="name"
>

</a-input-search>
<a-space direction="vertical" style="width:100%">
    <a-card v-for="item of filter" 
    :key="item.id"
    :title="item.alias"
    >
<template #extra>
    <a-space>
        <a-button 
        type="primary"
         @click="router.push(`/edit/${item.id}`)"
         class="ml-1"
         >Edit</a-button> 
        <a-popconfirm 
        title="Are you sure?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="confirm(item.id)"
        @cancel="cancel"
       >
    </a-popconfirm>
        <a-button danger
        class="mr-1" >Delete</a-button>
        <a-button 
        @click="copyUrl(item.name)"
        
        >Copy</a-button>
  
    </a-space>
</template>
<p>{{item.name}}</p>
    </a-card>
</a-space>
</div>
</template>

<script setup>
import { useUserStore } from '../store/user';
import { useDataBaseStore } from '../store/database';
import { useRouter } from 'vue-router';
import {onBeforeMount,ref,watchEffect} from 'vue'
import AddForm from '../components/AddForm.vue';
import { message } from 'ant-design-vue';
const filter=ref([])
const name=ref("")
const userStore=useUserStore()
const database=useDataBaseStore()
const router=useRouter()
const confirm = async (id) => {
    const error = await database.deleteUrl(id);
    if (!error) return message.success("Se eliminó con éxito ");
    return message.error(error);
};

const cancel=(e)=>{
    console.log(e)
    message.error("Url has not been deleted")
}

const copyUrl=async(url)=>{
if(!navigator.clipboard){
    return message.error("Couldnt copy to clipboard")
}
const path=url

const res=await navigator.clipboard.writeText(path)
if(!res){
    return message.success("Copy to clipboard")
}
else{
    message.error("Couldnt copy to clipboard")
}
}


watchEffect(()=>{
    let inputName=name.value.toLowerCase()
  
   filter.value=database.documents.filter((doc)=>{
   if( doc.alias.toLowerCase().includes(inputName))
   return doc

   })
})



onBeforeMount(async() => {
    await database.getUrls()
    if (name.value===""){
filter.value=database.documents
    }
})
</script>

<style>
    .mr-1{
        margin-right: 0.5rem;
    }
    .ml-1{
        margin-left: 00.5rem;
    }

</style>