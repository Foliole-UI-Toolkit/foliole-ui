<script setup lang="ts">
import { ref } from 'vue'

let currentTile = ref('1')
</script>

<template>
  <main class="grid h-screen grid-cols-[100px_1fr]">
    <div class="test">
      <h1 class="text-4xl font-bold text-primary">Foliole Vue: Sandbox</h1>
      <div class="first-line:">
        <section v-if="currentTile === '1'">first section</section>
        <section v-else-if="currentTile === '2'">second section</section>
      </div>
    </div>
  </main>
</template>
