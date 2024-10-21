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
            <div class="text-blue-500 font-semibold text-lg">Question {{ currentQuestion + 1 }} | Score: {{ score }}</div>
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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
              <button
                v-for="option in ['A', 'B', 'C', 'D']"
                :key="option"
                @click="selectAnswer(option)"
                :class="[
                  'p-4 rounded-lg text-left transition-colors text-lg',
                  {
                    'bg-gray-100 hover:bg-gray-200': !showResult,
                    'bg-green-500 text-white': showResult && option === currentQuestionData.correctOption,
                    'bg-red-500 text-white': showResult && selectedAnswer === option && option !== currentQuestionData.correctOption
                  }
                ]"
                :disabled="showResult"
              >
                {{ currentQuestionData[`option${option}`] }}
              </button>
            </div>
            <div v-if="showResult" class="text-center">
              <p v-if="isCorrect" class="text-green-500 font-bold text-xl">Correct!</p>
              <p v-else class="text-red-500 font-bold text-xl">
                Incorrect. The correct answer is: {{ currentQuestionData[`option${currentQuestionData.correctOption}`] }}
              </p>
              <button @click="nextQuestion" class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Next Question
              </button>
            </div>
            <div v-else class="text-center">
              <button @click="skipQuestion" class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Skip Question
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="quizEnded" class="mt-6 text-center">
        <h2 class="text-2xl font-bold">Quiz Ended!</h2>
        <p class="text-xl font-bold">Your final score: {{ score }} points</p>
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
  const baseUrl = ref('https://biblekwiz-server.onrender.com') // Default URL
  
  // Safely get baseUrl from config
  try {
    if (config.public && config.public.apiBaseUrl) {
      baseUrl.value = config.public.apiBaseUrl
    }
  } catch (error) {
    console.error('Error accessing config:', error)
  }
  
  console.log('Base URL:', baseUrl.value)
  
  const quizStore = useQuizStore()
  const userStore = useUserStore()
  const { user } = toRefs(userStore)
  
  const router = useRouter()
  const route = useRoute()
  
  const quizData = ref(null)
  const currentQuestion = ref(0)
  const loading = ref(true)
  const error = ref(null)
  
  const timeLeft = ref(60)
  const totalTime = 60
  const timer = ref(null)
  const score = ref(0)
  const quizEnded = ref(false)
  const showResult = ref(false)
  const selectedAnswer = ref(null)
  const isCorrect = ref(false)
  const isPaused = ref(false)
  
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
    const quizName = route.params.quizName || 'TheCodeQuiz'
    if (!quizName) {
      error.value = 'No quiz specified.'
      loading.value = false
      return
    }
  
    try {
      const response = await fetch(`${baseUrl.value}/quiz/active/byday?day=8`)
      const result = await response.json()
      if (Array.isArray(result) && result.length > 0) {
        quizData.value = result[0] // Take the first quiz from the array
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
  if (currentQuestionData.value && !quizEnded.value && !showResult.value) {
    selectedAnswer.value = option
    isCorrect.value = option === currentQuestionData.value.correctOption
    if (isCorrect.value) {
      score.value += 50
    }
    showResult.value = true
    pauseTimer() // Pause the timer when an answer is selected
  }
}

function nextQuestion() {
  if (currentQuestion.value < totalQuestions.value - 1) {
    currentQuestion.value++
    resetQuestion()
    resumeTimer() // Resume the timer when moving to the next question
  } else {
    endQuiz()
  }
}

function skipQuestion() {
  if (currentQuestion.value < totalQuestions.value - 1) {
    currentQuestion.value++
    resetQuestion()
    // We don't pause or resume the timer here, it keeps running
  } else {
    endQuiz()
  }
}

function resetQuestion() {
  showResult.value = false
  selectedAnswer.value = null
  isCorrect.value = false
}

function startTimer() {
  timer.value = setInterval(() => {
    if (!isPaused.value && timeLeft.value > 0) {
      timeLeft.value -= 0.1
    } else if (timeLeft.value <= 0) {
      endQuiz()
    }
  }, 100)
}

function stopTimer() {
  clearInterval(timer.value)
}

function pauseTimer() {
  isPaused.value = true
}

function resumeTimer() {
  isPaused.value = false
}

function endQuiz() {
  stopTimer()
  quizEnded.value = true
  console.log('Quiz ended. Final score:', score.value)
}

function closeQuiz() {
  console.log('Closing quiz')
  router.push('/home')
}

function restartQuiz() {
  currentQuestion.value = 0
  score.value = 0
  timeLeft.value = totalTime
  quizEnded.value = false
  isPaused.value = false
  resetQuestion()
  startTimer()
}

  </script>