<template>
  <div :key="userUpdateKey" class="bg-gray-100 my-10 p-6 mx-4 md:mx-16 rounded-lg shadow-lg">
    <div class="flex justify-between mb-6">
      <div>
        <h1 class="font-bold text:xl md:text-3xl">Hi, {{ displayName }}</h1>
        <p class="text-gray-600">Let's make this day count</p>
      </div>
      <div>
        <Icon icon="noto:man-pouting" class="text-blue-500 bg-orange-400 w-12 h-12 md:w-20 md:h-20 rounded-full" />
        <div>
          <button
          @click="logout"
          class="px-1 py-2 bg-gray-100 text-red-500 font-semibold rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
        </div>
      </div>
    </div>
    <div class="flex shadow-md rounded-lg justify-between gap-10 p-10 md:p-10 bg-white items-center mb-6">
      <div class="flex gap-3 items-center">
        <Icon icon="noto:trophy" class="w-8 h-8 md:w-12 md:h-12" />
        <div>
          <p class="text-sm md:text-xl">Rank</p>
          <p class="font-bold text-sm md:text-xl text-blue-500">{{ rank }}</p>
        </div>
      </div>
      <div class="flex gap-3 items-center">
        <Icon icon="noto:coin" class="w-8 h-8 md:w-12 md:h-12" />
        <div>
          <p class="text-sm md:text-xl">Points</p>
          <p class="font-bold text-sm md:text-xl text-blue-500">{{ points }}</p>
        </div>
      </div>
    </div>
    <h2 class="mt-8 mb-4 font-bold text-xl md:text-2xl">Daily Quizzes</h2>
    <div class="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="day in 6"
        :key="day"
        @click="navigateToQuiz(day)"
        class="quizCard relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md transition-transform"
        :class="{
          'cursor-pointer hover:scale-105': !isQuizCompleted(day),
          'cursor-not-allowed opacity-75': isQuizCompleted(day)
        }"
      >
        <div class="text-4xl font-bold text-blue-500 mb-2">{{ day }}</div>
        <p class="font-semibold">Day {{ day }}</p>
        <p class="text-sm text-gray-600">10 questions</p>
        <p v-if="isQuizCompleted(day)" class="text-sm text-green-600 font-semibold mt-2">Completed</p>
      </div>
      <div
        @click="navigateToLeaderboard"
        class="quizCard relative flex flex-col items-center justify-center p-6 bg-green-500 text-dark rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
      >
        <Icon icon="material-symbols:social-leaderboard" class="w-12 h-12 text-blue-500" />
        <p class="font-semibold text-center">View Leaderboard</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useUserStore } from '~/store'
import { useQuizStore } from '~/quiz'
import { toRefs } from 'vue'

const config = useRuntimeConfig()
const baseUrl = config.public.apiBaseUrl;

const router = useRouter()
const userStore = useUserStore()
const quizStore = useQuizStore()
const { user } = toRefs(userStore)

watch(() => userStore.user, () => {
  userUpdateKey.value++
}, { deep: true })

const displayName = computed(() => {
  if (userStore.user && userStore.user.fullName) {
    return userStore.user.fullName.split(' ')[0]
  } else {
    return 'Guest'
  }
})

const points = computed(() => {
  if (userStore.user && userStore.user.points) {
    return userStore.user.points
  } else {
    return '0'
  }
})

const rank = computed(() => {
  if (userStore.user && userStore.user.rank) {
    return userStore.user.rank
  } else {
    return '200'
  }
})

const navigateToQuiz = (day) => {
  if (!isQuizCompleted(day)) {
    quizStore.setSelectedDay(day)
    router.push('/quizPage')
  }
}

const isQuizCompleted = (day) => {
  return userStore.isQuizCompleted(day)
}

const logout = () => {
  userStore.setUser(null);
  router.push('/login');
};

const navigateToLeaderboard = () => {
  router.push('/leaderboard')
}

onMounted(async () => {
  if (userStore.user && userStore.user.id) {
    try {
      const uid = userStore.user.id
      await userStore.fetchAndUpdateUserData(uid)
    } catch (error) {
      console.error('Failed to refresh user data:', error)
      // Optionally handle the error (e.g., show a notification to the user)
    }
  }
})

</script>

<style scoped>
.quizCard {
  transition: all 0.3s ease;
}

.quizCard:not(.cursor-not-allowed):hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>