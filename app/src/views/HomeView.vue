<script setup lang="ts">
  import { Camera, Hamburger, ShoppingCart, User } from 'lucide-vue-next'

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

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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

    <!-- À propos Section -->
    <section id="about" class="bg-gray-100 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">À Propos de MyBurger</h2>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-600 mb-6">
              Designé pour être mangé. Codé pour être aimé.<br />
              Notre stack : pain bio, viande éthique, sauce maison.
            </p>
            <p class="text-lg text-gray-600">
              Notre équipe de chefs passionnés prépare chaque burger avec soin pour vous garantir
              une saveur exceptionnelle à chaque bouchée.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nous Contacter</h2>
          <p class="text-lg text-gray-600">Venez nous rendre visite ou contactez-nous</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div
              class="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Adresse</h3>
            <p class="text-gray-600">123 Rue des Burgers<br />75001 Paris, France</p>
          </div>

          <div>
            <div
              class="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Téléphone</h3>
            <p class="text-gray-600">01 23 45 67 89</p>
          </div>

          <div>
            <div
              class="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Horaires</h3>
            <p class="text-gray-600">Lun-Dim: 11h-23h</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Panier (masqué par défaut) -->
    <div class="fixed inset-0 z-50 overflow-hidden hidden">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between p-4 border-b">
            <h2 class="text-lg font-semibold">Votre Panier</h2>
            <button class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <div class="text-center text-gray-500 mt-8">Votre panier est vide</div>

            <!-- Exemple d'article dans le panier (masqué par défaut) -->
            <div class="hidden">
              <div class="flex items-center justify-between py-4 border-b">
                <div class="flex items-center">
                  <img
                    src="../../public/logoVue.png"
                    alt="Burger"
                    class="w-12 h-12 object-cover rounded"
                  />
                  <div class="ml-3">
                    <h3 class="text-sm font-medium">Classic Burger</h3>
                    <p class="text-sm text-gray-500">8.99€</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <button class="text-gray-400 hover:text-gray-600 mr-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"
                      ></path>
                    </svg>
                  </button>
                  <span class="mx-2 text-sm">1</span>
                  <button class="text-gray-400 hover:text-gray-600 ml-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t p-4 hidden">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-semibold">Total:</span>
              <span class="text-lg font-bold text-red-600">0.00€</span>
            </div>
            <button
              class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 mb-2"
            >
              Commander
            </button>
            <button
              class="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Vider le panier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
