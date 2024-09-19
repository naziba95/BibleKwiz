<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500" @click.prevent="goToLogin">
              sign in to your existing account
            </a>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="name" class="sr-only">Full name</label>
              <input id="name" name="name" type="text" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full name"
                v-model="name"
              />
            </div>
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autocomplete="email" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                v-model="email"
              />
            </div>
            <div>
              <label for="phone-number" class="sr-only">Phone number</label>
              <input id="phone-number" name="phoneNumber" type="tel" autocomplete="tel" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Phone number"
                v-model="phoneNumber"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" type="password" autocomplete="new-password" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div>
              <label for="confirmPassword" class="sr-only">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                v-model="confirmPassword"
              />
            </div>
          </div>
  
          <div>
            <button type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :disabled="isLoading"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              {{ isLoading ? 'Signing up...' : 'Sign up' }}
            </button>
          </div>
        </form>
        <div v-if="error" class="mt-2 text-center text-sm text-red-600">
          {{ error }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
      definePageMeta({
  layout: false
})
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore  } from '~/store.js'
  const userStore = useUserStore()
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl;
  console.log(baseUrl)

  const router = useRouter()
  
  const name = ref('')
  const email = ref('')
  const phoneNumber = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const isLoading = ref(false)
  const error = ref('')
  
  const handleSignup = async () => {
  error.value = ''
  isLoading.value = true

  try {
    // Perform basic validation
    if (!name.value || !email.value || !phoneNumber.value || !password.value || !confirmPassword.value) {
      throw new Error('Please fill in all fields')
    }

    if (password.value.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }

    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match')
    }

    // Make the API call to create the user
    const response = await $fetch(`${baseUrl}/users/signup`, {
      method: 'POST',
      body: {
        fullName: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      },
    })
    console.log(response);
    if (!response) {
      throw new Error('An error occurred, please try again in few minutes')
    }

    if (response.statusCode !== 201) {
      throw new Error(response.message)
    }

    console.log('User signed up:', { name: name.value, email: email.value })

    // Store the user data in the Pinia store
    userStore.setUser(response.data)

    // Redirect to login page after successful signup
    console.log(response.data)
    router.push('/login')
  } catch (err) {
    error.value = err.message || 'An error occurred during signup'
  } finally {
    isLoading.value = false
  }
}
  
  const goToLogin = () => {
    router.push('/login')
  }
  </script>