<script setup lang="ts">
  import BurgerCard from '@/components/burger/BurgerCard.vue'
  import { onMounted, ref } from 'vue'
  import { getAllBurgers } from '@/services/burgerService'
  import type { Burger } from '@/types/Burger' 

  const burgers = ref<Burger[]>([])

  onMounted(async () => {
    try {
      burgers.value = await getAllBurgers()
    } catch (error) {
      console.error('Erreur lors de la récupération des burgers:', error)
    }
  })
</script>

<template>
  <div id="menu" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Menu</h2>
      <p class="text-lg text-gray-600">Tu cliques, on cuisine.<br />On ne déploie que du bon.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BurgerCard v-for="burger in burgers" :key="burger.id" v-bind="burger" />
    </div>
  </div>
</template>
