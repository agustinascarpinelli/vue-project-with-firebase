<template>
    <div>
<h1>Home </h1>
<p>{{userStore.userData?.email}}</p>
    </div>
</template>

<script setup>
import { useUserStore } from '../store/user';
import { useDataBaseStore } from '../store/database';
const userStore=useUserStore()
const database=useDataBaseStore
database.getUrls()
</script>

<style>

</style>