<template>
    <div class="min-h-screen bg-cyan-500 text-white p-6">
      <div class="flex items-center mb-6">
        <button @click="goHome" class="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-2xl font-bold flex-grow text-center">Leaderboard</h1>
      </div>
  
      <div class="bg-white rounded-full p-1 flex mb-8">
        <button 
          @click="setActiveSession('all')" 
          :class="[
            'flex-1 py-2 rounded-full',
            activeSession === 'all' ? 'bg-cyan-500 text-white' : 'text-cyan-800'
          ]"
        >
          All time
        </button>
        <button 
          @click="setActiveSession('week')" 
          :class="[
            'flex-1 py-2 rounded-full',
            activeSession === 'week' ? 'bg-cyan-500 text-white' : 'text-cyan-800'
          ]"
        >
          This week
        </button>
        <button 
          @click="setActiveSession('month')" 
          :class="[
            'flex-1 py-2 rounded-full',
            activeSession === 'month' ? 'bg-cyan-500 text-white' : 'text-cyan-800'
          ]"
        >
          Month
        </button>
      </div>
  
      <div class="flex justify-between items-end mb-8">
        <!-- Top 3 players section remains unchanged -->
      </div>
  
      <div class="bg-white rounded-t-3xl p-6">
        <div v-for="player in leaderboardData" :key="player.fullName" class="flex items-center mb-4">
          <span class="w-6 text-cyan-800 font-semibold">{{ player.rank }}</span>
          <div class="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img :src="`https://via.placeholder.com/48`" :alt="player.fullName" class="w-full h-full object-cover" />
          </div>
          <span class="flex-grow text-cyan-800 font-semibold">{{ player.fullName }}</span>
          <span class="text-cyan-500 font-semibold">{{ player.currentWeekTotal }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl;
    console.log(baseUrl)
  
  definePageMeta({
    layout: false
  })
  
  const router = useRouter()
  const leaderboardData = ref([])
  const activeSession = ref('week')  // Default to 'week' as the active session
  
  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(`${baseUrl}/quiz/Get-leaderBoard`)
      const result = await response.json()
      if (result.success) {
        leaderboardData.value = result.data
      } else {
        console.error('Failed to fetch leaderboard data')
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error)
    }
  }
  
  const goHome = () => {
    router.push('/home')
  }
  
  const setActiveSession = (session) => {
    activeSession.value = session
    // Here you would typically fetch new data based on the selected session
    // For now, we'll just log the change
    console.log(`Switched to ${session} session`)
  }
  
  onMounted(() => {
    fetchLeaderboardData()
  })
  </script>