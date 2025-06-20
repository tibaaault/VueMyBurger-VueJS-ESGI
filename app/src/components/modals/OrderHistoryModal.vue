<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { orderService } from '@/services/orderService'
  import type { Order } from '@/types/Order'

  const props = defineProps<{
    open: boolean
  }>()

  const emit = defineEmits(['update:open'])

  const userStore = useUserStore()

  const orders = ref<Order[]>([])
  const loading = ref(false)
  const error = ref('')

  const formattedOrders = computed(() => {
    return orders.value.map((order) => ({
      ...order,
      formattedDate: new Date(order.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }))
  })

  const fetchOrders = async () => {
    if (!userStore.user?.id) {
      error.value = 'Vous devez être connecté pour voir vos commandes'
      return
    }

    loading.value = true
    error.value = ''

    try {
      orders.value = await orderService.getUserOrders(userStore.user.id)
    } catch (err: any) {
      error.value = err?.message || 'Erreur lors du chargement des commandes'
    } finally {
      loading.value = false
    }
  }
  watch(
    () => props.open,
    (newValue) => {
      if (newValue) {
        fetchOrders()
      }
    },
  )

  const closeModal = () => {
    emit('update:open', false)
    orders.value = []
    error.value = ''
  }
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div
        class="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative"
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          ✕
        </button>

        <div class="p-6 overflow-y-auto max-h-[90vh]">
          <h2 class="text-2xl font-semibold mb-6 text-center">Historique de vos commandes</h2>

          <!-- Loading state -->
          <div v-if="loading" class="text-center py-8">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"
            ></div>
            <p class="mt-4 text-gray-600">Chargement de vos commandes...</p>
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="text-center py-8">
            <div class="text-red-600 text-lg mb-4">{{ error }}</div>
            <button
              @click="fetchOrders"
              class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Réessayer
            </button>
          </div>

          <!-- Empty state -->
          <div v-else-if="!orders.length" class="text-center py-8">
            <div class="text-gray-500 text-lg mb-4">Aucune commande trouvée</div>
            <p class="text-gray-400">Vous n'avez pas encore passé de commande.</p>
          </div>

          <!-- Orders list -->
          <div v-else class="space-y-4">
            <div
              v-for="order in formattedOrders"
              :key="order.id"
              class="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <!-- Order header -->
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-semibold text-lg">Commande #{{ order.id }}</h3>
                  <p class="text-gray-600 text-sm">{{ order.formattedDate }}</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-green-600 mt-1">
                    {{ order.totalPrice.toFixed(2) }}€
                  </p>
                </div>
              </div>

              <!-- Delivery address -->
              <div class="mb-3 p-3 bg-gray-50 rounded">
                <p class="font-medium text-sm text-gray-700">Adresse de livraison :</p>
                <p class="text-gray-600 text-sm">{{ order.address }}</p>
              </div>

              <!-- Order items -->
              <div class="space-y-2">
                <p class="font-medium text-sm text-gray-700">Articles commandés :</p>
                <div
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                >
                  <div class="flex items-center space-x-3">
                    <img
                      :src="item.burger?.img || '/burger.png'"
                      :alt="item.burger?.name || item.burgerName || 'Burger personnalisé'"
                      class="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p class="font-medium">
                        {{ item.burger?.name || item.burgerName || 'Burger personnalisé' }}
                      </p>
                      <p class="text-sm text-gray-600">
                        {{ item.unitPrice.toFixed(2) }}€ × {{ item.quantity }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-medium">{{ (item.unitPrice * item.quantity).toFixed(2) }}€</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Close button -->
          <div class="mt-6 flex justify-center">
            <button
              @click="closeModal"
              class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
