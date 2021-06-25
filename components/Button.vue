<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href ? '_blank' : undefined"
    :disabled="disabled"
    class="
      flex
      items-center
      justify-between
      font-mono
      text-gray-900
      rounded-lg
      px-4
      py-2
      top-px
    "
    :class="[
      {
        'bg-gray-100': type === 'white',
        'hover:bg-gray-200': type === 'white' && !disabled,

        'bg-gradient-to-r from-green-400 to-yellow-400': type === 'gradient',
        'hover:from-green-300 hover:to-yellow-300':
          type === 'gradient' && !disabled,
      },
      { 'opacity-60 cursor-not-allowed': disabled },
    ]"
    @click="onClick"
  >
    <slot />
    <span class="ml-4 w-5">
      <slot name="icon" />
    </span>
  </component>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'white',
    },
    full: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(_, { emit }) {
    const onClick = ($event) => {
      emit('click', $event)
    }
    return {
      onClick,
    }
  },
})
</script>
