import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    selectedDay: null,
  }),
  actions: {
    setSelectedDay(day) {
      this.selectedDay = day
    },
  },
})
