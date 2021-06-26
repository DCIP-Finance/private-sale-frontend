<template>
  <div class="bg-gray-900 flex flex-col justify-between min-h-screen">
    <div id="background">
      <Nuxt />
    </div>
    <section class="bg-gray-800">
      <div class="px-4 md:px-0 container m-auto py-4">
        <p class="text-gray-600 text-center pb-4 w-full">
          © 2021 Decentralized Community Investment Protocol
        </p>
        <a
          target="_blank"
          href="https://dcip.finance"
          class="underline text-gray-600 text-center w-full block"
          >Visit dcip.finance</a
        >
      </div>
    </section>
  </div>
</template>

<style>
html {
  font-family: 'Poppins', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

#background {
  background: url('~assets/ellipses.png');

  background-repeat: no-repeat;
  background-position: -2% -100%;
  background-size: 50%;
}
</style>
