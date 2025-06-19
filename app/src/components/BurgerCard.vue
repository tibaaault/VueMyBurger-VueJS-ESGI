<script setup lang="ts">
import type { Burger } from '@/types/Burger'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import LoginModal from '@/components/modals/LoginModal.vue'
import { useUserStore } from '@/stores/user'

const props = defineProps<Burger>()

// Initialiser les stores
const cartStore = useCartStore()
const userStore = useUserStore()
const showLoginModal = ref(false)

const addToCart = () => {
  const cartItem = {
    burger: {
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      img: props.img || '/burger.png',
      ingredients: props.ingredients,
    },
    quantity: 1,
  }
  cartStore.addItem(cartItem)
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full"
  >
    <img :src="img || '/burger.png'" :alt="name" class="w-full h-48 object-cover" />
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ name }}</h3>
      <p class="text-gray-600 mb-4 flex-grow">{{ description }}</p>
      <div class="flex justify-between items-center mt-auto">
        <span class="text-2xl font-bold text-red-600">{{ price.toFixed(2) }}€</span>

        <button
          v-if="userStore.user?.username"
          @click="addToCart"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Ajouter au panier
        </button>
        <button
          v-else
          @click="showLoginModal = true"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>

  <!-- Gestion de l'affichage du modal de connexion -->
  <LoginModal v-model:open="showLoginModal" />
</template>
