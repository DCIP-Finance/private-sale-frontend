<template>
  <div class="px-4 md:px-0 container m-auto pt-4 md:mt-8">
    <Modal
      class="transition"
      :class="modalVisible ? 'opacity-100 visible' : 'opacity-0 invisible'"
      :title="modalTitle"
      :description="modalDescription"
      @close="modalVisible = false"
    />

    <div class="md:px-12">
      <section class="mb-12 md:mb-24">
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
          <h1
            class="text-white text-3xl md:text-5xl font-bold leading-normal"
            v-html="title"
          />

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
                    :class="{ 'opacity-60': saleEnded() }"
                  />
                </div>
              </div>
              <div class="ml-3 w-5/6">
                <p class="text-gray-600 md:text-xl">Locked Balance</p>
                <p
                  :class="saleEnded() ? 'text-gray-600' : 'text-white'"
                  class="text-white font-bold text-lg md:text-2xl"
                >
                  {{ userBalanceFormatted }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-4 mb-4">
            <div class="flex">
              <div class="flex justify-center items-center">
                <div class="rounded-full bg-gray-700">
                  <img
                    src="~/assets/icon.png"
                    alt="DCIP Icon"
                    class="p-2 max-h-12"
                    :class="{ 'opacity-60': !saleEnded() }"
                  />
                </div>
              </div>
              <div class="ml-3 w-5/6">
                <p class="text-gray-600 md:text-xl">Claimable Balance</p>
                <p
                  class="font-bold text-lg md:text-2xl"
                  :class="
                    saleEnded()
                      ? availableUserBalance > 0
                        ? 'text-green-400'
                        : 'text-white'
                      : 'text-gray-600'
                  "
                >
                  {{ availableUserBalanceFormatted }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg px-4 md:px-6 py-6 mb-12">
            <div class="mb-6">
              <h2 class="text-white text-2xl md:text-3xl font-bold">
                {{ timerEndFormatted }}
              </h2>
              <p class="text-gray-600 md:text-xl">
                {{ saleEnded() ? 'Until Next Unlock' : 'Until Sale Ends' }}
              </p>
            </div>

            <Button
              v-if="!connected"
              type="gradient"
              :loading="connectLoading"
              @click="connect"
              >CONNECT WALLET<template #icon
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

            <div v-if="connected && !saleEnded()" class="flex">
              <div
                :class="{
                  'opacity-60':
                    !whitelisted || depositLoading || hardCapReached,
                }"
                class="flex items-center bg-gray-700 mr-4 rounded-lg"
              >
                <input
                  v-model="depositValue"
                  :disabled="!whitelisted || depositLoading || hardCapReached"
                  type="number"
                  :min="minDeposit"
                  :max="maxDeposit"
                  class="bg-gray-700 text-white rounded px-4 h-full"
                />
                <p class="text-white font-bold pr-4">BNB</p>
              </div>

              <Button
                type="gradient"
                :loading="depositLoading"
                :disabled="!whitelisted || depositLoading"
                @click="deposit"
                >DEPOSIT<template #icon
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

            <Button
              v-if="connected && saleEnded()"
              type="gradient"
              :loading="withdrawLoading"
              :disabled="availableUserBalance <= 0 || withdrawLoading"
              @click="withdraw"
              >CLAIM FUNDS<template #icon
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

            <p
              v-if="connected && hardCapReached && !saleEnded()"
              class="text-white mt-4"
            >
              Thanks for your amazing support! The hardcap has been reached and
              the sale has ended.
            </p>

            <p v-else-if="connected && !whitelisted" class="text-white mt-4">
              Sorry, this sale is only for whitelisted accounts.
            </p>

            <p v-if="errorMessage" class="mt-4 text-red-400 overflow-ellipsis">
              {{ errorMessageFormatted }}
            </p>
          </div>
          <p class="text-white text-xl mb-2 font-bold">Current Sale Hardcap</p>
          <div class="h-3 bg-gray-800 rounded-full mb-2">
            <div
              :style="`width: ${percentHardcap()}%; min-width: 10px`"
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
import abiJson from '@/abis/abis.json'

export default defineComponent({
  setup() {
    const chainRPC = process.env.chainRPC // 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    const walletAddress = process.env.walletAddress // '0x17aab1e0745240ed1f4140f6fdd54485db8f6ec0'
    const useWhitelist = process.env.useWhitelist // false
    const title = process.env.title
      .replace('[', '<span class="text-green-400">')
      .replace(']', '</span>') // 'Are you whitelisted for [the presale?]'

    const abi = abiJson[process.env.abi]

    let web3 = new Web3(chainRPC)
    let provider
    let web3Modal

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

    const rewards = Array.from(process.env.rewards)
      .map((item) => parseInt(item))
      .sort() // [1624996020]

    const hardcap = ref(web3.utils.toBN(0))
    const conversion = ref(0)
    const connected = ref(false)
    const whitelisted = ref(false)
    const saleEnd = ref(0)
    const userBalance = ref(-1)
    const availableUserBalance = ref(-1)
    const dcipBalance = ref(web3.utils.toBN(-1))
    const bnbBalance = ref(web3.utils.toBN(-1))
    const currentWalletAddress = ref(null)
    const depositValue = ref(1)
    const depositLoading = ref(false)
    const withdrawLoading = ref(false)
    const connectLoading = ref(false)
    const modalVisible = ref(false)
    const minDeposit = ref(process.env.minDeposit)
    const maxDeposit = ref(process.env.maxDeposit)

    const modalTitle = ref('')
    const modalDescription = ref('')

    const errorMessage = ref('')

    const timerEndFormatted = ref('00h 00m 00s')

    const errorMessageFormatted = computed(
      () => errorMessage.value.split(': {')[0]
    )

    const saleEnded = () => {
      return saleEnd.value - new Date().getTime() / 1000 <= 0
    }

    const userBalanceFormatted = computed(() =>
      formatDCIPBalance(userBalance.value)
    )

    const availableUserBalanceFormatted = computed(() =>
      formatDCIPBalance(availableUserBalance.value)
    )

    const dcipBalanceFormatted = computed(() => {
      return formatDCIPBalance(dcipBalance.value)
    })

    const bnbBalanceFormatted = computed(() =>
      formatBNBBalance(bnbBalance.value)
    )

    const hardCapReached = computed(() => bnbBalance.value >= hardcap.value)

    const percentHardcap = () => {
      return (bnbBalance.value / hardcap.value) * 100
    }

    const contract = new web3.eth.Contract(abi, walletAddress)

    const onAccountChanged = () => {
      setupAccount()
    }
    const onDisconnected = () => {
      connected.value = false
    }

    const connect = async () => {
      errorMessage.value = ''
      connectLoading.value = true

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
        connectLoading.value = false
      }
    }

    const deposit = async () => {
      errorMessage.value = ''
      depositLoading.value = true

      try {
        const abi = await contract.methods.deposit().encodeABI()

        await web3.eth.sendTransaction({
          from: currentWalletAddress.value,
          to: walletAddress,
          value: web3.utils.toWei(depositValue.value.toString()),
          data: abi,
        })

        getBalances()
        getModalValues('deposit')

        modalVisible.value = true
      } catch (error) {
        errorMessage.value = error.message
      } finally {
        depositLoading.value = false
      }
    }

    const withdraw = async () => {
      errorMessage.value = ''
      withdrawLoading.value = true

      try {
        const abi = await contract.methods.withdraw().encodeABI()

        await web3.eth.sendTransaction({
          from: currentWalletAddress.value,
          to: walletAddress,
          data: abi,
        })

        getBalances()
        getModalValues('withdraw')

        modalVisible.value = true
      } catch (error) {
        errorMessage.value = error.message
      } finally {
        withdrawLoading.value = false
      }
    }

    const setupAccount = async () => {
      connected.value = false

      const accounts = await web3.eth.getAccounts()

      if (accounts.length) {
        currentWalletAddress.value = accounts[0]
        getBalances()
      }

      await getIsWhitelisted()

      connected.value = true
    }

    const getHardcap = async () => {
      try {
        const res = await contract.methods.hardCapEthAmount().call()
        hardcap.value = web3.utils.toBN(res)
      } catch (error) {
        console.error(error)
      }
    }

    const getConversionRate = async () => {
      try {
        const res = await contract.methods.rate().call()
        conversion.value = res
      } catch (error) {
        console.error(error)
      }
    }

    const getDCIPBalance = async () => {
      try {
        const res = await contract.methods.totalDepositedEthBalance().call()
        dcipBalance.value = convertBNBTokensToDCIPTokens(res)
        bnbBalance.value = web3.utils.toBN(res)
      } catch (error) {
        console.error(error)
      }
    }

    const getSaleEndTimestamp = async () => {
      try {
        const res = await contract.methods.presaleEndTimestamp().call()
        saleEnd.value = Number(res)

        computeSaleEndFormatted()
      } catch (error) {
        console.error(error)
      }
    }

    const getUserBalance = async () => {
      try {
        const td = await contract.methods
          .deposits(currentWalletAddress.value)
          .call()

        const totalWithdraw = await contract.methods
          .withdraws(currentWalletAddress.value)
          .call()

        userBalance.value = convertBNBTokensToDCIPTokens(td) - totalWithdraw
      } catch (error) {
        console.error(error)
      }
    }

    const getCalculatedAmount = async (address) => {
      const deposits = convertBNBTokensToDCIPTokens(
        await contract.methods.deposits(address).call()
      )

      const withdraws = web3.utils.toBN(
        await contract.methods.withdraws(address).call()
      )

      const now = new Date().getTime() / 1000

      for (let i = 0; i < rewards.length; i++) {
        if (
          now > rewards[i] &&
          withdraws.eq(deposits.divn(rewards.length).muln(i))
        ) {
          return deposits.divn(rewards.length)
        }
      }
      return 0
    }

    const getAvailableUserBalance = async () => {
      try {
        // Apparently we can't use the contracts getCalculatedAmount because msg.Sender is not set correctly.
        availableUserBalance.value = await getCalculatedAmount(
          currentWalletAddress.value
        )
      } catch (error) {
        console.error(error)
      }
    }

    const getIsWhitelisted = async () => {
      if (!useWhitelist) {
        whitelisted.value = true
        return
      }

      try {
        const res = await contract.methods
          .whitelist(currentWalletAddress.value)
          .call()

        whitelisted.value = res
      } catch (error) {
        console.error(error)
      }
    }

    const getBalances = async () => {
      await getAvailableUserBalance()
      getUserBalance()
      getDCIPBalance()
    }

    const convertBNBTokensToDCIPTokens = (bnbWei) => {
      return web3.utils.toBN(bnbWei).mul(web3.utils.toBN(conversion.value))
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

      const value = Math.round(balance / 1000000000).toString()

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

    const formatTimeLeft = (timeLeft) => {
      const date = new Date(timeLeft * 1000)

      const days = Math.floor(date / 8.64e7)

      const dateISO = date.toISOString()

      return `${days}d ${dateISO.substr(11, 2)}h ${dateISO.substr(
        14,
        2
      )}m ${dateISO.substr(17, 2)}s`
    }

    const computeEndTimeFormat = () => {
      if (saleEnded()) {
        computeNextRewardFormatted()
      } else {
        computeSaleEndFormatted()
      }
    }

    const computeNextRewardFormatted = () => {
      const now = new Date().getTime() / 1000

      const nextReward = rewards.reduce(
        (i, reward) => (reward > now && reward < i ? reward : i),
        Number.MAX_VALUE // januari 1st 2030
      )

      const timeLeft =
        nextReward === Number.MAX_VALUE ? 0 : Math.max(nextReward - now, 0)

      timerEndFormatted.value = formatTimeLeft(timeLeft)
    }

    const computeSaleEndFormatted = () => {
      const timeLeft = Math.max(saleEnd.value - new Date().getTime() / 1000, 0)
      timerEndFormatted.value = formatTimeLeft(timeLeft)
    }

    const getModalValues = (action = 'deposit') => {
      if (action === 'deposit') {
        modalTitle.value = process.env.modalTitleDeposit
        modalDescription.value = process.env.modalDescriptionDeposit
      } else if (action === 'withdraw') {
        modalTitle.value = process.env.modalTitleWithdraw
        modalDescription.value = process.env.modalDescriptionWithdraw
      }
    }

    getHardcap()
    getConversionRate()
    getDCIPBalance()
    getSaleEndTimestamp()

    setInterval(computeEndTimeFormat, 1000)

    return {
      connect,
      deposit,
      withdraw,
      getSaleEndTimestamp,
      getUserBalance,
      connected,
      whitelisted,
      saleEnd,
      timerEndFormatted,
      userBalance,
      userBalanceFormatted,
      availableUserBalance,
      availableUserBalanceFormatted,
      dcipBalanceFormatted,
      bnbBalanceFormatted,
      percentHardcap,
      depositValue,
      depositLoading,
      connectLoading,
      withdrawLoading,
      modalVisible,
      web3,
      saleEnded,
      errorMessage,
      errorMessageFormatted,
      hardCapReached,
      title,
      modalTitle,
      modalDescription,
      minDeposit,
      maxDeposit,
    }
  },
})
</script>
