<template>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            <h1 class="text-2xl font-semibold mb-6">Create a Quiz Question</h1>
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label for="question" class="block text-sm font-medium text-gray-700">Question</label>
                <input
                  id="question"
                  v-model="question"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div v-for="(option, index) in options" :key="index" class="flex items-center space-x-2">
                <input
                  :id="'option' + index"
                  v-model="options[index]"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  :placeholder="'Option ' + (index + 1)"
                />
                <input
                  :id="'correct' + index"
                  v-model="correctAnswer"
                  type="radio"
                  :value="index"
                  class="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                />
                <label :for="'correct' + index" class="text-sm text-gray-700">Correct</label>
              </div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Create Question
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
      definePageMeta({
  layout: false
})
  import { ref } from 'vue'
  
  const question = ref('')
  const options = ref(['', '', '', ''])
  const correctAnswer = ref(null)
  
  const handleSubmit = () => {
    // Handle form submission (create quiz question)
    console.log('New Question:', {
      question: question.value,
      options: options.value,
      correctAnswer: correctAnswer.value
    })
  }
  </script>