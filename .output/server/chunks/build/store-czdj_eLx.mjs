import { e as defineStore } from './server.mjs';

const useUserStore = defineStore("user", {
  state: () => ({
    user: null
  }),
  actions: {
    setUser(user) {
      this.user = user;
    }
  }
});

export { useUserStore as u };
//# sourceMappingURL=store-czdj_eLx.mjs.map
