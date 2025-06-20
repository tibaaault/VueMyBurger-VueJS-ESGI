<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const refreshPage = () => {
  window.location.reload()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
    <!-- Animation burger qui tombe -->
    <div class="animate-bounce mb-8">
      <div class="text-8xl">🍔</div>
    </div>

    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 class="text-3xl font-semibold text-gray-800 mb-4">Oups ! Burger introuvable</h2>
      <p class="text-gray-600 mb-8 max-w-md">
        Cette page a disparu plus vite qu'un burger dans un estomac affamé ! Elle n'existe peut-être
        pas ou a été déplacée.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold"
        >
          🏠 Retour à l'accueil
        </router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
