<script setup lang="ts">
  import { Camera, Hamburger, ShoppingCart, User } from 'lucide-vue-next'
import About from '@/components/main/About.vue';
import Contact from '@/components/main/Contact.vue';
  import Navbar from '@/components/header/Navbar.vue'
  import Hero from '@/components/header/Hero.vue';
  import BurgerCard from '@/components/BurgerCard.vue';
  import { BurgerService } from '@/services/burgerService';
  import { useBurgers } from '@/services/burgerService';
  import { ref, onMounted } from 'vue';

  // Exemple simple avec useBurgers hook
  const { burgers, loading, error, loadBurgers } = useBurgers()

  // Charger les burgers au montage du composant
  onMounted(() => {
    loadBurgers()
  })

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <Hero />

    <!-- Menu Section -->

      <div id="menu" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Menu</h2>
          <p class="text-lg text-gray-600">
            Tu cliques, on cuisine.<br />On ne déploie que du bon.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Exemple simple d'utilisation -->
          <div v-if="loading">Chargement...</div>
          <div v-else-if="error">Erreur: {{ error }}</div>
          <BurgerCard 
            v-else
            v-for="burger in burgers"
            :key="burger.id"
            v-bind="burger"
          />
        </div>
      </div>

    <About />
    <Contact />

  </div>
</template>
