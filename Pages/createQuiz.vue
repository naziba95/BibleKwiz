<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-semibold mb-6">Create a Quiz</h1>
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
              <div v-for="(option) in ['A', 'B', 'C', 'D']" :key="option" class="mt-2">
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
                @click="removeQuestion(qIndex)"
                class="mt-2 text-red-600 hover:underline"
              >
                Remove Question
              </button>
            </div>
            <button
              type="button"
              @click="addQuestion"
              class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Question
            </button>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Create Quiz
            </button>
          </form>
          <div v-if="message" class="mt-4 p-2 rounded-md text-center" :class="{'bg-green-200 text-green-800': success, 'bg-red-200 text-red-800': !success}">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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

const message = ref('')
const success = ref(false)

const addQuestion = () => {
  questions.value.push({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: ''
  })
}

const removeQuestion = (index) => {
  questions.value.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    const response = await fetch(`${baseUrl}/quiz/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${authStore.token}` // Uncomment this line if using authentication
      },
      body: JSON.stringify({
        day: day.value,
        questions: questions.value
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create quiz')
    }

    // Clear input fields
    day.value = 1
    questions.value = [{
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: ''
    }]

    // Show success message
    message.value = 'Quiz created successfully!'
    success.value = true

    router.push('/quizList')
  } catch (error) {
    console.error('Error creating quiz:', error)
    message.value = 'Error creating quiz: ' + error.message
    success.value = false
  }
}
</script>
