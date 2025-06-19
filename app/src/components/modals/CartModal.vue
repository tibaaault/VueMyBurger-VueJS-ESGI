<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { Burger } from '@/types/Burger'
import { computed, ref } from 'vue';
import OrderModal from './OrderModal.vue'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)

const showOrderModal = ref(false)

defineProps<{
  open: boolean
}>()

const addToCart = (burger: Burger) => cartStore.addItem({ burger: burger, quantity: 1 })
const removeFromCart = (id: number) => cartStore.removeItem(id)

const emit = defineEmits(['update:open'])
const close = () => emit('update:open', false)

const openOrderModal = () => {
  showOrderModal.value = true
}

const handleOrderCreated = (order: any) => {
  close()
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-y-0 right-0 z-50 w-[100%] md:w-[30%] flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white shadow-lg max-w-md w-full h-full p-9 relative">
        <button @click="close" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          X
        </button>
        <h2 class="text-xl font-bold mb-4">Votre panier</h2>
        <div v-if="!cartItems.length" class="bg-gray-100 p-4 rounded text-center">
          Votre panier est vide.
        </div>
        <div
          v-else
          v-for="item in cartItems"
          :key="item.burger.id"
          class="text-gray-500 py-3 border-b"
        >
          <div class="flex flex-row">
            <img
              class="w-[35%] rounded"
              :src="item.burger.img || '/burger.png'"
              alt="Image du burger"
            />
            <div class="flex flex-col w-[70%] pl-4">
              <p class="text-center font-semibold text-gray-800">{{ item.burger.name }}</p>
              <div class="flex flex-row mx-auto w-[100%] mt-2">
                <p class="w-[50%] text-center text-sm">Quantité</p>
                <div class="w-[50%] flex flex-row justify-between border rounded">
                  <button
                    class="px-2 hover:bg-gray-200 transition"
                    @click="removeFromCart(item.burger.id)"
                  >
                    -
                  </button>
                  <p class="px-4 text-center">{{ item.quantity }}</p>
                  <button class="px-2 hover:bg-gray-200 transition" @click="addToCart(item.burger)">
                    +
                  </button>
                </div>
              </div>
              <p class="text-right pt-2 font-medium">
                Prix : {{ (item.burger.price * item.quantity).toFixed(2) }}€
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="cartItems.length > 0"
          class="flex flex-row justify-between items-center w-full border-t pt-4 mt-4"
        >
          <p class="text-lg font-semibold">Prix total de la commande :</p>
          <p class="text-xl font-bold text-green-600">{{ cartStore.totalPrice.toFixed(2) }}€</p>
        </div>
        <div v-if="cartItems.length > 0" class="mt-6 flex justify-center items-center">
          <button
            @click="openOrderModal"
            class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200 font-semibold"
          >
            Commander ({{ cartStore.totalQuantity }} article{{
              cartStore.totalQuantity > 1 ? 's' : ''
            }})
          </button>
        </div>
      </div>
    </div>
  </transition>
  
  <OrderModal 
    v-model:open="showOrderModal" 
    @order-created="handleOrderCreated"
  />
</template>
