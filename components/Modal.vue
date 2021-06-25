<template>
  <div
    class="
      fixed
      left-0
      top-0
      bg-gray-700 bg-opacity-60
      md:bg-opacity-40
      w-screen
      h-screen
      flex
      justify-center
      items-center
    "
    @click="onClose"
  >
    <div
      class="
        py-8
        md:py-16
        px-8
        md:px-32
        bg-gray-900
        rounded-t-lg
        flex flex-col
        items-center
        shadow-2xl
      "
    >
      <img
        src="~/assets/thanks.png"
        alt="Thank you check mark"
        class="w-24 mb-4 md:mb-8"
      />

      <h2
        class="
          text-green-400 text-2xl
          md:text-3xl
          font-bold
          text-center
          mb-4
          md:mb-8
        "
      >
        Congratulations!
      </h2>

      <p class="text-white text-lg text-center mb-4 md:mb-8">
        Congratulations and thank you for your support in DCIP.
      </p>

      <Button type="white" :center-text="true" @click="onClose"
        >CLOSE
        <template #icon
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            /></svg></template
      ></Button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  emits: ['close'],
  setup(_, { emit }) {
    const onClose = ($event) => {
      emit('close', $event)
    }
    return {
      onClose,
    }
  },
})
</script>
