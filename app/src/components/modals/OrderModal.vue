<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from './BaseModal.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { orderService } from '@/services/orderService'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits(['update:open', 'order-created'])

const cartStore = useCartStore()
const userStore = useUserStore()

const address = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const cartItems = computed(() => cartStore.cartItems)
const totalPrice = computed(() => cartStore.totalPrice)

const validateForm = (): boolean => {
  error.value = ''

  if (!address.value.trim()) {
    error.value = 'Veuillez saisir une adresse de livraison'
    return false
  }

  if (cartItems.value.length === 0) {
    error.value = 'Votre panier est vide'
    return false
  }

  if (!userStore.user?.id) {
    error.value = 'Vous devez être connecté pour passer commande'
    return false
  }

  return true
}

const handleOrder = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = ''

  try {
    const orderData = {
      userId: userStore.user!.id,
      address: address.value.trim(),
      items: orderService.cartItemsToOrderItems(cartItems.value),
    }

    const response = await orderService.createOrder(orderData)

    success.value = true

    cartStore.removeItems()
    emit('order-created', response.order)
    setTimeout(() => {
      emit('update:open', false)
      resetForm()
    }, 2000)
  } catch (err: any) {
    error.value = err?.message || 'Une erreur est survenue lors de la commande'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  address.value = ''
  error.value = ''
  success.value = false
  loading.value = false
}

const closeModal = () => {
  emit('update:open', false)
  resetForm()
}
</script>

<template>
  <BaseModal :open="open" @update:open="closeModal">
    <div v-if="!success">
      <h2 class="text-2xl font-semibold mb-6 text-center">Finaliser votre commande</h2>

      <!-- Résumé de la commande -->
      <div class="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 class="font-semibold mb-3">Résumé de votre commande :</h3>
        <div
          v-for="item in cartItems"
          :key="item.burger.id"
          class="flex justify-between items-center mb-2"
        >
          <span>{{ item.burger.name }} x{{ item.quantity }}</span>
          <span class="font-medium">{{ (item.burger.price * item.quantity).toFixed(2) }}€</span>
        </div>
        <div class="border-t pt-2 mt-3">
          <div class="flex justify-between items-center font-bold text-lg">
            <span>Total :</span>
            <span class="text-green-600">{{ totalPrice.toFixed(2) }}€</span>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleOrder" class="space-y-4">
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 mb-1">
            Adresse de livraison *
          </label>
          <textarea
            id="address"
            v-model="address"
            placeholder="Saisissez votre adresse complète"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows="3"
            :disabled="loading"
          ></textarea>
        </div>

        <div v-if="error" class="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {{ error }}
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            :disabled="loading"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
            :disabled="loading || cartItems.length === 0"
          >
            <span v-if="loading">Commande en cours...</span>
            <span v-else>Confirmer la commande</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Message de succès -->
    <div v-else class="text-center py-8">
      <div class="text-green-600 text-6xl mb-4">✓</div>
      <h2 class="text-2xl font-semibold text-green-600 mb-2">Commande confirmée !</h2>
      <p class="text-gray-600 mb-4">Votre commande a été enregistrée avec succès.</p>
      <p class="text-sm text-gray-500">Cette fenêtre va se fermer automatiquement...</p>
    </div>
  </BaseModal>
</template>
