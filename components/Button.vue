<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href ? '_blank' : undefined"
    class="
      mb-4
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
      type === 'white'
        ? 'bg-gray-100 hover:bg-gray-200'
        : 'bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-300 hover:to-yellow-300',
      { 'w-full': full },
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
