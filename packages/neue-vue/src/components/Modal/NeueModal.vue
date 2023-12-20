<script setup lang="ts">
import { ref, withDefaults } from 'vue'

const emit = defineEmits(['cancel', 'confirm', 'submit', 'backdrop', 'update:modelValue'])

export interface ModalBaseProps {
  show?: boolean
  type: string
  title: string
  modalBackdropClasses?: string
  modalContentClasses?: string
  modalFooterClasses?: string
  modelValue?: string
  btnColors?: string
  textCancel?: string
  textConfirm?: string
  textSubmit?: string
}

const props = withDefaults(defineProps<ModalBaseProps>(), {
  show: false,
  modalBackdropClasses: 'modal-backdrop modal-backdrop-options',
  modalContentClasses: 'modal',
  modalfooterClasses: 'modal-footer',
  modelValue: '',
  textCancel: 'Cancel',
  textConfirm: 'Confirm',
  textSubmit: 'Submit',
})

const modelValueRef = ref(props.modelValue)

let registeredInteractionWithBackdrop = false

function handleBackdropInteractionBegin(event: MouseEvent): void {
  if (!(event.target instanceof Element)) return
  const classList = (event.target as Element).classList
  // modal-transitions to be implimented later.
  if (classList.contains('modal-backdrop')) {
    registeredInteractionWithBackdrop = true
  }
}
function handleBackdropInteractionEnd(event: MouseEvent): void {
  if (!(event.target instanceof Element)) return
  const classList = (event.target as Element).classList
  if (classList.contains('modal-backdrop') && registeredInteractionWithBackdrop) {
    emit('backdrop', event)
  }
  registeredInteractionWithBackdrop = false
}

function handlePromptSubmit(): void {
  emit('submit', modelValueRef.value)
}
</script>
<template>
  <Teleport to="body">
    <div
      v-show="show"
      @mousedown="handleBackdropInteractionBegin"
      @mouseup="handleBackdropInteractionEnd"
      :class="modalBackdropClasses"
    >
      <div :class="modalContentClasses" data-testid="modal" role="dialog" aria-modal="true" aria-label="title ?? ''">
        <header v-if="!$slots['header'] && title">
          {{ title }}
        </header>
        <header v-if="$slots['header']">
          <slot name="header"></slot>
        </header>
        <div>
          <slot></slot>
        </div>
        <footer class="modal-footer" v-if="type === 'alert'">
          <button type="button" class="btn btn-neutral" @click="$emit('cancel', $event)">
            {{ textCancel }}
          </button>
        </footer>
        <footer class="modal-footer" v-else-if="type === 'confirm'">
          <button type="button" class="btn btn-neutral" @click="$emit('cancel', $event)">
            {{ textCancel }}
          </button>
          <button type="button" class="btn btn-positive" @click="$emit('confirm', $event)">
            {{ textConfirm }}
          </button>
        </footer>
        <form v-else-if="type === 'prompt'" @submit.prevent="handlePromptSubmit">
          <input v-model="modelValueRef" class="input" name="prompt" type="text" />
          <footer class="modal-footer">
            <button type="button" class="btn btn-neutral" @click="$emit('cancel', $event)">
              {{ textCancel }}
            </button>
            <button type="submit" class="btn btn-positive">
              {{ textSubmit }}
            </button>
          </footer>
        </form>
        <div v-if="$slots['footer']">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<!-- default usage -> pass in title. pass in type. pass in a slot -->
<!-- custom usage: simplest way -> pass in NO type. content -->
<!-- custom usage ->  pass in NO type. however you can compose it further by passing header slot, footer slot, etc-->
