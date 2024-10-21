<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div v-if="loading" class="text-center">
        <p class="text-xl font-semibold">Loading quiz...</p>
      </div>
      <div v-else-if="error" class="text-center">
        <p class="text-xl font-semibold text-red-500">{{ error }}</p>
      </div>
      <div v-else-if="quizData" class="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div class="p-4 space-y-4">
          <div class="flex justify-between items-center">
            <button @click="closeQuiz" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div class="text-blue-500 font-semibold">{{ currentQuestion + 1 }}/{{ totalQuestions }}</div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }"></div>
          </div>
          <div class="flex justify-center items-center">
            <div class="relative w-20 h-20">
              <svg class="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  stroke-width="8"
                  fill="transparent"
                  class="text-gray-200"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  stroke-width="8"
                  fill="transparent"
                  :stroke-dasharray="226.19"
                  :stroke-dashoffset="226.19 * (1 - timeLeft / totalTime)"
                  class="text-blue-500"
                />
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                {{ Math.ceil(timeLeft) }}
              </span>
            </div>
          </div>
          <div v-if="quizCompleted" class="text-center">
            <h2 class="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p class="text-xl">Your score: {{ score }}%</p>
            <button @click="goToHome" class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors">
              Go to Home
            </button>
          </div>
          <div v-else-if="currentQuestionData">
            <div class="bg-blue-100 rounded-lg p-4">
              <h2 class="text-xl font-semibold text-center">{{ currentQuestionData.question }}</h2>
            </div>
            <div class="space-y-2 mt-4">
              <button
                v-for="option in ['A', 'B', 'C', 'D']"
                :key="option"
                @click="selectAnswer(option)"
                :class="[
                  'w-full p-4 rounded-lg text-left transition-colors',
                  {
                    'bg-gray-100 hover:bg-gray-200': selectedAnswer === null,
                    'bg-blue-500 text-white': selectedAnswer === option && !showResult,
                    'bg-green-500 text-white': showResult && option === currentQuestionData.correctOption,
                    'bg-red-500 text-white': showResult && selectedAnswer === option && option !== currentQuestionData.correctOption
                  }
                ]"
              >
                {{ currentQuestionData[`option${option}`] }}
              </button>
            </div>
          </div>
        </div>
        <button
          v-if="!quizCompleted && currentQuestionData"
          @click="nextQuestion"
          :disabled="!showResult"
          class="w-full p-4 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {{ currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next' }}
        </button>
      </div>
  
      <div v-if="quizCompleted" class="text-center">
      <!-- <h2 class="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p class="text-xl">Your score: {{ score }}%</p> -->
      <!-- <button @click="goToHome" class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors">
        Go to Home
      </button> -->
    </div>
    </div>
  </template>
  
  <script setup>
     definePageMeta({
    layout: false
  })
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useQuizStore } from '~/quiz'
  import { useUserStore } from '~/store.js'
  const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl;
    console.log(baseUrl)
  const quizStore = useQuizStore()
  const userStore = useUserStore()
  const { user } = toRefs(userStore)
  
  const router = useRouter()
  const route = useRoute()
  
  const quizData = ref(null)
  const currentQuestion = ref(0)
  const selectedAnswer = ref(null)
  const showResult = ref(false)
  const quizCompleted = ref(false)
  const score = ref(0)
  const loading = ref(true)
  const error = ref(null)
  
  const timeLeft = ref(30)
  const totalTime = 30
  const timer = ref(null)
  
  // You should replace this with the actual user ID
  // const userId = "user123"
  
  const userId = computed(() => {
      if (userStore.user && userStore.user.id) {
        return userStore.user.id
      } else {
        return 'user123'
      }
    })
  
  const totalQuestions = computed(() => quizData.value ? quizData.value.questionIds.length : 0)
  
  const currentQuestionData = computed(() => {
    if (!quizData.value || !quizData.value.questionIds) return null
    return quizData.value.questionIds[currentQuestion.value]
  })
  
  onMounted(async () => {
    await fetchQuizData()
    if (quizData.value) {
      startTimer()
    }
  })
  
  onUnmounted(() => {
    stopTimer()
  })
  
  async function fetchQuizData() {
    const day = quizStore.selectedDay
    if (!day) {
      error.value = 'No day specified for the quiz.'
      loading.value = false
      return
    }
  
    try {
      const response = await fetch(`${baseUrl}/quiz/active/byday?day=${day}`)
      const result = await response.json()
      if (Array.isArray(result) && result.length > 0) {
        quizData.value = result[0]
      } else {
        throw new Error('Failed to fetch quiz data')
      }
    } catch (err) {
      console.error('Error fetching quiz data:', err)
      error.value = 'Failed to load quiz. Please try again later.'
      router.push('/home')
    } finally {
      loading.value = false
    }
  }
  
  function selectAnswer(option) {
    if (!showResult.value && currentQuestionData.value) {
      selectedAnswer.value = option
      showResult.value = true
      stopTimer()
      if (option === currentQuestionData.value.correctOption) {
        score.value += 1
      }
    }
  }
  
  
  function nextQuestion() {
    if (currentQuestion.value < totalQuestions.value - 1) {
      currentQuestion.value++
      resetQuestion()
    } else {
      finishQuiz()
    }
  }
  
  function resetQuestion() {
    selectedAnswer.value = null
    showResult.value = false
    timeLeft.value = totalTime
    startTimer()
  }
  
  async function finishQuiz() {
    quizCompleted.value = true
    const finalScore = Math.round((score.value / totalQuestions.value) * 100)
    score.value = finalScore
  
    // Send quiz metrics to the API
    const quizMetrics = {
    quizId: quizData.value._id,
    score: finalScore
      };
    try {
      const response = await fetch(`${baseUrl}/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         ...quizMetrics,
         userId: userId.value
      }),
        
      })
  
      if (!response.ok) {
        throw new Error('Failed to submit quiz results')
      }
  
      console.log('Quiz results submitted successfully')
    } catch (err) {
      console.error('Error submitting quiz results:', err)
      error.value = 'Failed to submit quiz results. Please try again later.'
    }
  }
  
  function startTimer() {
    timer.value = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value -= 0.1
      } else {
        stopTimer()
        showResult.value = true
      }
    }, 100)
  }
  
  function stopTimer() {
    clearInterval(timer.value)
  }
  
  function closeQuiz() {
    // Handle closing the quiz (e.g., emit an event to parent component)
    console.log('Closing quiz')
  }
  
  async function goToHome() {
  console.log('goToHome function called')
  try {
    if (!userStore.user || !userStore.user.id) {
      console.error('User or user ID is not available')
      router.push('/home')
      return
    }
    console.log('Attempting to fetch user data for ID:', userStore.user.id)
    await userStore.fetchAndUpdateUserData(userStore.user.id)
    console.log('User data successfully updated')
    router.push('/home')
  } catch (error) {
    console.error('Error updating user data:', error)
    router.push('/home')
  }
}
  </script>