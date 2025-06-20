<script setup lang="ts">
import { Hamburger, History, ShoppingCart } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

import RegisterModal from '@/components/modals/RegisterModal.vue'
import LoginModal from '@/components/modals/LoginModal.vue'
import CartModal from '@/components/modals/CartModal.vue'
import OrderHistoryModal from '@/components/modals/OrderHistoryModal.vue'

const cartStore = useCartStore()
const userStore = useUserStore()


const cartCount = computed(() => cartStore.cartTotalQuantity)

const showRegisterModal = ref(false)
const showLoginModal = ref(false)
const showCartModal = ref(false)
const showOrderHistoryModal = ref(false)

const disconnectUser = () => {
  userStore.clearUser()
  showCartModal.value = false
}

const openOrderHistory = () => {
  showOrderHistoryModal.value = true
}


</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo et nom de l'appli -->
        <RouterLink to="/" class="flex flex-row items-center space-x-2">
          <Hamburger color="black" :size="32" />
          <h1 class="text-2xl font-bold text-red-600">VueMyBurger</h1>
        </RouterLink>

        <nav class="hidden md:flex space-x-8">
          <a href="#menu" class="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium">Liste des burgers</a>
          <a href="#about" class="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium">À propos</a>
          <a href="#contact" class="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium">Contact</a>
        </nav>

        <div class="flex items-center gap-4 ">
        <button 
          v-if="userStore.user?.username"
          @click="openOrderHistory"
          class="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          title="Historique des commandes"
        >
          <History color="black" :size="32" />
        </button>

          <button
            v-if="userStore.user?.username"
            @click="showCartModal = true"
            class="relative md:p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <span class="sr-only">Voir le panier</span>
            <ShoppingCart color="black" :size="32" />
            <span class="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              {{ cartCount }}
            </span>
          </button>

          <button
            v-if="userStore.user?.username"
            @click="disconnectUser"
            class="bg-red-600 text-white md:px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Déconnexion ({{ userStore.user?.username }})
          </button>

          <div v-else class="flex flex-row">
            <button
              @click="showLoginModal = true"
              class=" bg-green-600 text-white px-1 md:px-4 md:py-2 rounded hover:bg-green-700 transition"
            >
              Se connecter
            </button>
            <button
              @click="showRegisterModal = true"
              class="bg-green-600 text-white px-1 md:px-4 md:py-2 rounded hover:bg-green-700 transition mx-2"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Gestion de l'affichage du modal de connexion -->
    <LoginModal v-model:open="showLoginModal" />
    <!-- Gestion de l'affichage du modal d'inscription -->
    <RegisterModal v-model:open="showRegisterModal" />
    <!-- Gestion de l'affichage du modal du panier -->
    <CartModal v-model:open="showCartModal" />
    <!-- Gestion de l'affichage du modal de l'historique des commandes -->
    <OrderHistoryModal v-model:open="showOrderHistoryModal" />
  </header>
</template>
