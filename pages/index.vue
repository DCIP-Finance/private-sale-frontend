<template>
  <div class="px-4 md:px-0 container m-auto pt-4 md:mt-8">
    <Modal
      class="transition"
      :class="modalVisible ? 'opacity-100 visible' : 'opacity-0 invisible'"
      @close="modalVisible = false"
    />

    <div class="md:px-12">
      <section class="mb-12 md:mb-32">
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
          <h1 class="text-white text-3xl md:text-5xl font-bold leading-snug">
            Whitelisted for the
            <span class="text-green-400">private sale?</span>
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

            <div class="flex">
              <div
                v-if="connected"
                :class="{
                  'opacity-60':
                    !whitelisted ||
                    depositLoading ||
                    (connected && saleEnded) ||
                    (connected && hardCapReached),
                }"
                class="flex items-center bg-gray-700 mr-4 rounded-lg"
              >
                <input
                  v-model="depositValue"
                  :disabled="
                    !whitelisted ||
                    depositLoading ||
                    (connected && saleEnded) ||
                    (connected && hardCapReached)
                  "
                  type="number"
                  min="1"
                  max="50"
                  class="bg-gray-700 text-white rounded px-4 h-full"
                />
                <p class="text-white font-bold pr-4">BNB</p>
              </div>

              <Button
                type="gradient"
                :loading="depositLoading"
                :disabled="
                  (connected && !whitelisted) ||
                  depositLoading ||
                  (connected && saleEnded) ||
                  (connected && saleEnded)
                "
                @click="connectOrDeposit"
                >{{ connected ? 'DEPOSIT' : 'CONNECT WALLET'
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
            </div>

            <p v-if="connected && hardCapReached" class="text-white mt-4">
              Thanks for your amazing support! The hardcap has been reached and
              the sale has ended.
            </p>
            <p v-else-if="connected && !whitelisted" class="text-white mt-4">
              Sorry, this sale is only for whitelisted accounts.
            </p>

            <p v-if="saleEnded" class="text-white mt-4">The sale had ended.</p>

            <p v-if="errorMessage" class="mt-4 text-red-400 overflow-ellipsis">
              {{ errorMessageFormatted }}
            </p>
          </div>
          <p class="text-white text-xl mb-2 font-bold">Private Sale Hardcap</p>
          <div class="h-3 bg-gray-800 rounded-full mb-2">
            <div
              :style="`width: ${percentHardcap}%; min-width: 10px`"
              class="bg-green-400 rounded-full h-full transition-all"
            ></div>
          </div>
          <div class="flex">
            <div class="text-gray-600 text-lg mr-2">
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
          <Button href="/audit_report.pdf" :full="true" class="mb-4"
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
    const chainRPC = 'https://bsc-dataseed.binance.org/'
    const walletAddress = '0xaac36a40a132472772c2bc410fcc275cc1b1df04'

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
    const depositValue = ref(1)
    const depositLoading = ref(false)
    const modalVisible = ref(false)

    const errorMessage = ref('')

    const saleEndFormatted = ref('00h 00m 00s')

    const errorMessageFormatted = computed(
      () => errorMessage.value.split(': {')[0]
    )

    const saleEnded = computed(() => {
      return saleEnd.value - new Date().getTime() / 1000 <= 0
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

    const hardCapReached = computed(
      () => dcipBalance.value >= 250000000000000000000
    )

    const percentHardcap = computed(
      () => (dcipBalance.value / 250000000000000000000) * 100
    )

    let web3 = new Web3(chainRPC)
    let provider
    let web3Modal

    const contract = new web3.eth.Contract(privateSaleABI, walletAddress)

    const onAccountChanged = () => {
      setupAccount()
    }
    const onDisconnected = () => {
      connected.value = false
    }

    const connectOrDeposit = () => {
      errorMessage.value = ''

      if (!connected.value) {
        onConnect()
      } else {
        onDeposit()
      }
    }

    const onConnect = async () => {
      depositLoading.value = true

      web3Modal = new Web3Modal({
        network: 'binance',
        cacheProvider: false,
        providerOptions,
        theme: {
          background: '#2B2B2B',
          main: '#767676',
          secondary: '#767676',
          border: '#363636',
          hover: '#363636',
        },
      })

      try {
        provider = await web3Modal.connect()
        provider.on('accountsChanged', onAccountChanged)
        provider.on('disconnect', onDisconnected)

        web3 = new Web3(provider)

        await setupAccount()
      } catch (error) {
        errorMessage.value = error.message
      } finally {
        depositLoading.value = false
      }
    }

    const onDeposit = async () => {
      depositLoading.value = true

      try {
        const abi = await contract.methods.deposit().encodeABI()

        await web3.eth.sendTransaction({
          from: currentWalletAddress.value,
          to: walletAddress,
          value: web3.utils.toWei(depositValue.value.toString()),
          data: abi,
        })

        getUserBalance()
        getDCIPBalance()

        modalVisible.value = true
      } catch (error) {
        errorMessage.value = error.message
      } finally {
        depositLoading.value = false
      }
    }

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

        computeSaleEndFormatted()
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

    const chunkSubstr = (str, size) => {
      const numChunks = Math.ceil(str.length / size)
      const chunks = new Array(numChunks)

      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size)
      }

      return chunks
    }

    const formatDCIPBalance = (balance) => {
      if (balance === -1) {
        return '-'
      }

      const value = Math.round((balance * 750) / 1000000000).toString()

      return chunkSubstr(value.split('').reverse().join(''), 3)
        .join(' ')
        .split('')
        .reverse()
        .join('')
    }

    const formatBNBBalance = (balance) => {
      if (balance === -1) {
        return '-'
      }

      return web3.utils.fromWei(balance)
    }

    const computeSaleEndFormatted = () => {
      const timeLeft = Math.max(saleEnd.value - new Date().getTime() / 1000, 0)

      const date = new Date(timeLeft * 1000).toISOString()

      saleEndFormatted.value = `${date.substr(11, 2)}h ${date.substr(
        14,
        2
      )}m ${date.substr(17, 2)}s`
    }

    getSaleEndTimestamp()
    getDCIPBalance()

    setInterval(computeSaleEndFormatted, 1000)

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
      depositValue,
      depositLoading,
      modalVisible,
      web3,
      saleEnded,
      errorMessage,
      errorMessageFormatted,
      hardCapReached,
    }
  },
})
</script>
