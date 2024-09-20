import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { u as useQuizStore } from './quiz-2fyYxOMD.mjs';
import { u as useUserStore } from './store-czdj_eLx.mjs';
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

const totalTime = 30;
const _sfc_main = {
  __name: "quizPage",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    console.log(baseUrl);
    useQuizStore();
    const userStore = useUserStore();
    useRouter();
    useRoute();
    const quizData = ref(null);
    const currentQuestion = ref(0);
    const selectedAnswer = ref(null);
    const showResult = ref(false);
    const quizCompleted = ref(false);
    const score = ref(0);
    const loading = ref(true);
    const error = ref(null);
    const timeLeft = ref(30);
    ref(null);
    computed(() => {
      if (userStore.user && userStore.user.id) {
        return userStore.user.id;
      } else {
        return "user123";
      }
    });
    const totalQuestions = computed(() => quizData.value ? quizData.value.questionIds.length : 0);
    const currentQuestionData = computed(() => {
      if (!quizData.value || !quizData.value.questionIds)
        return null;
      return quizData.value.questionIds[currentQuestion.value];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4" }, _attrs))}>`);
      if (loading.value) {
        _push(`<div class="text-center"><p class="text-xl font-semibold">Loading quiz...</p></div>`);
      } else if (error.value) {
        _push(`<div class="text-center"><p class="text-xl font-semibold text-red-500">${ssrInterpolate(error.value)}</p></div>`);
      } else if (quizData.value) {
        _push(`<div class="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"><div class="p-4 space-y-4"><div class="flex justify-between items-center"><button class="text-gray-500 hover:text-gray-700"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="text-blue-500 font-semibold">${ssrInterpolate(currentQuestion.value + 1)}/${ssrInterpolate(totalQuestions.value)}</div></div><div class="w-full bg-gray-200 rounded-full h-2.5"><div class="bg-blue-500 h-2.5 rounded-full" style="${ssrRenderStyle({ width: `${(currentQuestion.value + 1) / totalQuestions.value * 100}%` })}"></div></div><div class="flex justify-center items-center"><div class="relative w-20 h-20"><svg class="w-20 h-20 transform -rotate-90"><circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="8" fill="transparent" class="text-gray-200"></circle><circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="8" fill="transparent"${ssrRenderAttr("stroke-dasharray", 226.19)}${ssrRenderAttr("stroke-dashoffset", 226.19 * (1 - timeLeft.value / totalTime))} class="text-blue-500"></circle></svg><span class="absolute inset-0 flex items-center justify-center text-2xl font-bold">${ssrInterpolate(Math.ceil(timeLeft.value))}</span></div></div>`);
        if (quizCompleted.value) {
          _push(`<div class="text-center"><h2 class="text-2xl font-bold mb-4">Quiz Completed!</h2><p class="text-xl">Your score: ${ssrInterpolate(score.value)}%</p><button class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"> Go to Home </button></div>`);
        } else if (currentQuestionData.value) {
          _push(`<div><div class="bg-blue-100 rounded-lg p-4"><h2 class="text-xl font-semibold text-center">${ssrInterpolate(currentQuestionData.value.question)}</h2></div><div class="space-y-2 mt-4"><!--[-->`);
          ssrRenderList(["A", "B", "C", "D"], (option) => {
            _push(`<button class="${ssrRenderClass([
              "w-full p-4 rounded-lg text-left transition-colors",
              {
                "bg-gray-100 hover:bg-gray-200": selectedAnswer.value === null,
                "bg-blue-500 text-white": selectedAnswer.value === option && !showResult.value,
                "bg-green-500 text-white": showResult.value && option === currentQuestionData.value.correctOption,
                "bg-red-500 text-white": showResult.value && selectedAnswer.value === option && option !== currentQuestionData.value.correctOption
              }
            ])}">${ssrInterpolate(currentQuestionData.value[`option${option}`])}</button>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!quizCompleted.value && currentQuestionData.value) {
          _push(`<button${ssrIncludeBooleanAttr(!showResult.value) ? " disabled" : ""} class="w-full p-4 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">${ssrInterpolate(currentQuestion.value === totalQuestions.value - 1 ? "Finish" : "Next")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (quizCompleted.value) {
        _push(`<div class="text-center"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Pages/quizPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=quizPage-CIpfgsma.mjs.map
