<template>
  <div class="px-4 md:px-0 container m-auto py-4">
    <section class="mb-12">
      <img src="~/assets/logo.png" alt="DCIP Logo" class="max-h-6" />
    </section>

    <section class="mb-8">
      <div
        class="bg-green-400 bg-opacity-20 text-green-400 p-1 rounded w-min mb-3"
      >
        <p class="font-semibold text-lg">$DCIP</p>
      </div>
      <h1 class="text-white text-3xl font-bold">
        Whitelisted for the <span class="text-green-400">private sale?</span>
      </h1>
    </section>

    <section class="mb-4">
      <div class="bg-gray-800 rounded-lg p-4">
        <div class="flex">
          <div class="w-1/6 flex justify-center items-center">
            <div class="rounded-full bg-gray-700">
              <img src="~/assets/icon.png" alt="DCIP Icon" class="p-2" />
            </div>
          </div>
          <div class="ml-3 w-5/6">
            <p class="text-gray-600">$DCIP</p>
            <p class="text-white font-bold text-lg">750 000 000 000</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <div class="bg-gray-800 rounded-lg px-4 py-6">
        <div class="mb-6">
          <h2 class="text-white text-2xl font-bold">3h 24m</h2>
          <p class="text-gray-700 font-bold">Until Sale Ends</p>
        </div>

        <button
          class="
            bg-gradient-to-r
            from-green-400
            to-yellow-400
            font-mono
            text-gray-900
            rounded-lg
            hover:from-green-300 hover:to-yellow-300
            pl-4
            pr-2
            py-2
            flex
            top-px
          "
        >
          DEPOSIT
          <span class="ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>

    <section class="mb-8">
      <p class="text-white text-xl mb-2 font-bold">Private Sale Hardcap</p>
      <div class="h-3 bg-gray-800 rounded-full mb-2">
        <div style="width: 34%" class="bg-green-400 rounded-full h-full"></div>
      </div>
      <div class="flex">
        <div class="text-gray-700 text-lg mr-2">
          <p>DCIP</p>
          <p>BNB</p>
        </div>
        <div class="text-white font-bold text-lg">
          <p>187500000000000</p>
          <p>250</p>
        </div>
      </div>
    </section>

    <section>
      <button
        class="
          bg-gradient-to-r
          from-green-400
          to-yellow-400
          font-mono
          text-gray-900
          rounded-lg
          hover:from-green-300 hover:to-yellow-300
          pl-4
          pr-2
          py-2
          flex
          top-px
        "
      >
        AUDIT REPORT
        <span class="ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
            />
          </svg>
        </span>
      </button>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
// import Web3 from 'web3'
// import Web3Modal from 'web3modal'

export default defineComponent({
  setup() {
    return {}
    // let web3
    // // let provider
    // const connected = ref(false)
    // const isConnecting = ref(false)
    // const connectWallet = async () => {
    //   isConnecting.value = true
    //   // web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
    //   if (process.browser) {
    //     const accounts = await window.ethereum.request({
    //       method: 'eth_requestAccounts',
    //     })
    //   }
    // }
    // connectWallet()
    // return {
    //   connectWallet,
    //   web3,
    //   connected,
    //   isConnecting,
    // }
  },
})
</script>
