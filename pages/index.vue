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
                750 000 000 000
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg px-4 md:px-6 py-6 mb-12">
          <div class="mb-6">
            <h2 class="text-white text-2xl md:text-3xl font-bold">3h 24m</h2>
            <p class="text-gray-600 md:text-xl">Until Sale Ends</p>
          </div>

          <Button type="gradient" icon="" @click="onConnect"
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
        </div>
        <p class="text-white text-xl mb-2 font-bold">Private Sale Hardcap</p>
        <div class="h-3 bg-gray-800 rounded-full mb-2">
          <div
            style="width: 34%"
            class="bg-green-400 rounded-full h-full"
          ></div>
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
import { defineComponent, ref } from '@nuxtjs/composition-api'

import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

export default defineComponent({
  setup() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            56: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
          },
          network: 'binance',
          chainId: 56,
        },
      },
    }

    const connected = ref(false)

    let web3
    let provider
    let web3Modal

    const onAccountChanged = () => {}
    const onChainChanged = () => {}
    const onConnected = () => {}
    const onDisconnected = () => {
      connected.value = false
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
        connected.value = true
      } catch (error) {
        console.error('Something went wrong')
      }
    }

    const getSaleEndTimestamp = async () => {
      const abi = [
        {
          inputs: [
            { internalType: 'contract IDCIP', name: '_token', type: 'address' },
            { internalType: 'uint256', name: '_rate', type: 'uint256' },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'Deposited',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'Withdrawn',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'address payable',
              name: '_address',
              type: 'address',
            },
          ],
          name: 'addWhiteList',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'deposit',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'deposits',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: '_address', type: 'address' },
          ],
          name: 'getCalculatedAmount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getDepositAmount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getLeftTimeAmount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'hardCapEthAmount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'maximumDepositEthAmount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'minimumDepositEthAmount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'presaleEndTimestamp',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'presaleStartTimestamp',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'rate',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'releaseFunds',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address payable',
              name: '_address',
              type: 'address',
            },
          ],
          name: 'removeWhiteList',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'token',
          outputs: [
            { internalType: 'contract IDCIP', name: '', type: 'address' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalDepositedEthBalance',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'newOwner', type: 'address' },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'unlocked',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'whitelist',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'withdraw',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
          ],
          name: 'withdrawRewards',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'withdraws',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        { stateMutability: 'payable', type: 'receive' },
      ]

      const _web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')

      const contract = new _web3.eth.Contract(
        abi,
        '0x5dafcb3701a22cde4aa830c9f8e5027145df1ec3'
      )

      const res = await contract.methods.presaleEndTimestamp().call()

      console.log(res)

      // contractInstance.presaleEndTimestamp.call({}, (err, data) =>
      //   console.log(err, data)
    }

    getSaleEndTimestamp()

    return {
      onConnect,
      getSaleEndTimestamp,
      connected,
      web3,
    }
  },
})
</script>
