<script setup lang="ts">
  import Navbar from '@/components/header/Navbar.vue'
  import Hero from '@/components/header/Hero.vue';
  import Contact from '@/components/main/Contact.vue';
  import About from '@/components/main/About.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <Hero />

    <!-- Menu Section -->
    <section id="menu" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Menu</h2>
          <p class="text-lg text-gray-600">
            Tu cliques, on cuisine.<br />On ne déploie que du bon.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Burger 1 -->
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src="../../public/logoVue.png"
              alt="Classic Burger"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Classic Burger</h3>
              <p class="text-gray-600 mb-4">
                Burger classique avec steak, salade, tomate, cornichons
              </p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-red-600">8.99€</span>
                <button
                  class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>

          <!-- Burger 2 -->
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src="../../public/logoVue.png"
              alt="Cheese Burger"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Cheese Burger</h3>
              <p class="text-gray-600 mb-4">Burger avec fromage fondu, steak, salade, oignons</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-red-600">9.99€</span>
                <button
                  class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>

          <!-- Burger 3 -->
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src="../../public/logoVue.png"
              alt="Bacon Burger"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Bacon Burger</h3>
              <p class="text-gray-600 mb-4">
                Burger avec bacon croustillant, steak, salade, tomate
              </p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-red-600">11.99€</span>
                <button
                  class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>

          <!-- Burger 4 -->
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src="../../public/logoVue.png"
              alt="Deluxe Burger"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Deluxe Burger</h3>
              <p class="text-gray-600 mb-4">
                Double steak, fromage, bacon, salade, tomate, sauce spéciale
              </p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-red-600">14.99€</span>
                <button
                  class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>

          <!-- Burger 5 -->
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src="../../public/logoVue.png"
              alt="Veggie Burger"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Veggie Burger</h3>
              <p class="text-gray-600 mb-4">Steak végétarien, salade, tomate, avocat, sauce végé</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-red-600">10.99€</span>
                <button
                  class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>

          <!-- Burger 6 -->
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src="../../public/logoVue.png"
              alt="Spicy Burger"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Spicy Burger</h3>
              <p class="text-gray-600 mb-4">Burger épicé avec jalapeños, fromage, sauce piquante</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-red-600">12.99€</span>
                <button
                  class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <About />
    <Contact />

  </div>
</template>
