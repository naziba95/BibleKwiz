<template>
    <NuxtPage />
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  onMounted(() => {
    if (router.currentRoute.value.path === '/') {
      router.push('/login')
    }
  })
  </script>