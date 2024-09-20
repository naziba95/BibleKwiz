import { toRefs, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { u as useUserStore } from './store-czdj_eLx.mjs';
import { u as useQuizStore } from './quiz-2fyYxOMD.mjs';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
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
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    config.public.apiBaseUrl;
    useRouter();
    const userStore = useUserStore();
    useQuizStore();
    toRefs(userStore);
    const displayName = computed(() => {
      if (userStore.user && userStore.user.fullName) {
        return userStore.user.fullName.split(" ")[0];
      } else {
        return "Guest";
      }
    });
    const points = computed(() => {
      if (userStore.user && userStore.user.points) {
        return userStore.user.points;
      } else {
        return "0";
      }
    });
    const rank = computed(() => {
      if (userStore.user && userStore.user.rank) {
        return userStore.user.rank;
      } else {
        return "200";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-100 my-10 p-6 mx-4 md:mx-16 rounded-lg shadow-lg" }, _attrs))} data-v-2c222da9><div class="flex justify-between mb-6" data-v-2c222da9><div data-v-2c222da9><h1 class="font-bold text-3xl" data-v-2c222da9>Hi, ${ssrInterpolate(displayName.value)}</h1><p class="text-gray-600" data-v-2c222da9>Let&#39;s make this day count</p></div><div data-v-2c222da9>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "noto:man-pouting",
        class: "text-blue-500 bg-orange-400 w-20 h-20 rounded-full"
      }, null, _parent));
      _push(`<button class="px-4 py-2 bg-gray-100 text-red-500 font-semibold rounded hover:bg-red-600 transition-colors" data-v-2c222da9> Logout </button></div></div><div class="flex shadow-md rounded-lg justify-between gap-10 p-4 bg-white items-center mb-6" data-v-2c222da9><div class="flex gap-4 items-center" data-v-2c222da9>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "noto:trophy",
        class: "w-12 h-12"
      }, null, _parent));
      _push(`<div data-v-2c222da9><p class="text-base" data-v-2c222da9>Ranking</p><p class="font-bold text-xl text-blue-500" data-v-2c222da9>${ssrInterpolate(rank.value)}</p></div></div><div class="flex gap-4 items-center" data-v-2c222da9>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "noto:coin",
        class: "w-12 h-12"
      }, null, _parent));
      _push(`<div data-v-2c222da9><p data-v-2c222da9>Points</p><p class="font-bold text-xl text-blue-500" data-v-2c222da9>${ssrInterpolate(points.value)}</p></div></div></div><h2 class="mt-8 mb-4 font-bold text-2xl" data-v-2c222da9>Daily Quizzes</h2><div class="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" data-v-2c222da9><!--[-->`);
      ssrRenderList(6, (day) => {
        _push(`<div class="quizCard relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105" data-v-2c222da9><div class="text-4xl font-bold text-blue-500 mb-2" data-v-2c222da9>${ssrInterpolate(day)}</div><p class="font-semibold" data-v-2c222da9>Day ${ssrInterpolate(day)}</p><p class="text-sm text-gray-600" data-v-2c222da9>10 questions</p></div>`);
      });
      _push(`<!--]--><div class="quizCard relative flex flex-col items-center justify-center p-6 bg-green-500 text-dark rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105" data-v-2c222da9>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "material-symbols:social-leaderboard",
        class: "w-12 h-12 text-blue-500"
      }, null, _parent));
      _push(`<p class="font-semibold" data-v-2c222da9>View Leaderboard</p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c222da9"]]);

export { home as default };
//# sourceMappingURL=home-CWq9zwxd.mjs.map
