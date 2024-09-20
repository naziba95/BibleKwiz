import { e as defineStore } from './server.mjs';

const useQuizStore = defineStore("quiz", {
  state: () => ({
    selectedDay: null
  }),
  actions: {
    setSelectedDay(day) {
      this.selectedDay = day;
    }
  }
});

export { useQuizStore as u };
//# sourceMappingURL=quiz-2fyYxOMD.mjs.map
