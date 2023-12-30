<script setup lang="ts">
import FolioleModal from 'foliole-vue/src/components/Modal/FolioleModal.vue'
import { ref } from 'vue'

const show = ref(false)

function success() {
  show.value = false
  alert('success')
}
</script>
<template>
  <div>
    <FolioleModal
      :show="show"
      :title="'confirm'"
      :type="'confirm'"
      @cancel="show = false"
      @confirm="success"
      >SUP</FolioleModal
    >
  </div>
  <button @click="show = true" class="btn btn-pill variant-ghost-primary">Show Modal</button>
</template>
