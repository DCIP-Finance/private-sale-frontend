<template>
  <div class="px-4 md:px-0 container m-auto py-4">
    <section class="mb-12 md:mb-20">
      <img src="~/assets/logo.png" alt="DCIP Logo" class="max-h-6" />
    </section>

    <section class="mb-12 md:flex justify-between">
      <div class="mb-12 md:w-1/3 flex flex-col justify-center">
        <div
          class="
            bg-green-400 bg-opacity-20
            text-green-400
            px-2
            py-1
            rounded
            w-min
            mb-3
          "
        >
          <p class="font-semibold text-lg">$DCIP</p>
        </div>
        <h1 class="text-white text-3xl md:text-5xl font-bold">
          Whitelisted for the <span class="text-green-400">private sale?</span>
        </h1>

        <div class="hidden md:flex mt-8">
          <Button class="mr-4" href="/audit_report.pdf"
            >AUDIT REPORT<template #icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                /></svg></template
          ></Button>
          <Button href="https://t.me/DCIPfinance"
            >TELEGRAM<template #icon
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14">
                <path
                  d="M132.745003,8.77972275 L146.934402,3.06988253 C147.592976,2.82157296 148.168156,3.23755549 147.954763,4.27687185 L147.95599,4.2755919 L145.53999,16.154773 C145.360936,16.9969777 144.881415,17.2017691 144.210577,16.8049857 L140.53139,13.9750246 L138.756795,15.7592697 C138.560572,15.9640611 138.395008,16.1368538 138.014825,16.1368538 L138.276048,12.2291779 L145.094808,5.80000788 C145.391596,5.52737933 145.028583,5.37378578 144.637363,5.64513439 L136.210797,11.1821819 L132.578213,9.99951153 C131.789641,9.7384025 131.772471,9.17650609 132.745003,8.77972275 Z"
                  transform="translate(-165.000000, -815.000000) translate(16.000000, 801.000000) translate(17.000000, 11.000000)"
                /></svg></template
          ></Button>
        </div>
      </div>

      <div class="mb-12 md:w-1/3">
        <div class="bg-gray-800 rounded-lg p-4 mb-4">
          <div class="flex">
            <div class="flex justify-center items-center">
              <div class="rounded-full bg-gray-700">
                <img
                  src="~/assets/icon.png"
                  alt="DCIP Icon"
                  class="p-2 max-h-12"
                />
              </div>
            </div>
            <div class="ml-3 w-5/6">
              <p class="text-gray-600 md:text-xl">$DCIP</p>
              <p class="text-white font-bold text-lg md:text-2xl">
                {{ userBalanceFormatted }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg px-4 md:px-6 py-6 mb-12">
          <div class="mb-6">
            <h2 class="text-white text-2xl md:text-3xl font-bold">
              {{ saleEndFormatted }}
            </h2>
            <p class="text-gray-600 md:text-xl">Until Sale Ends</p>
          </div>

          <Button
            type="gradient"
            :disabled="connected && !whitelisted"
            @click="connectOrDeposit"
            >{{ connected ? 'Deposit' : 'Connect Wallet'
            }}<template #icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                /></svg></template
          ></Button>

          <p v-if="connected && !whitelisted">
            Sorry, this sale is only for whitelisted accounts
          </p>
        </div>
        <p class="text-white text-xl mb-2 font-bold">Private Sale Hardcap</p>
        <div class="h-3 bg-gray-800 rounded-full mb-2">
          <div
            :style="`width: ${percentHardcap}%; min-width: 16px`"
            class="bg-green-400 rounded-full h-full"
          ></div>
        </div>
        <div class="flex">
          <div class="text-gray-700 text-lg mr-2">
            <p>DCIP</p>
            <p>BNB</p>
          </div>
          <div class="text-white font-bold text-lg">
            <p>{{ dcipBalanceFormatted }}</p>
            <p>{{ bnbBalanceFormatted }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12 md:hidden">
      <div class="w-48">
        <Button href="/audit_report.pdf" :full="true"
          >AUDIT REPORT<template #icon
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              viewBox="0 0 24 24"
            >
              <path
                d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
              /></svg></template
        ></Button>
        <Button href="https://t.me/DCIPfinance" :full="true"
          >TELEGRAM<template #icon
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14">
              <path
                d="M132.745003,8.77972275 L146.934402,3.06988253 C147.592976,2.82157296 148.168156,3.23755549 147.954763,4.27687185 L147.95599,4.2755919 L145.53999,16.154773 C145.360936,16.9969777 144.881415,17.2017691 144.210577,16.8049857 L140.53139,13.9750246 L138.756795,15.7592697 C138.560572,15.9640611 138.395008,16.1368538 138.014825,16.1368538 L138.276048,12.2291779 L145.094808,5.80000788 C145.391596,5.52737933 145.028583,5.37378578 144.637363,5.64513439 L136.210797,11.1821819 L132.578213,9.99951153 C131.789641,9.7384025 131.772471,9.17650609 132.745003,8.77972275 Z"
                transform="translate(-165.000000, -815.000000) translate(16.000000, 801.000000) translate(17.000000, 11.000000)"
              /></svg></template
        ></Button>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import privateSaleABI from '@/abis/private-sale.json'

export default defineComponent({
  setup() {
    const chainRPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            56: chainRPC,
          },
          network: 'binance',
          chainId: 56,
        },
      },
    }

    const connected = ref(false)
    const whitelisted = ref(false)

    const saleEnd = ref(0)
    const userBalance = ref(-1)
    const dcipBalance = ref(-1)
    const currentWalletAddress = ref(null)

    const saleEndFormatted = computed(() => {
      const timeLeft = saleEnd.value - new Date().getTime() / 1000

      return `${Math.round(timeLeft / 3600)}h ${Math.round(
        (timeLeft % 3600) / 60
      )}m`
    })

    const userBalanceFormatted = computed(() =>
      formatDCIPBalance(userBalance.value)
    )

    const dcipBalanceFormatted = computed(() =>
      formatDCIPBalance(dcipBalance.value)
    )

    const bnbBalanceFormatted = computed(() =>
      formatBNBBalance(dcipBalance.value)
    )

    const percentHardcap = computed(
      () => (dcipBalance.value / 250000000000000000000) * 100
    )

    let web3 = new Web3(chainRPC)
    let provider
    let web3Modal

    const contract = new web3.eth.Contract(
      privateSaleABI,
      '0x5dafcb3701a22cde4aa830c9f8e5027145df1ec3'
    )

    const onAccountChanged = (accounts) => {
      setupAccount()
    }
    const onChainChanged = (chainId) => {
      console.log(chainId)
    }
    const onConnected = (chainId, asdf) => {
      console.log(chainId, asdf)
    }
    const onDisconnected = () => {
      connected.value = false
    }

    const connectOrDeposit = () => {
      if (!connected.value) {
        onConnect()
      } else {
        onDeposit()
      }
    }

    const onConnect = async () => {
      web3Modal = new Web3Modal({
        network: 'binance',
        cacheProvider: false,
        providerOptions,
        theme: 'dark',
      })

      try {
        provider = await web3Modal.connect()
        provider.on('accountsChanged', onAccountChanged)
        provider.on('chainChanged', onChainChanged)
        provider.on('connect', onConnected)
        provider.on('disconnect', onDisconnected)

        web3 = new Web3(provider)

        await setupAccount()
      } catch (error) {
        console.error('Something went wrong')
      }
    }

    const onDeposit = () => {}

    const setupAccount = async () => {
      connected.value = false

      const accounts = await web3.eth.getAccounts()

      if (accounts.length) {
        currentWalletAddress.value = accounts[0]
        getUserBalance()
      }

      await getIsWhitelisted()

      connected.value = true
    }

    const getDCIPBalance = async () => {
      try {
        const res = await contract.methods.totalDepositedEthBalance().call()
        dcipBalance.value = res
      } catch (error) {
        console.error(error)
      }
    }

    const getSaleEndTimestamp = async () => {
      try {
        const res = await contract.methods.presaleEndTimestamp().call()
        saleEnd.value = res
      } catch (error) {
        console.error(error)
      }
    }

    const getUserBalance = async () => {
      try {
        const res = await contract.methods
          .deposits(currentWalletAddress.value)
          .call()

        console.log(res)
        userBalance.value = res
      } catch (error) {
        console.error(error)
      }
    }

    const getIsWhitelisted = async () => {
      try {
        const res = await contract.methods
          .whitelist(currentWalletAddress.value)
          .call()

        whitelisted.value = res
      } catch (error) {
        console.error(error)
      }
    }

    const formatDCIPBalance = (balance) => {
      if (balance === -1) {
        return '-'
      }

      const value = Math.round((balance * 750) / 1000000000).toString()

      const newStr = []
      for (let i = value.length - 1; i >= 0; i--) {
        newStr.push(i !== 0 && (i + 1) % 3 === 0 ? value[i] + ' ' : value[i])
      }

      return newStr.reverse().join('')
    }

    const formatBNBBalance = (balance) => {
      if (balance === -1) {
        return '-'
      }

      return balance / 1000000000000000000
    }

    getSaleEndTimestamp()
    getDCIPBalance()

    return {
      connectOrDeposit,
      getSaleEndTimestamp,
      getUserBalance,
      connected,
      whitelisted,
      saleEnd,
      saleEndFormatted,
      userBalance,
      userBalanceFormatted,
      dcipBalanceFormatted,
      bnbBalanceFormatted,
      percentHardcap,
      web3,
    }
  },
})
</script>
