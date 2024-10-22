<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div v-if="loading" class="text-center">
        <p class="text-xl font-semibold">Loading quiz...</p>
      </div>
      <div v-else-if="error" class="text-center">
        <p class="text-xl font-semibold text-red-500">{{ error }}</p>
      </div>
      <div v-else-if="quizData" class="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center">
            <button @click="closeQuiz" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div class="text-blue-500 font-semibold text-lg">Question {{ currentQuestion + 1 }} of {{ totalQuestions }}</div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div class="bg-blue-500 h-3 rounded-full" :style="{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }"></div>
          </div>
          <div class="flex justify-center items-center">
            <div class="relative w-24 h-24">
              <svg class="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  stroke-width="8"
                  fill="transparent"
                  class="text-gray-200"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  stroke-width="8"
                  fill="transparent"
                  :stroke-dasharray="276.46"
                  :stroke-dashoffset="276.46 * (1 - timeLeft / totalTime)"
                  class="text-blue-500"
                />
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                {{ Math.ceil(timeLeft) }}
              </span>
            </div>
          </div>
          <div v-if="currentQuestionData" class="space-y-6">
            <div class="bg-blue-100 rounded-lg p-6">
              <h2 class="text-2xl font-semibold text-center">{{ currentQuestionData.question }}</h2>
            </div>
            <!-- Start Timer Button -->
            <div v-if="!timerStarted && !showResult" class="flex justify-center">
              <button
                @click="startTimer"
                class="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Start Timer
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4" :class="{ 'opacity-50': !timerStarted && !showResult }">
              <button
                v-for="option in ['A', 'B', 'C', 'D']"
                :key="option"
                @click="selectAnswer(option)"
                :disabled="!timerStarted && !showResult"
                :class="[
                  'p-4 rounded-lg text-left transition-colors text-lg font-bold',
                  {
                    'bg-gray-100 hover:bg-gray-200': selectedAnswer === null && !failed,
                    'bg-blue-500 text-white': selectedAnswer === option && !showResult && !failed,
                    'bg-green-500 text-white': showResult && option === currentQuestionData.correctOption,
                    'bg-red-500 text-white': (showResult && selectedAnswer === option && option !== currentQuestionData.correctOption) || (failed && option === currentQuestionData.correctOption)
                  }
                ]"
              >
                {{ currentQuestionData[`option${option}`] }}
              </button>
            </div>
            <div v-if="failed" class="mt-4 text-center text-red-500 font-semibold text-xl">
              Time's up! You didn't select an answer in time.
            </div>
          </div>
        </div>
        <button
          v-if="currentQuestionData"
          @click="nextQuestion"
          :disabled="!showResult && !failed"
          class="w-full p-4 bg-blue-500 text-white text-xl font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next Question
        </button>
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
  const baseUrl = ref('https://biblekwiz-server.onrender.com')
  
  try {
    if (config.public && config.public.apiBaseUrl) {
      baseUrl.value = config.public.apiBaseUrl
    }
  } catch (error) {
    console.error('Error accessing config:', error)
  }
  
  const quizStore = useQuizStore()
  const userStore = useUserStore()
  const { user } = toRefs(userStore)
  
  const router = useRouter()
  const route = useRoute()
  
  const quizData = ref(null)
  const currentQuestion = ref(0)
  const selectedAnswer = ref(null)
  const showResult = ref(false)
  const loading = ref(true)
  const error = ref(null)
  
  const timeLeft = ref(15)
  const totalTime = 15
  const timer = ref(null)
  const failed = ref(false)
  // New ref for tracking if timer has been started
  const timerStarted = ref(false)
  
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
  })
  
  onUnmounted(() => {
    stopTimer()
  })
  
  async function fetchQuizData() {
    const quizName = route.params.quizName || 'TheCodeQuiz'
    if (!quizName) {
      error.value = 'No quiz specified.'
      loading.value = false
      return
    }
  
    try {
      const response = await fetch(`${baseUrl.value}/quiz/active/byday?day=80`)
      const result = await response.json()
      if (Array.isArray(result) && result.length > 0) {
        quizData.value = result[0]
        console.log('Quiz data loaded:', quizData.value)
      } else {
        throw new Error('No quiz data found')
      }
    } catch (err) {
      console.error('Error fetching quiz data:', err)
      error.value = 'Failed to load quiz. Please try again later.'
    } finally {
      loading.value = false
    }
  }
  
  function selectAnswer(option) {
    if (!showResult.value && currentQuestionData.value && !failed.value && timerStarted.value) {
      selectedAnswer.value = option
      showResult.value = true
      stopTimer()
    }
  }
  
  function nextQuestion() {
    if (currentQuestion.value < totalQuestions.value - 1) {
      currentQuestion.value++
    } else {
      currentQuestion.value = 0
    }
    resetQuestion()
  }
  
  function resetQuestion() {
    selectedAnswer.value = null
    showResult.value = false
    failed.value = false
    timeLeft.value = totalTime
    timerStarted.value = false // Reset timer started state
  }
  
  function startTimer() {
    if (!timerStarted.value) {
      timerStarted.value = true
      timer.value = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value -= 0.1
        } else {
          stopTimer()
          if (selectedAnswer.value === null) {
            handleFailure()
          } else {
            showResult.value = true
          }
        }
      }, 100)
    }
  }
  
  function stopTimer() {
    clearInterval(timer.value)
  }
  
  function handleFailure() {
    failed.value = true
    showResult.value = true
    console.log('User failed to answer in time')
  }
  
  function closeQuiz() {
    console.log('Closing quiz')
    router.push('/home')
  }
  </script>