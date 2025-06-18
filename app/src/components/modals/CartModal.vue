<script setup lang="ts">
  import BaseModal from './BaseModal.vue'
  import { useCartStore } from '@/stores/cart'

  defineProps<{ open: boolean }>()
  const emit = defineEmits(['update:open'])

  const cart = useCartStore()
  const close = () => emit('update:open', false)
</script>

<template>
  <BaseModal :open="open" @update:open="emit('update:open', $event)">
    <h2 class="text-xl font-bold mb-4">Votre panier</h2>

    <div class="text-gray-500">Votre panier est vide.</div>

    <div class="mt-6 flex justify-center items-center">
      <RouterLink to="/order" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
        Commander
      </RouterLink>
    </div>
  </BaseModal>
</template>
