<!-- pages/quizIndex.vue -->
<template>
    <div class="max-w-4xl mx-auto p-6">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-4">The Code Quiz</h1>
        <p class="text-lg text-gray-600">Let's see your bible rockstar skills!!</p>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink 
          v-for="section in quizSections" 
          :key="section.path"
          :to="section.path"
          class="block"
        >
          <div class="rounded-lg border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow cursor-pointer p-6">
            <div class="flex items-center justify-between space-y-0 pb-2">
              <h3 class="text-xl font-semibold">{{ section.title }}</h3>
              <Icon 
                :icon="section.icon" 
                class="h-6 w-6 text-gray-500"
              />
            </div>
            <div class="pt-4">
              <p class="text-base text-gray-600">{{ section.description }}</p>
              <div class="flex items-center mt-4 text-blue-600">
                <span>Start Quiz</span>
                <Icon 
                  icon="mdi:chevron-right" 
                  class="h-4 w-4 ml-2"
                />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue'
  
  const quizSections = [
    {
      title: 'Round 1 Quiz',
      description: 'Test your General Bible knowledge',
      icon: 'mdi:code-braces',
      path: '/TheCodeQuizManual'
    },
    {
      title: 'Round 2 Quiz',
      description: 'Kahoot quiz About King Josiah',
      icon: 'mdi:brain',
      path: 'https://www.goal.com/en-ng' //replace with kahoot link from Bro Lumi
    },
    {
      title: 'Round 3 Phase 1 Quiz',
      description: 'Kahoot quiz about Joseph',
      icon: 'mdi:timer',
      path: '/KahootJoseph'
    },
    {
      title: '60s Challenge Contestant 1',
      description: "Let's see how many questions you can answer correctly in 60s",
      icon: 'mdi:trophy',
      path: '/SixtySeconds1'
    },
    {
      title: '60s Challenge Contestant 2',
      description: "Let's see how many questions you can answer correctly in 60s",
      icon: 'mdi:trophy',
      path: '/SixtySeconds2'
    },
    {
      title: '60s Challenge Contestant 3',
      description: "Let's see how many questions you can answer correctly in 60s",
      icon: 'mdi:trophy',
      path: '/SixtySeconds3'
    },
    {
      title: 'Quiz Rules',
      description: "Rules of engagement for quiz session",
      icon: 'mdi:trophy',
      path: '/Rules' //replace with link to rules
    },
  ]
  </script>
  
  <style scoped>
  .bg-card {
    background-color: white;
  }
  
  .text-card-foreground {
    color: #1f2937;
  }
  </style>