<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { useCartStore } from '@/stores/cart'
import type { Burger } from '@/types/Burger'
import BurgerCard from '../BurgerCard.vue';
const cartItem = useCartStore().cartItems
const cartStore = useCartStore()

defineProps<{
  burger?: Burger
  open: boolean
}>()

const addToCart = (burger: Burger) => cartStore.addItem( { burger: burger, quantity: 1 } )
const removeToCart = (burger: Burger) => cartStore.removeItem( burger.id )


const emit = defineEmits(['update:open'])
const close = () => emit('update:open', false)
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-y-0 right-0 z-50 w-[30%] flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white shadow-lg max-w-md w-full h-full p-9 relative">
        <button @click="close" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          X
        </button>
        <h2 class="text-xl font-bold mb-4">Votre panier</h2>
        <div v-if="!cartItem.length" class="bg-gray-500">Votre panier est vide.</div>
        <div v-else v-for="item in cartItem" class="text-gray-500 py-3 ">
          <div class="flex flex-row">
            <img class="w-[30%]" :src="item.burger.img || '/burger.png'" />
            <div class="flex flex-col w-[70%]">
              <p class="text-center">{{ item.burger.name }}</p>
              <div class="flex flex-row  mx-auto w-[100%]">
                <p class="w-[50%] text-center"> Quantité </p>
                <div class="w-[50%] flex flex-row justify-between border">
                  <button class="px-2" @click="removeToCart( item.burger )" >-</button>
                  <p class="rounded-xl px-7 text-center mx-auto">{{item.quantity }}</p>
                  <button class="px-2" @click="addToCart( item.burger )">+</button>
                </div>
              </div>
              <p class="pe-4">Prix Total : {{ item.burger.price * item.quantity }}€</p>
            </div>

          </div>
        </div>

        <div class="mt-6 flex justify-center items-center">
          <Button
            @click="close"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Commander
          </Button>
        </div>
      </div>
    </div>
  </transition>
</template>
