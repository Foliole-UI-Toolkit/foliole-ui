<script lang="ts" setup>
import { computed, ref, withDefaults } from 'vue'
import classNames from 'classnames'
const emit = defineEmits(['backdrop', 'close', 'drawer', 'touchstart', 'touchend', 'keypress'])

export interface DrawerProps {
  isOpen?: boolean
  isClosingDrawer?: boolean
  drawerClasses?: string
  drawerBackdropClasses?: string
  labelledby?: string
  describedby?: string
}

const props = withDefaults(defineProps<DrawerProps>(), {
  isOpen: false,
  isClosingDrawer: false,
  drawerClasses: 'f0l_drawer f0l_drawer-opts f0l_drawer-left',
  drawerBackdropClasses: 'f0l__drawer-backdrop f0l_drawer-backdrop-opts f0l_drawer-left',
  labelledby: '',
  describedby: '',
})

// const isClosingDrawerRef = ref<boolean>(props.isClosingDrawer)

const elemBackdrop = ref<HTMLElement | null>(null)
const elemDrawer = ref<HTMLElement | null>(null)

const openedDrawerClass = computed(() => classNames([props.isOpen && 'f0l_opened']))

const mergedDrawerBackdropClasses = computed(() =>
  classNames([props.drawerBackdropClasses, openedDrawerClass.value, props.isClosingDrawer && 'f0l_closing']),
)

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
  <div
    ref="elemBackdrop"
    :class="mergedDrawerBackdropClasses"
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
</template>
