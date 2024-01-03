<script lang="ts" setup>
import { ref, withDefaults } from 'vue'

const emit = defineEmits(['backdrop', 'close', 'drawer', 'touchstart', 'touchend', 'keypress'])

export interface DrawerProps {
  show?: boolean
  drawerClasses?: string
  drawerBackdropClasses?: string
  labelledby?: string
  describedby?: string
}

withDefaults(defineProps<DrawerProps>(), {
  show: false,
  drawerClasses: 'drawer drawer-options drawer-left',
  drawerBackdropClasses: 'drawer-backdrop drawer-backdrop-options',
  labelledby: '',
  describedby: '',
})

const elemBackdrop = ref<HTMLElement | null>(null)
const elemDrawer = ref<HTMLElement | null>(null)

function onDrawerInteraction(event: MouseEvent): void {
  if (event.target === elemBackdrop.value) {
    emit('close')
    emit('backdrop', event)
  } else {
    emit('drawer', event)
  }
}
</script>
<template>
  <Teleport to="body">
    <div
      v-show="show"
      ref="elemBackdrop"
      :class="drawerBackdropClasses"
      data-testid="drawer-backdrop"
      @mousedown="onDrawerInteraction"
      @touchstart="$emit('touchstart', $event)"
      @touchend="$emit('touchend', $event)"
      @keypress="$emit('keypress', $event)"
    >
      <div
        ref="elemDrawer"
        :class="drawerClasses"
        data-testid="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="labelledby"
        aria-describedby="describedby"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
