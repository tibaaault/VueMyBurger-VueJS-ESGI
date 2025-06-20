<script setup lang="ts">
    import { ref } from 'vue'
    import BaseModal from '../ui/BaseModal.vue'
    import { useRouter } from 'vue-router'

    defineProps<{ open: boolean }>()
    const emit = defineEmits(['update:open'])

    const router = useRouter()

    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const error = ref<string | null>(null)
    const loading = ref(false)

    const validateForm = () => {
      if (!email.value || !email.value.includes('@')) {
        error.value = 'Adresse email invalide.'
        return false
      }
      if (!username.value) {
        error.value = 'Le nom d\'utilisateur est requis.'
        return false
      }
      if (password.value.length < 6) {
        error.value = 'Le mot de passe doit contenir au moins 6 caractères.'
        return false
      }
      if (password.value !== confirmPassword.value) {
        error.value = 'Les mots de passe ne correspondent pas.'
        return false
      }
      error.value = null
      return true
    }

    const handleRegister = async () => {
      if (!validateForm()) return

      loading.value = true

      try {
        await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
          })
        }).then(res => res.json())

        emit('update:open', false)
      } catch (err: any) {
        error.value = err?.response?.data?.message || "Une erreur est survenue."
      } finally {
        loading.value = false
      }
    }
</script>

<template>
  <BaseModal :open="open" @update:open="emit('update:open', $event)">
    <h2 class="text-xl font-semibold mb-4">Créer un compte</h2>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <input
        v-model="username"
        type="text"
        placeholder="Nom d'utilisateur"
        class="w-full border rounded px-3 py-2"
        required
      />
      <input
        v-model="email"
        type="email"
        placeholder="Adresse email"
        class="w-full border rounded px-3 py-2"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="w-full border rounded px-3 py-2"
        required
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirmer le mot de passe"
        class="w-full border rounded px-3 py-2"
        required
      />

      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

      <div class="flex justify-center">
        <button
          type="submit"
          :disabled="loading"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          {{ loading ? 'Inscription...' : 'Créer le compte' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>
