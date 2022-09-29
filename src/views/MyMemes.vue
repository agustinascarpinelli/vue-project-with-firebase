<template>
<a-space direction="vertical" style="width:100%">
    <a-card v-for="item of useMemes.memes" 
    :key="item.id"

    > 
    <img v-bind:src="`https://storage.googleapis.com/memebuild/uploads/${item.file}.jpg`"/>
    <a-button><a v-bind:href="`https://storage.googleapis.com/memebuild/uploads/${item.file}.jpg`"> Grab this one </a></a-button>
    </a-card>

</a-space>
</template>


<script setup>
    import { useMemeGenerator } from '../store/memegenerator';
    import { onBeforeMount } from 'vue';
    const useMemes=useMemeGenerator()
    
    
    
    
    onBeforeMount(async() => {
    await useMemes.getMemes()
    

})




</script>