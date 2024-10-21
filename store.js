import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData
    },
    setCompletionStatus(completionStatus) {
      if (this.user) {
        this.user.quizCompletionStatus = completionStatus
      }
    },
    isQuizCompleted(day) {
      if (this.user && this.user.quizCompletionStatus) {
        const dayStatus = this.user.quizCompletionStatus.find(status => status.day === day)
        return dayStatus ? dayStatus.status === 'Y' : false
      }
      return false
    },
    async fetchAndUpdateUserData(userId) {
      try {
        const response = await fetch(`https://biblekwiz-server.onrender.com/users/get/${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const userData = await response.json()
        this.setUser({
          fullName: userData.fullName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          rank: userData.currentRank,
          points: userData.points,
          quizCompletionStatus: userData.quizCompletionStatus,
          id: userId,
        })
      } catch (error) {
        console.error('Error fetching user data:', error)
        throw error
      }
    }
  },
})