<script setup lang="ts">
import NeueModal from '@neue/neue-vue/src/components/Modal/NeueModal.vue'
import { ref } from 'vue'

const show = ref(false)

function success() {
  show.value = false
  alert('success')
}
</script>
<template>
  <div>
    <NeueModal
      @cancel="show = false"
      @confirm="success"
      :show="show"
      :title="'confirm'"
      :type="'confirm'"
      >SUP</NeueModal
    >
  </div>
  <button @click="show = true" class="btn btn-pill variant-ghost-primary">Show Modal</button>
</template>
