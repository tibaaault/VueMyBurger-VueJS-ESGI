<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useCartStore } from '@/stores/cart'
  import type { Burger } from '@/types/Burger'
  import type { Ingredient } from '@/types/Ingredient'


  // ingrédients
  const availableIngredients: Ingredient[] = [
    { id: 'bun-top', name: 'Pain du haut', color: '#D2B48C', price: 0, category: 'bun' },
    { id: 'bun-bottom', name: 'Pain du bas', color: '#DEB887', price: 0, category: 'bun' },

    { id: 'beef', name: 'Steak de bœuf', color: '#8B4513', price: 3.5, category: 'meat' },
    { id: 'chicken', name: 'Poulet grillé', color: '#F4A460', price: 3.0, category: 'meat' },
    { id: 'fish', name: 'Poisson pané', color: '#FFE4B5', price: 3.8, category: 'meat' },

    { id: 'lettuce', name: 'Salade', color: '#90EE90', price: 0.5, category: 'vegetable' },
    { id: 'tomato', name: 'Tomate', color: '#FF6347', price: 0.6, category: 'vegetable' },
    { id: 'onion', name: 'Oignon', color: '#F5F5DC', price: 0.4, category: 'vegetable' },
    { id: 'pickle', name: 'Cornichon', color: '#6B8E23', price: 0.3, category: 'vegetable' },

    { id: 'cheddar', name: 'Cheddar', color: '#FFA500', price: 1.2, category: 'cheese' },
    { id: 'swiss', name: 'Gruyère', color: '#FFFF99', price: 1.5, category: 'cheese' },

    { id: 'ketchup', name: 'Ketchup', color: '#DC143C', price: 0.2, category: 'sauce' },
    { id: 'mayo', name: 'Mayonnaise', color: '#FFFACD', price: 0.2, category: 'sauce' },
    { id: 'mustard', name: 'Moutarde', color: '#FFDB58', price: 0.2, category: 'sauce' },
  ]

  const burgerIngredients = ref<Ingredient[]>([])
  const burgerName = ref('')
  const cartStore = useCartStore()

  const basePrice = 4.0

  const maxIngredients = 10
  // prix
  const totalPrice = computed(() => {
    const ingredientsPrice = burgerIngredients.value.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0,
    )
    return basePrice + ingredientsPrice
  })

  // Vérifier si on peut ajouter des ingrédients
  const canAddIngredients = computed(() => {
    return burgerIngredients.value.length < maxIngredients
  })

  const handleIngredientClick = (ingredient: Ingredient) => {
    if (canAddIngredients.value) {
      addIngredient(ingredient)
    }
  }
  const ingredientsByCategory = computed(() => {
    const categories = {
      bun: availableIngredients.filter((i) => i.category === 'bun'),
      meat: availableIngredients.filter((i) => i.category === 'meat'),
      cheese: availableIngredients.filter((i) => i.category === 'cheese'),
      vegetable: availableIngredients.filter((i) => i.category === 'vegetable'),
      sauce: availableIngredients.filter((i) => i.category === 'sauce'),
    }
    return categories
  })

  // ajouter un ingrédient + limiter à 10
  const addIngredient = (ingredient: Ingredient) => {
    if (burgerIngredients.value.length >= maxIngredients) {
      alert(`Vous ne pouvez pas ajouter plus de ${maxIngredients} ingrédients !`)
      return
    }

    if (burgerIngredients.value.length === 0 && ingredient.id !== 'bun-bottom') {
      const bottomBun = availableIngredients.find((i) => i.id === 'bun-bottom')
      if (bottomBun) {
        if (burgerIngredients.value.length + 2 > maxIngredients) {
          alert(`Vous ne pouvez pas ajouter plus de ${maxIngredients} ingrédients !`)
          return
        }
        burgerIngredients.value.push({ ...bottomBun })
      }
    }
    if (ingredient.category === 'bun') {
      const existingBun = burgerIngredients.value.find((i) => i.id === ingredient.id)
      if (existingBun) return // pain existe dejà

      // supp l'autre pain
      if (ingredient.id === 'bun-top') {
        burgerIngredients.value = burgerIngredients.value.filter((i) => i.id !== 'bun-top')
      } else if (ingredient.id === 'bun-bottom') {
        burgerIngredients.value = burgerIngredients.value.filter((i) => i.id !== 'bun-bottom')
      }
    }

    burgerIngredients.value.push({ ...ingredient })
    organizeIngredients()
  }

  // supp un ingrédient
  const removeIngredient = (index: number) => {
    burgerIngredients.value.splice(index, 1)
    organizeIngredients()
  }

  // organiser les ingrédients 
  const organizeIngredients = () => {
    burgerIngredients.value.sort((a, b) => {
      const getOrderPriority = (ingredient: Ingredient) => {
        if (ingredient.id === 'bun-bottom') return 1000
        if (ingredient.id === 'bun-top') return 0

        switch (ingredient.category) {
          case 'cheese':
            return 100
          case 'meat':
            return 200
          case 'sauce':
            return 300
          case 'vegetable':
            if (ingredient.id === 'lettuce') return 50
            if (ingredient.id === 'tomato') return 60
            if (ingredient.id === 'onion') return 70
            if (ingredient.id === 'pickle') return 80
            return 400
          default:
            return 500
        }
      }

      return getOrderPriority(a) - getOrderPriority(b)
    })
  }


  const resetBurger = () => {
    burgerIngredients.value = []
    burgerName.value = ''
  }

  const saveBurger = () => {
    if (burgerIngredients.value.length === 0) {
      alert('Votre burger doit contenir au moins un ingrédient !')
      return
    }

    // nom automatique
    let finalName = burgerName.value.trim()
    if (!finalName) {
      const ingredients = burgerIngredients.value
      const meats = ingredients.filter((i) => i.category === 'meat')
      const mainIngredient = meats.length > 0 ? meats[0].name : 'Burger'
      finalName = `${mainIngredient} Personnalisé`
    }


    const customBurger: Burger = {
      id: Date.now(), //id d'un burger personnalisé pour l'ajout plus tard
      name: finalName,
      description: `Burger personnalisé avec: ${burgerIngredients.value.map((i) => i.name).join(', ')}`,
      price: totalPrice.value,
      img: '/burger.png', 
      ingredients: burgerIngredients.value.map((i) => i.name),
    }

    cartStore.addItem({
      burger: customBurger,
      quantity: 1,
    })
    closeBuilder()
  }

  const emit = defineEmits(['close'])
  const closeBuilder = () => emit('close')
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-red-600 text-white p-4 flex justify-between items-center">
        <h2 class="text-2xl font-bold">🍔 Créateur de Burger</h2>
        <button @click="closeBuilder" class="text-white hover:text-gray-200 text-2xl">✕</button>
      </div>

      <div class="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
        <div class="lg:w-1/2 p-6 flex flex-col">
          <div class="mb-4">
            <input
              v-model="burgerName"
              placeholder="Nom de votre burger..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div
            class="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 min-h-[400px]"
          >
            <h3 class="text-lg font-semibold mb-2">Votre Burger</h3>
            <p class="text-sm text-gray-600 mb-2 text-center">
              Cliquez sur un ingrédient pour le retirer
            </p>
            <div class="text-xs text-blue-600 mb-2 text-center bg-blue-50 px-3 py-1 rounded">
              💡 Construction : Pain du bas → Sauce → Viande → Fromage → Légumes → Pain du haut
            </div>
            <div
              class="text-xs mb-4 text-center px-3 py-1 rounded"
              :class="
                burgerIngredients.length >= maxIngredients
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              "
            >
              {{ burgerIngredients.length }}/{{ maxIngredients }} ingrédients
              <span v-if="burgerIngredients.length >= maxIngredients">- Limite atteinte!</span>
            </div>

            <div class="flex flex-col items-center space-y-1 mb-6 min-h-[200px] justify-end">
              <div v-if="!burgerIngredients.length" class="text-gray-400 text-center mb-8">
                <div class="text-6xl mb-2">🍞</div>
                <p>Cliquez sur les ingrédients<br />pour construire votre burger</p>
              </div>

              <div
                v-for="(ingredient, index) in burgerIngredients"
                :key="`${ingredient.id}-${index}`"
                @click="removeIngredient(index)"
                class="w-32 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200 border border-gray-300 shadow-sm relative"
                :style="{ backgroundColor: ingredient.color }"
                :title="`Cliquer pour retirer ${ingredient.name}`"
              >
                {{ ingredient.name }}
                <span class="absolute -left-6 text-xs text-gray-400 font-normal">
                  {{ burgerIngredients.length - index }}
                </span>
              </div>
            </div>

            <div class="text-center">
              <div class="text-2xl font-bold text-green-600 mb-4">{{ totalPrice.toFixed(2) }}€</div>

              <div class="flex gap-2">
                <button
                  @click="resetBurger"
                  class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Recommencer
                </button>
                <button
                  @click="saveBurger"
                  :disabled="!burgerIngredients.length"
                  class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-1/2 p-6 bg-gray-100 overflow-y-auto">
          <h3 class="text-lg font-semibold mb-4">Ingrédients Disponibles</h3>
          <div class="mb-6">
            <h4 class="font-medium mb-2 text-yellow-700 flex items-center justify-between">
              <span>🍞 Pains</span>
              
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="ingredient in ingredientsByCategory.bun"
                :key="ingredient.id"
                @click="handleIngredientClick(ingredient)"
                class="p-3 rounded-lg text-center border-2 transition-all duration-200"
                :class="
                  canAddIngredients
                    ? 'cursor-pointer hover:shadow-md hover:border-red-300'
                    : 'cursor-not-allowed opacity-50'
                "
                :style="{ backgroundColor: ingredient.color }"
              >
                <div class="font-medium text-sm">{{ ingredient.name }}</div>
                <div class="text-xs">{{ ingredient.price.toFixed(2) }}€</div>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="font-medium mb-2 text-red-700 flex items-center justify-between">
              <span>🥩 Viandes</span>
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="ingredient in ingredientsByCategory.meat"
                :key="ingredient.id"
                @click="handleIngredientClick(ingredient)"
                class="p-3 rounded-lg text-center border-2 transition-all duration-200"
                :class="
                  canAddIngredients
                    ? 'cursor-pointer hover:shadow-md hover:border-red-300'
                    : 'cursor-not-allowed opacity-50'
                "
                :style="{ backgroundColor: ingredient.color }"
              >
                <div class="font-medium text-sm">{{ ingredient.name }}</div>
                <div class="text-xs">{{ ingredient.price.toFixed(2) }}€</div>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="font-medium mb-2 text-orange-700 flex items-center justify-between">
              <span>🧀 Fromages</span>
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="ingredient in ingredientsByCategory.cheese"
                :key="ingredient.id"
                @click="handleIngredientClick(ingredient)"
                class="p-3 rounded-lg text-center border-2 transition-all duration-200"
                :class="
                  canAddIngredients
                    ? 'cursor-pointer hover:shadow-md hover:border-red-300'
                    : 'cursor-not-allowed opacity-50'
                "
                :style="{ backgroundColor: ingredient.color }"
              >
                <div class="font-medium text-sm">{{ ingredient.name }}</div>
                <div class="text-xs">{{ ingredient.price.toFixed(2) }}€</div>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <h4 class="font-medium mb-2 text-green-700 flex items-center justify-between">
              <span>🥬 Légumes</span>
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="ingredient in ingredientsByCategory.vegetable"
                :key="ingredient.id"
                @click="handleIngredientClick(ingredient)"
                class="p-3 rounded-lg text-center border-2 transition-all duration-200"
                :class="
                  canAddIngredients
                    ? 'cursor-pointer hover:shadow-md hover:border-red-300'
                    : 'cursor-not-allowed opacity-50'
                "
                :style="{ backgroundColor: ingredient.color }"
              >
                <div class="font-medium text-sm">{{ ingredient.name }}</div>
                <div class="text-xs">{{ ingredient.price.toFixed(2) }}€</div>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="font-medium mb-2 text-red-700 flex items-center justify-between">
              <span>🍯 Sauces</span>
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="ingredient in ingredientsByCategory.sauce"
                :key="ingredient.id"
                @click="addIngredient(ingredient)"
                class="p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow text-center border-2 hover:border-red-300"
                :style="{ backgroundColor: ingredient.color }"
              >
                <div class="font-medium text-sm">{{ ingredient.name }}</div>
                <div class="text-xs">{{ ingredient.price.toFixed(2) }}€</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
