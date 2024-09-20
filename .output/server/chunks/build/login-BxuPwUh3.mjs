import { _ as __nuxt_component_0 } from './nuxt-link-BkJVxiVx.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;
    console.log(baseUrl);
    useRouter();
    useUserStore();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900"> Sign in to your account </h2><p class="mt-2 text-center text-sm text-gray-600"> Or `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/quiz/signup",
        class: "font-medium text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` create a new account `);
          } else {
            return [
              createTextVNode(" create a new account ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div><form class="mt-8 space-y-6"><input type="hidden" name="remember" value="true"><div class="rounded-md shadow-sm -space-y-px"><div><label for="email-address" class="sr-only">Email address</label><input id="email-address" name="email" type="email" autocomplete="email" required${ssrRenderAttr("value", email.value)} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address"></div><div><label for="password" class="sr-only">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required${ssrRenderAttr("value", password.value)} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password"></div></div><div class="flex items-center justify-between"><div class="flex items-center"><input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label></div><div class="text-sm"><a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a></div></div><div><button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}><span class="absolute left-0 inset-y-0 flex items-center pl-3"><svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></span> ${ssrInterpolate(isLoading.value ? "Signing in..." : "Sign in")}</button></div></form>`);
      if (error.value) {
        _push(`<div class="mt-2 text-center text-sm text-red-600">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-BxuPwUh3.mjs.map
