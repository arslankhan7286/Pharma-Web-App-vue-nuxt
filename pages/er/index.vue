<template>
    <div class="page">
      <v-container class="h100 flex-grow-1 d-flex flex-column align-center justify-center">
        <Header />
        <Input />
        <OrderList />
        <Assistance />
      </v-container>
    </div>
  </template>
  
  <script>
  import Header from '~/components/prescriptions/search/header.vue';
  import Input from '~/components/prescriptions/search/Input.vue';
  import OrderList from '~/components/prescriptions/search/OrderList.vue';
  import Assistance from '~/components/prescriptions/search/Assistance.vue';
  export default {
    components: { Header, Input, OrderList, Assistance },
    middleware: 'isAuth',
    head() {
      return {
        title: 'Erxa | Search For Prescriptions',
      };
    },
  };
  </script>
  <style scoped>
  .container {
    position: relative;
  }
  </style>
  