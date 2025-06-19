<script setup lang="ts">
    import { ref } from 'vue'
    import BaseModal from './BaseModal.vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user'

    defineProps<{ open: boolean }>()
    const emit = defineEmits(['update:open'])

    const router = useRouter()
    const userStore = useUserStore()

    // Champs du formulaire
    const email = ref('')
    const password = ref('')
    const error = ref<string | null>(null)
    const loading = ref(false)

    const validateForm = () => {
        if (!email.value || !email.value.includes('@')) {
            error.value = 'Adresse email invalide.'
            return false
        }
        if (!password.value) {
            return false
        }

        error.value = null
        return true
    }

    const handleLogin = async () => {
        if (!validateForm()) return

        loading.value = true

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email: email.value,
                password: password.value
            })

            userStore.setUser(response.data.user)
            userStore.setToken(response.data.token)
            
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
        <h2 class="text-xl font-semibold mb-4">Connexion</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
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

            <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

            <div class="flex justify-center">
                <button
                    type="submit"
                    :disabled="loading"
                    class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    {{ loading ? 'Connexion...' : 'Se connecter' }}
                </button>
            </div>
        </form>
    </BaseModal>
</template>
