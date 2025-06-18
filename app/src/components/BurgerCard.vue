<script setup lang="ts">


   defineProps<{
    name: { required: true, type: String },
    description: { require: true, type: String },
    price: { require: true, type: Float32Array },
   }>()

</script>

<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
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
</template>
