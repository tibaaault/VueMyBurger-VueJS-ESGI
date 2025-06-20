<script setup lang="ts">
import BurgerBuilder from '@/components/BurgerBuilder.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import LoginModal from '@/components/modals/LoginModal.vue'

const userStore = useUserStore()
const showBurgerBuilder = ref(false)
const showLoginModal = ref(false)

const openBurgerBuilder = () => {
  showBurgerBuilder.value = true
}

const closeBurgerBuilder = () => {
  showBurgerBuilder.value = false
}
</script>

<template>
  <div class="mx-auto text-center py-6">
    <button
      v-if="userStore.user?.username"
      @click="openBurgerBuilder"
      class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
    >
      Créer mon burger
    </button>
    <button
      v-else
      @click="showLoginModal = true"
      class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
    >
      Créer mon burger
    </button>

    <!-- Builder de burger -->
    <BurgerBuilder v-if="showBurgerBuilder" @close="closeBurgerBuilder" />
    <!-- Gestion de l'affichage du modal de connexion -->
    <LoginModal v-model:open="showLoginModal" />
  </div>
</template>
