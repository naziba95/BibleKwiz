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
            <div v-if="quizStarted" class="text-blue-500 font-semibold text-lg">
              Question {{ currentQuestion + 1 }}
            </div>
            <div v-else class="text-blue-500 font-semibold text-lg">
              Quiz Ready
            </div>
          </div>
          
          <!-- Initial Start Screen -->
          <div v-if="!quizStarted" class="text-center space-y-6">
            <h2 class="text-2xl font-bold">Ready to Start?</h2>
            <p class="text-gray-600">You'll have {{ totalTime }} seconds to complete the quiz</p>
            <button 
              @click="startQuiz" 
              class="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold text-lg"
            >
              <p class="p-3">Start Quiz</p>
            </button>
          </div>
  
          <template v-else>
            <!-- Timer -->
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
  
            <!-- Question -->
            <div v-if="currentQuestionData" class="space-y-6">
              <div class="bg-blue-100 rounded-lg p-6">
                <h2 class="text-2xl font-semibold text-center">{{ currentQuestionData.question }}</h2>
              </div>
              
              <!-- Next question button -->
              <div class="flex justify-center items-center space-x-4">
                <button 
                  @click="nextQuestion" 
                  class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
                >
                  Next Question
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
      
      <!-- Quiz ended state -->
      <div v-if="quizEnded" class="mt-6 text-center">
        <h2 class="text-2xl font-bold">Quiz Ended!</h2>
        <button @click="restartQuiz" class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Restart Quiz
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
  
  // Safely get baseUrl from config
  try {
    if (config.public && config.public.apiBaseUrl) {
      baseUrl.value = config.public.apiBaseUrl
    }
  } catch (error) {
    console.error('Error accessing config:', error)
  }
  
  const quizStore = useQuizStore()
  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()
  
  const quizData = ref(null)
  const currentQuestion = ref(0)
  const loading = ref(true)
  const error = ref(null)
  const timeLeft = ref(60)
  const totalTime = 60
  const timer = ref(null)
  const quizEnded = ref(false)
  const quizStarted = ref(false)
  
  const userId = computed(() => {
    return userStore.user?.id || 'user123'
  })
  
  const totalQuestions = computed(() => quizData.value?.questionIds.length || 0)
  
  const currentQuestionData = computed(() => {
    if (!quizData.value?.questionIds || !quizStarted.value) return null
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
      const response = await fetch(`${baseUrl.value}/quiz/active/byday?day=81`)
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
  
  function startQuiz() {
    quizStarted.value = true
    timeLeft.value = totalTime
    startTimer()
  }
  
  function nextQuestion() {
    if (currentQuestion.value < totalQuestions.value - 1) {
      currentQuestion.value++
    } else {
      endQuiz()
    }
  }
  
  function startTimer() {
    timer.value = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value -= 0.1
      } else {
        endQuiz()
      }
    }, 100)
  }
  
  function stopTimer() {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
  
  function endQuiz() {
    stopTimer()
    quizEnded.value = true
    quizStarted.value = false
    console.log('Quiz ended')
  }
  
  function closeQuiz() {
    console.log('Closing quiz')
    router.push('/home')
  }
  
  function restartQuiz() {
    currentQuestion.value = 0
    timeLeft.value = totalTime
    quizEnded.value = false
    quizStarted.value = false
  }
  </script>