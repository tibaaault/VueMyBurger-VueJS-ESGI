<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { Burger } from '@/types/Burger'

// Types pour les ingrédients
interface Ingredient {
  id: string
  name: string
  color: string
  price: number
  category: 'bun' | 'meat' | 'vegetable' | 'sauce' | 'cheese'
}

// Liste des ingrédients disponibles
const availableIngredients: Ingredient[] = [
  // Pains
  { id: 'bun-top', name: 'Pain du haut', color: '#D2B48C', price: 0, category: 'bun' },
  { id: 'bun-bottom', name: 'Pain du bas', color: '#DEB887', price: 0, category: 'bun' },

  // Viandes
  { id: 'beef', name: 'Steak de bœuf', color: '#8B4513', price: 3.5, category: 'meat' },
  { id: 'chicken', name: 'Poulet grillé', color: '#F4A460', price: 3.0, category: 'meat' },
  { id: 'fish', name: 'Poisson pané', color: '#FFE4B5', price: 3.8, category: 'meat' },

  // Légumes
  { id: 'lettuce', name: 'Salade', color: '#90EE90', price: 0.5, category: 'vegetable' },
  { id: 'tomato', name: 'Tomate', color: '#FF6347', price: 0.6, category: 'vegetable' },
  { id: 'onion', name: 'Oignon', color: '#F5F5DC', price: 0.4, category: 'vegetable' },
  { id: 'pickle', name: 'Cornichon', color: '#6B8E23', price: 0.3, category: 'vegetable' },

  // Fromages
  { id: 'cheddar', name: 'Cheddar', color: '#FFA500', price: 1.2, category: 'cheese' },
  { id: 'swiss', name: 'Gruyère', color: '#FFFF99', price: 1.5, category: 'cheese' },

  // Sauces
  { id: 'ketchup', name: 'Ketchup', color: '#DC143C', price: 0.2, category: 'sauce' },
  { id: 'mayo', name: 'Mayonnaise', color: '#FFFACD', price: 0.2, category: 'sauce' },
  { id: 'mustard', name: 'Moutarde', color: '#FFDB58', price: 0.2, category: 'sauce' },
]

// État du burger en construction
const burgerIngredients = ref<Ingredient[]>([])
const burgerName = ref('')
const cartStore = useCartStore()

// Prix de base du burger
const basePrice = 2.0

const maxIngredients = 10

// Prix total calculé
const totalPrice = computed(() => {
  const ingredientsPrice = burgerIngredients.value.reduce(
    (sum, ingredient) => sum + ingredient.price,
    0,
  )
  return basePrice + ingredientsPrice
})

// Compter les ingrédients par catégorie dans le burger
const ingredientCount = computed(() => {
  const counts = {
    bun: 0,
    meat: 0,
    cheese: 0,
    vegetable: 0,
    sauce: 0,
  }

  burgerIngredients.value.forEach((ingredient) => {
    counts[ingredient.category]++
  })

  return counts
})

// Vérifier si on peut ajouter des ingrédients
const canAddIngredients = computed(() => {
  return burgerIngredients.value.length < maxIngredients
})

// Fonction pour gérer le clic sur un ingrédient
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

// Ajouter un ingrédient au burger
const addIngredient = (ingredient: Ingredient) => {
  // Vérifier la limite d'ingrédients
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
    if (existingBun) return // Déjà présent, ne pas ajouter

    // Supprimer l'autre pain du même type s'il existe
    if (ingredient.id === 'bun-top') {
      burgerIngredients.value = burgerIngredients.value.filter((i) => i.id !== 'bun-top')
    } else if (ingredient.id === 'bun-bottom') {
      burgerIngredients.value = burgerIngredients.value.filter((i) => i.id !== 'bun-bottom')
    }
  }

  burgerIngredients.value.push({ ...ingredient })
  organizeIngredients()
}

// Supprimer un ingrédient (clic sur le burger)
const removeIngredient = (index: number) => {
  burgerIngredients.value.splice(index, 1)
  organizeIngredients()
}

// Organiser les ingrédients dans l'ordre logique d'un burger (du bas vers le haut)
const organizeIngredients = () => {
  const order = [
    'bun-bottom', // Pain du bas (en premier dans le tableau = affiché en bas)
    'sauce', // Sauces sur le pain du bas
    'meat', // Viande
    'cheese', // Fromage sur la viande
    'vegetable', // Légumes (salade, tomate, oignon, cornichons)
    'bun-top', // Pain du haut (en dernier dans le tableau = affiché en haut)
  ]

  burgerIngredients.value.sort((a, b) => {
    // Fonction pour obtenir la priorité d'ordre d'un ingrédient
    const getOrderPriority = (ingredient: Ingredient) => {
      // Gestion spéciale pour les pains
      if (ingredient.id === 'bun-bottom') return 0
      if (ingredient.id === 'bun-top') return 1000

      // Gestion par catégorie avec sous-ordre pour les légumes
      switch (ingredient.category) {
        case 'sauce':
          return 100
        case 'meat':
          return 200
        case 'cheese':
          return 300
        case 'vegetable':
          // Ordre spécifique pour les légumes
          if (ingredient.id === 'lettuce') return 400
          if (ingredient.id === 'tomato') return 410
          if (ingredient.id === 'onion') return 420
          if (ingredient.id === 'pickle') return 430
          return 400
        default:
          return 500
      }
    }

    return getOrderPriority(a) - getOrderPriority(b)
  })
}

// Réinitialiser le burger
const resetBurger = () => {
  burgerIngredients.value = []
  burgerName.value = ''
}

// Sauvegarder le burger et l'ajouter au panier
const saveBurger = () => {
  if (burgerIngredients.value.length === 0) {
    alert('Votre burger doit contenir au moins un ingrédient !')
    return
  }

  // Générer un nom automatique si aucun nom n'est saisi
  let finalName = burgerName.value.trim()
  if (!finalName) {
    const ingredients = burgerIngredients.value
    const meats = ingredients.filter((i) => i.category === 'meat')
    const mainIngredient = meats.length > 0 ? meats[0].name : 'Burger'
    finalName = `${mainIngredient} Personnalisé`
  }

  // Créer un burger personnalisé
  const customBurger: Burger = {
    id: Date.now(), // ID temporaire basé sur le timestamp
    name: finalName,
    description: `Burger personnalisé avec: ${burgerIngredients.value.map((i) => i.name).join(', ')}`,
    price: totalPrice.value,
    img: '/burger.png', // Image par défaut
    ingredients: burgerIngredients.value.map((i) => i.name),
  }

  // Ajouter au panier
  cartStore.addItem({
    burger: customBurger,
    quantity: 1,
  })
  closeBuilder()
}

// Émissions pour fermer le builder
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
        <!-- Zone de construction du burger (gauche) -->
        <div class="lg:w-1/2 p-6 flex flex-col">
          <div class="mb-4">
            <input
              v-model="burgerName"
              placeholder="Nom de votre burger..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <!-- Visualisation du burger -->
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

            <!-- Stack d'ingrédients -->
            <div class="flex flex-col items-center space-y-1 mb-6 min-h-[200px] justify-end">
              <!-- Message si aucun ingrédient -->
              <div v-if="!burgerIngredients.length" class="text-gray-400 text-center mb-8">
                <div class="text-6xl mb-2">🍞</div>
                <p>Cliquez sur les ingrédients<br />pour construire votre burger</p>
              </div>

              <!-- Ingrédients empilés du bas vers le haut -->
              <div
                v-for="(ingredient, index) in burgerIngredients"
                :key="`${ingredient.id}-${index}`"
                @click="removeIngredient(index)"
                class="w-32 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200 border border-gray-300 shadow-sm relative"
                :style="{ backgroundColor: ingredient.color }"
                :title="`Cliquer pour retirer ${ingredient.name}`"
              >
                {{ ingredient.name }}
                <!-- Petit indicateur d'ordre -->
                <span class="absolute -left-6 text-xs text-gray-400 font-normal">
                  {{ burgerIngredients.length - index }}
                </span>
              </div>
            </div>

            <!-- Prix et actions -->
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

        <!-- Palette d'ingrédients (droite) -->
        <div class="lg:w-1/2 p-6 bg-gray-100 overflow-y-auto">
          <h3 class="text-lg font-semibold mb-4">Ingrédients Disponibles</h3>

          <!-- Pains -->
          <div class="mb-6">
            <h4 class="font-medium mb-2 text-yellow-700 flex items-center justify-between">
              <span>🍞 Pains</span>
              <span
                v-if="ingredientCount.bun > 0"
                class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
              >
                {{ ingredientCount.bun }}
              </span>
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

          <!-- Viandes -->
          <div class="mb-6">
            <h4 class="font-medium mb-2 text-red-700 flex items-center justify-between">
              <span>🥩 Viandes</span>
              <span
                v-if="ingredientCount.meat > 0"
                class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
              >
                {{ ingredientCount.meat }}
              </span>
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

          <!-- Fromages -->
          <div class="mb-6">
            <h4 class="font-medium mb-2 text-orange-700 flex items-center justify-between">
              <span>🧀 Fromages</span>
              <span
                v-if="ingredientCount.cheese > 0"
                class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs"
              >
                {{ ingredientCount.cheese }}
              </span>
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

          <!-- Légumes -->
          <div class="mb-6">
            <h4 class="font-medium mb-2 text-green-700 flex items-center justify-between">
              <span>🥬 Légumes</span>
              <span
                v-if="ingredientCount.vegetable > 0"
                class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
              >
                {{ ingredientCount.vegetable }}
              </span>
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

          <!-- Sauces -->
          <div class="mb-6">
            <h4 class="font-medium mb-2 text-red-700 flex items-center justify-between">
              <span>🍯 Sauces</span>
              <span
                v-if="ingredientCount.sauce > 0"
                class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
              >
                {{ ingredientCount.sauce }}
              </span>
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
