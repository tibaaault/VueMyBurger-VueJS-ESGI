<script setup lang="ts">
    defineProps<{ open: boolean }>()
    const emit = defineEmits(['update:open'])

    const close = () => emit('update:open', false)
</script>

<template>
    <transition name="fade">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                <button @click="close" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">X</button>

                <slot />
            </div>
        </div>
    </transition>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
