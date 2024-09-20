<template>
    <NuxtPage />
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from '#app'
  
  const router = useRouter()
  
  onMounted(() => {
    // Wrap the router access in a nextTick to ensure it's available
    nextTick(() => {
      if (router.currentRoute.value.path === '/') {
        router.push('/login')
      }
    })
  })
  </script>