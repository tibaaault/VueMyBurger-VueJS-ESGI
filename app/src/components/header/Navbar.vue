<script setup lang="ts">
    import { Hamburger, ShoppingCart } from 'lucide-vue-next'
    import { computed, ref } from 'vue'
    import { RouterLink } from 'vue-router'

    import { useCartStore } from '@/stores/cart'
    import { useUserStore } from '@/stores/user'

    import LoginModal from '@/components/modals/LoginModal.vue'
    import CartModal from '@/components/modals/CartModal.vue'

    const cartStore = useCartStore()
    const userStore = useUserStore()

    const cartCount = cartStore.countItems()

    const showLoginModal = ref(false)
    const showCartModal = ref(false)

    const disconnectUser = () => {
        userStore.clearUsername()
        showCartModal.value = false
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

        <!-- Barre de navigation -->
        <nav class="hidden md:flex space-x-8">
          <a href="#menu" class="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium">Liste des burgers</a>
          <a href="#about" class="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium">À propos</a>
          <a href="#contact" class="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium">Contact</a>
        </nav>

        <!-- Panier OU Modal de "connexion" -->
        <div class="flex items-center gap-4">
          <button v-if="userStore.userName" @click="showCartModal = true" class="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500">
            <span class="sr-only">Voir le panier</span>
            <ShoppingCart color="black" :size="32" />
            <span class="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              {{ cartCount }}
            </span>
          </button>

          <button v-if="userStore.userName" @click="disconnectUser" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Déconnexion ({{ userStore.userName }})
          </button>

          <button v-else @click="showLoginModal = true" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Se connecter
          </button>
        </div>
      </div>
    </div>

    <!-- Gestion de l'affichage du modal de connexion -->
    <LoginModal v-model:open="showLoginModal" />
    <!-- Gestion de l'affichage du modal du panier -->
    <CartModal v-model:open="showCartModal" />
  </header>
</template>
