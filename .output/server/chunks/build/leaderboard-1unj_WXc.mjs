import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { u as useRuntimeConfig } from './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const _sfc_main = {
  __name: "leaderboard",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    console.log(baseUrl);
    useRouter();
    const leaderboardData = ref([]);
    const activeSession = ref("week");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-cyan-500 text-white p-6" }, _attrs))}><div class="flex items-center mb-6"><button class="mr-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><h1 class="text-2xl font-bold flex-grow text-center">Leaderboard</h1></div><div class="bg-white rounded-full p-1 flex mb-8"><button class="${ssrRenderClass([
        "flex-1 py-2 rounded-full",
        activeSession.value === "all" ? "bg-cyan-500 text-white" : "text-cyan-800"
      ])}"> All time </button><button class="${ssrRenderClass([
        "flex-1 py-2 rounded-full",
        activeSession.value === "week" ? "bg-cyan-500 text-white" : "text-cyan-800"
      ])}"> This week </button><button class="${ssrRenderClass([
        "flex-1 py-2 rounded-full",
        activeSession.value === "month" ? "bg-cyan-500 text-white" : "text-cyan-800"
      ])}"> Month </button></div><div class="flex justify-between items-end mb-8"></div><div class="bg-white rounded-t-3xl p-6"><!--[-->`);
      ssrRenderList(leaderboardData.value, (player) => {
        _push(`<div class="flex items-center mb-4"><span class="w-6 text-cyan-800 font-semibold">${ssrInterpolate(player.rank)}</span><div class="w-12 h-12 rounded-full overflow-hidden mr-4"><img${ssrRenderAttr("src", `https://via.placeholder.com/48`)}${ssrRenderAttr("alt", player.fullName)} class="w-full h-full object-cover"></div><span class="flex-grow text-cyan-800 font-semibold">${ssrInterpolate(player.fullName)}</span><span class="text-cyan-500 font-semibold">${ssrInterpolate(player.currentWeekTotal)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Pages/leaderboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=leaderboard-1unj_WXc.mjs.map
