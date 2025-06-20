<script setup lang="ts">
import BurgerCard from '@/components/BurgerCard.vue'
import { onMounted } from 'vue'
import { useBurgers } from '@/services/burgerService'

const { burgers, loading, error, loadBurgers } = useBurgers()

onMounted(() => {
  loadBurgers()
})
</script>
<template>
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
</template>
