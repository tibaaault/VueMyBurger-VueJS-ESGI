<script setup lang="ts">
import About from '@/components/main/About.vue'
import Contact from '@/components/main/Contact.vue'
import Navbar from '@/components/header/Navbar.vue'
import Hero from '@/components/header/Hero.vue'
import BurgerCard from '@/components/BurgerCard.vue'
import BurgerBuilder from '@/components/BurgerBuilder.vue'
import { useBurgers } from '@/services/burgerService'
import { ref, onMounted } from 'vue'
import LoginModal from '@/components/modals/LoginModal.vue'
import { useUserStore } from '@/stores/user'

const { burgers, loading, error, loadBurgers } = useBurgers()

const showLoginModal = ref(false)
const showBurgerBuilder = ref(false)
const userStore = useUserStore()

const openBurgerBuilder = () => {
  showBurgerBuilder.value = true
}

const closeBurgerBuilder = () => {
  showBurgerBuilder.value = false
}

onMounted(() => {
  loadBurgers()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <Hero />

    <!-- Menu Section -->

    <div id="menu" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Menu</h2>
        <p class="text-lg text-gray-600">Tu cliques, on cuisine.<br />On ne déploie que du bon.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Exemple simple d'utilisation -->
        <div v-if="loading">Chargement...</div>
        <div v-else-if="error">Erreur: {{ error }}</div>
        <BurgerCard v-else v-for="burger in burgers" :key="burger.id" v-bind="burger" />
      </div>
    </div>

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
    </div>
    <About />
    <Contact />

    <!-- Gestion de l'affichage du modal de connexion -->
    <LoginModal v-model:open="showLoginModal" />

    <!-- Builder de burger -->
    <BurgerBuilder v-if="showBurgerBuilder" @close="closeBurgerBuilder" />
  </div>
</template>
