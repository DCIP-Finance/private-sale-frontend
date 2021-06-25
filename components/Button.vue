<template>
  <div class="container m-auto my-4">
    <button
      class="
        h-10
        px-5
        text-indigo-100
        transition-colors
        duration-150
        bg-indigo-700
        rounded-full
        focus:shadow-outline
        hover:bg-indigo-800
      "
      @click="connectWallet"
    >
      {{ connected ? 'Connected' : 'Connect Wallet' }}
      {{ web3.isConnected().toString() }}
    </button>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

export default defineComponent({
  setup() {
    let web3
    let provider

    const connected = ref(false)

    const connectWallet = async () => {
      const web3Modal = new Web3Modal({
        network: 'testnet',
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              rpc: {
                1: 'https://bsc-dataseed.binance.org/',
                2: 'https://bsc-dataseed1.defibit.io/',
                3: 'https://bsc-dataseed1.ninicoin.io/',
              },
            },
          },
        },
      })

      web3Modal.clearCachedProvider()

      provider = await web3Modal.connect()

      web3 = new Web3(provider)

      // Subscribe to accounts change
      provider.on('accountsChanged', (accounts) => {
        console.log(accounts)
      })

      // Subscribe to chainId change
      provider.on('chainChanged', (chainId) => {
        console.log(chainId)
      })

      // Subscribe to provider connection
      provider.on('connect', (info) => {
        console.log(info)
      })

      // Subscribe to provider disconnection
      provider.on('disconnect', (error) => {
        console.log(error)
      })

      connected.value = true
    }

    return {
      connectWallet,
      web3,
      connected,
    }
  },
})
</script>
