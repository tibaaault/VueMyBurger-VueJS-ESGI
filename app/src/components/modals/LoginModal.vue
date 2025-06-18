<script setup lang="ts">
  import { ref, watch } from 'vue'

  import BaseModal from './BaseModal.vue'
  import { useUserStore } from '@/stores/user'

  defineProps<{ open: boolean }>()
  const emit = defineEmits(['update:open'])

  const userStore = useUserStore()
  const name = ref(userStore.userName)

  function submitName() {
      const userNameTrim = name.value.trim()
      if (userNameTrim) {
          userStore.setUsername(userNameTrim)
          emit('update:open', false)
      }
  }
</script>

<template>
  <BaseModal :open="open" @update:open="emit('update:open', $event)">
    <h2 class="text-xl font-semibold mb-4">Bienvenue !</h2>
    <p class="mb-4 text-sm text-gray-600">Quel est votre pseudo ?</p>
      <input
        v-model="name"
        type="text"
        class="border rounded px-3 py-2 w-full mb-4"
        placeholder="Entrez votre prénom"
      />

      <div class="flex justify-center items-center">
        <button
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          @click="submitName"
        >
          Valider
        </button>
      </div>
  </BaseModal>
</template>



