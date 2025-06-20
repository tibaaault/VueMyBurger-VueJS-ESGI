<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  message: string
  autoClose?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoClose: 5000,
})

const visible = ref(true)

const close = () => {
  visible.value = false
}

onMounted(() => {
  if (props.autoClose > 0) {
    setTimeout(() => {
      close()
    }, props.autoClose)
  }
})
</script>

<template>
  <div class="fixed top-4 right-4 z-50">
    <div
      v-if="visible"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg max-w-sm"
      role="alert"
    >
      <div class="flex items-center">
        <span class="text-xl mr-2">⚠️</span>
        <div>
          <strong class="font-bold">Erreur !</strong>
          <span class="block sm:inline ml-1">{{ message }}</span>
        </div>
        <button @click="close" class="ml-4 text-red-700 hover:text-red-900">✕</button>
      </div>
    </div>
  </div>
</template>
