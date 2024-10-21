<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-semibold mb-6">Update Quiz</h1>

          <!-- Feedback Message -->
          <div v-if="feedbackMessage" :class="feedbackClass" class="p-4 mb-4 text-sm rounded-lg" role="alert">
            {{ feedbackMessage }}
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="day" class="block text-sm font-medium text-gray-700">Day</label>
              <input
                id="day"
                v-model="day"
                type="number"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            <div v-for="(q, qIndex) in questions" :key="qIndex" class="border-t pt-4">
              <h2 class="text-lg font-semibold mb-2">Question {{ qIndex + 1 }}</h2>
              <div>
                <label :for="'question' + qIndex" class="block text-sm font-medium text-gray-700">Question</label>
                <input
                  :id="'question' + qIndex"
                  v-model="q.question"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div v-for="option in ['A', 'B', 'C', 'D']" :key="option" class="mt-2">
                <label :for="'option' + qIndex + option" class="block text-sm font-medium text-gray-700">Option {{ option }}</label>
                <div class="flex items-center space-x-2">
                  <input
                    :id="'option' + qIndex + option"
                    v-model="q['option' + option]"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <input
                    :id="'correct' + qIndex + option"
                    v-model="q.correctOption"
                    type="radio"
                    :value="option"
                    class="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                  />
                  <label :for="'correct' + qIndex + option" class="text-sm text-gray-700">Correct</label>
                </div>
              </div>
              <button
                type="button"
                @click="removeQuestionForm(qIndex)"
                class="mt-2 text-red-600 hover:text-red-800"
              >
                Remove Question
              </button>
            </div>

            <button
              type="button"
              @click="addQuestionForm"
              class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Question
            </button>

            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Update Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/auth'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const baseUrl = config.public.apiBaseUrl

const authStore = useAuthStore()
const router = useRouter()

const day = ref(1)
const questions = ref([
  {
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: ''
  }
])

const feedbackMessage = ref('')
const feedbackClass = ref('')

const addQuestionForm = () => {
  questions.value.push({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: ''
  })
}

const removeQuestionForm = (index) => {
  if (questions.value.length > 1) {
    questions.value.splice(index, 1)
  }
}

const fetchQuizData = async () => {
  try {
    const response = await fetch(`${baseUrl}/quiz/day/${day.value}`)

    if (!response.ok) {
      throw new Error('Quiz not found')
    }

    const quizData = await response.json()
    questions.value = quizData.questions || []
  } catch (error) {
    console.error('Error fetching quiz data:', error)
    feedbackMessage.value = 'Error fetching quiz data. Please try again.'
    feedbackClass.value = 'bg-red-100 text-red-700'
  }
}

onMounted(fetchQuizData)

const handleSubmit = async () => {
  try {
    const response = await fetch(`${baseUrl}/quiz/add-questions/${day.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}` // Add authentication token
      },
      body: JSON.stringify({
        questions: questions.value
      })
    })

    if (!response.ok) {
      throw new Error('Failed to update quiz')
    }

    // Clear the form fields upon successful submission
    day.value = 1
    questions.value = [
      {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctOption: ''
      }
    ]

    feedbackMessage.value = 'Quiz updated successfully!'
    feedbackClass.value = 'bg-green-100 text-green-700'
    setTimeout(() => {
      feedbackMessage.value = ''
      router.push('/AddQuizQuestions')
    }, 3000)
  } catch (error) {
    console.error('Error updating quiz:', error)
    feedbackMessage.value = 'Error updating quiz. Please try again.'
    feedbackClass.value = 'bg-red-100 text-red-700'
  }
}
</script>