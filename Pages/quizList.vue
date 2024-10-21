<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Quiz List</h1>
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        <p class="mt-2 text-gray-600">Loading quizzes...</p>
      </div>
      <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ error }}</p>
      </div>
      <ul v-else-if="quizzes.length > 0" class="space-y-8">
        <li v-for="(quiz, index) in quizzes" :key="quiz._id || index" class="bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="bg-gray-50 px-6 py-4">
            <h2 class="text-xl font-semibold text-gray-800">
              Quiz {{ getQuizIdentifier(quiz, index) }}
            </h2>
            <p class="text-sm text-gray-600">Day: {{ quiz.day }}</p>
            <p class="text-sm font-medium" :class="quiz.status === 'Active' ? 'text-green-600' : 'text-red-600'">
              Status: {{ quiz.status }}
            </p>
          </div>
          <div class="px-6 py-4">
            <h3 class="text-lg font-semibold mb-2 text-gray-700">Questions</h3>
            <ul v-if="quiz.questionIds && quiz.questionIds.length > 0" class="space-y-4">
              <li v-for="(question, qIndex) in quiz.questionIds" :key="question._id" class="border-b border-gray-200 pb-4 last:border-b-0">
                <div class="flex justify-between items-start mb-2">
                  <span class="font-medium text-gray-700">Q{{ qIndex + 1 }}:</span>
                  <input
                    v-model="question.question"
                    class="flex-grow ml-2 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    @input="markQuestionAsEdited(question._id)"
                  />
                </div>
                <div class="grid grid-cols-2 gap-2 mt-2">
                  <div v-for="option in ['A', 'B', 'C', 'D']" :key="option" class="flex items-center">
                    <span class="text-sm font-medium text-gray-600 mr-2">{{ option }}:</span>
                    <input
                      v-model="question[`option${option}`]"
                      class="flex-grow p-1 text-sm border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      @input="markQuestionAsEdited(question._id)"
                    />
                    <input
                      type="radio"
                      :id="`${question._id}-${option}`"
                      :name="`correct-${question._id}`"
                      :value="option"
                      v-model="question.correctOption"
                      class="ml-2"
                      @change="markQuestionAsEdited(question._id)"
                    />
                    <label :for="`${question._id}-${option}`" class="ml-1 text-sm text-gray-600">Correct</label>
                  </div>
                </div>
                <div class="mt-2 flex justify-end">
                  <button
                    @click="updateQuestion(question)"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!isQuestionEdited(question._id)"
                  >
                    Update Question
                  </button>
                </div>
              </li>
            </ul>
            <p v-else class="text-gray-600 italic">No questions available for this quiz.</p>
          </div>
          <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
            <button
              @click="activateQuiz(quiz._id)"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="quiz.status === 'Active'"
            >
              Activate
            </button>
          </div>
        </li>
      </ul>
      <div v-else class="text-center py-8">
        <p class="text-xl text-gray-600">No quizzes found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from '~/auth'
  import { useRouter } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  const quizzes = ref([])
  const editedQuestions = ref(new Set())
  const loading = ref(true)
  const error = ref(null)
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl;
  
  const fetchQuizzes = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${baseUrl}/quiz/inactive`, {
        // headers: {
        //   'Authorization': `Bearer ${authStore.token}`
        // }
      })
      if (!response.ok) throw new Error('Failed to fetch quizzes')
      const result = await response.json()
      if (result.statusCode === 200 && Array.isArray(result.data)) {
        quizzes.value = result.data
      } else {
        throw new Error('Unexpected response format')
      }
    } catch (err) {
      console.error('Error fetching quizzes:', err)
      error.value = 'Failed to load quizzes. Please try again later.'
    } finally {
      loading.value = false
    }
  }
  
  const getQuizIdentifier = (quiz, index) => {
    if (quiz._id) {
      return quiz._id.slice(-4)
    }
    return `#${index + 1}`
  }
  
  const markQuestionAsEdited = (questionId) => {
    editedQuestions.value.add(questionId)
  }
  
  const isQuestionEdited = (questionId) => {
    return editedQuestions.value.has(questionId)
  }
  
  const updateQuestion = async (question) => {
  try {
    const questionId = question._id
    if (!questionId) {
      throw new Error('Question ID is missing')
    }
    
    // Create a new object with only the fields we want to update
    const updateData = {
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctOption: question.correctOption
    }
    
    const response = await fetch(`${baseUrl}/quiz/updatequestion/${questionId}`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${authStore.token}`
      // },
      body: JSON.stringify(updateData)
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to update question')
    }
    
    const result = await response.json()
    if (result.statusCode === 200) {
      editedQuestions.value.delete(questionId)
      alert('Question updated successfully')
    } else {
      throw new Error('Unexpected response format')
    }
  } catch (err) {
    console.error('Error updating question:', err)
    alert(`Failed to update question: ${err.message}`)
  }
}
  
  const activateQuiz = async (quizId) => {
    try {
      const response = await fetch(`${baseUrl}/quiz/activate/${quizId}`, {
        method: 'POST',
        // headers: {
        //   'Authorization': `Bearer ${authStore.token}`
        // }
      })
      if (!response.ok) throw new Error('Failed to activate quiz')
      const result = await response.json()
      if (result.statusCode === 200) {
        await fetchQuizzes() // Refresh quiz list to update status
        alert('Quiz activated successfully')
      } else {
        throw new Error('Unexpected response format')
      }
    } catch (err) {
      console.error('Error activating quiz:', err)
      alert('Failed to activate quiz. Please try again.')
    }
  }

  onMounted(fetchQuizzes)
  </script>