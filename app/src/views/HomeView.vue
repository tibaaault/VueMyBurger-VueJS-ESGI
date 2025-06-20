<script setup lang="ts">
import About from '@/components/main/About.vue'
import Contact from '@/components/main/Contact.vue'
import Menu from '@/components/main/Menu.vue'
import CreateBurger from '@/components/main/CreateBurger.vue'
import Navbar from '@/components/header/Navbar.vue'
import Hero from '@/components/header/Hero.vue'

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <Hero />

    <!-- Menu Section -->
    <Menu />
    <CreateBurger />
    <About />
    <Contact />




  </div>
</template>
