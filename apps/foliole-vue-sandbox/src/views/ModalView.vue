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
      @cancel="show = false"
      @confirm="success"
      :show="show"
      :title="'confirm'"
      :type="'confirm'"
      >SUP</FolioleModal
    >
  </div>
  <button @click="show = true" class="btn btn-pill variant-ghost-primary">Show Modal</button>
</template>
