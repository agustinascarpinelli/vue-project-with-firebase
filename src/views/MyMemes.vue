<template>
  <h2 class="text-center title">My memes</h2>
  <div class="space-align-container">
    
 <a-card class="m-card" v-for="item of useMemes.memes" 
    :key="item.id"
    :title="item.top_text"
>
  
      <template #extra>
   <a-button class="button-c" @click="favoriteMeme(item.id)">  <heart-outlined v-if="!item.fav" />  <heart-two-tone v-else two-tone-color="#eb2f96" /> </a-button>
      </template>


    <template #cover>
      <img alt="example"  v-bind:src="`https://storage.googleapis.com/memebuild/uploads/${item.file}.jpg`" :width="200">
    </template>
    <a-card-meta >
     <template #description> <a-button><a v-bind:href="`https://storage.googleapis.com/memebuild/uploads/${item.file}.jpg`"> Grab this one </a></a-button>
    
     </template>
    </a-card-meta>
  </a-card>
</div>
</template>


<script setup>
    import { useMemeGenerator } from '../store/memegenerator';
    import { onBeforeMount,ref } from 'vue';
    import { HeartOutlined, HeartTwoTone } from '@ant-design/icons-vue';
    
    const useMemes=useMemeGenerator()

   const favoriteMeme=(id)=>{
     const map=useMemes.memes.forEach(element => {
         if (element.id===id){
             element.fav=!element.fav
         }
     })
        
   }
    
    
    
    onBeforeMount(async() => {
    await useMemes.getMemes()
    

})




</script>


<style>
.space-align-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
     justify-content: center;
}

.m-card{
     margin-left:0.4rem;
     margin-right:0.4rem;
     margin-bottom:0.4rem;
       width:14rem;
       height:28rem;
    
}
.title{
    margin-bottom:3rem
}

.ant-card-body{
    justify-content:center;
    display:flex;
  
}

.button-c{
    border:none;
    margin-bottom:00.2rem;
    box-shadow:none;
}
</style>