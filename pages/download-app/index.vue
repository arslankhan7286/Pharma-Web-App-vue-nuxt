<template>
  <div class="height">
    <v-container class="d-flex flex-column align-center justify-center mt">
      <div class="logo">
        <img src="https://erxa-files.s3.amazonaws.com/assets/erxa_two.svg" alt="">
      </div>
      <h1>Erxa Now Available on</h1>
      <div class="download-app">
        <v-btn
        large
        depressed
        color="#b42c2c"
        class="ma-5 white--text"
        href="https://apps.apple.com/in/app/erxa-expert/id1576109528"
        >
        <v-icon>{{ mdiApple }}</v-icon>
        <p><span>Download on the</span><br>App Store</p>
        </v-btn>
        <v-btn
          large
          depressed
          color="#30bc8f"
          class="ma-5 white--text"
          href="https://erxa-files.s3.amazonaws.com/erxa-expert.apk"
          ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="36px" height="36px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd">
            <g><path style="opacity:0.852" fill="#7bb242" d="M 11.5,3.5 C 13.4649,4.129 15.4649,4.79566 17.5,5.5C 19.1349,5.12229 20.6349,4.45563 22,3.5C 22.5389,5.71296 23.7055,8.0463 25.5,10.5C 20.1667,11.8333 14.8333,11.8333 9.5,10.5C 10.1279,8.74186 11.1279,7.24186 12.5,6C 11.7476,5.32924 11.4142,4.4959 11.5,3.5 Z"/></g>
            <g><path style="opacity:0.924" fill="#7cb242" d="M 5.5,12.5 C 6.5,12.5 7.5,12.5 8.5,12.5C 8.5,16.1667 8.5,19.8333 8.5,23.5C 7.5,23.5 6.5,23.5 5.5,23.5C 5.5,19.8333 5.5,16.1667 5.5,12.5 Z"/></g>
            <g><path style="opacity:0.854" fill="#7bb441" d="M 9.5,12.5 C 14.8333,12.5 20.1667,12.5 25.5,12.5C 25.6657,16.8461 25.499,21.1794 25,25.5C 22.9838,26.9552 22.1505,28.9552 22.5,31.5C 21.1667,31.5 19.8333,31.5 18.5,31.5C 17.8333,24.8333 17.1667,24.8333 16.5,31.5C 15.1667,31.5 13.8333,31.5 12.5,31.5C 12.8495,28.9552 12.0162,26.9552 10,25.5C 9.50098,21.1794 9.33432,16.8461 9.5,12.5 Z"/></g>
            <g><path style="opacity:0.924" fill="#7cb242" d="M 26.5,12.5 C 27.5,12.5 28.5,12.5 29.5,12.5C 29.5,16.1667 29.5,19.8333 29.5,23.5C 28.5,23.5 27.5,23.5 26.5,23.5C 26.5,19.8333 26.5,16.1667 26.5,12.5 Z"/></g>
            </svg>
          
          <p><span>Download</span><br>Android App</p>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
  import { mdiApple } from '@mdi/js';

  export default {
    head() {
      return { title: 'Erxa | Download App' };
    },
    data: () => ({
      mdiApple
    }),
    methods: {
      download() {

      },
    },
  };
</script>


<style scoped >
.height .container {
  height: 100vh;
}
.logo {
  width: 200px;
  margin: 0 auto;
}
.logo img {
  width: 100%;
  height: auto;
}
.height h1 {
  color: #0E6998;
}
.v-btn {
  background-color: transparent !important;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  color: #000 !important;
}
.v-btn p {
  margin: 0;
  color: #000;
  font-weight: 700;
  font-size: 12px;
  margin-left: 5px;
}
.v-btn p span {
  font-weight: 100;
  color: #8d8a8a;
}
.v-btn .v-icon svg {
  width: 34px;
  height: 34px;
}
.mt {
  margin-top: 30px;
}
  @media only screen and (max-width: 768px) {
    .height{
      height: 88vh!important;
    }
  }
  @media(max-width: 450px) {
    .download-app {
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }
    .download-app a {
      width: 264px !important;
    }
  }
</style>
