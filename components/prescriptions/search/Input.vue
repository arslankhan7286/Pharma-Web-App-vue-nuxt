<i18n lang="json5">
{
  en: {
    '2': 'This field is required',
    '3': 'Mobile Number is Invalid.',
    '5': 'Mobile Number',
  },
  ar: {
    '2': 'هذه الخانة مطلوبه',
    '3': 'رقم الهاتف المحمول غير صالح.',
    '5': 'رقم  الهاتف النقال',
  },
}
</i18n>

<template>
  <v-row class="w100 my-2 flex-grow-0" justify="center" align="start">
    <v-col cols="auto" sm="6" md="4" lg="3">
      <v-text-field ref="mobileNumber" v-model="mobileNumber" class="rounded-lg" :dense="$vuetify.breakpoint.mobile"
        outlined :rules="[requiredRule, phoneRule]" clearable color="#30BC8F" :label="$t('5')"
        @update:error="onInputError">
        <template #message="{ message }">{{ $t(message) }}</template>
      </v-text-field>
    </v-col>

    <v-col class="px-0 go-btn" cols="auto" sm="auto">
      <v-btn color="#30BC8F" :x-large="!$vuetify.breakpoint.mobile" :disabled="disableSubmit" class="rounded-lg"
        :loading="showLoading" @click="onSubmit">
        <v-icon v-if="$vuetify.rtl"> {{ mdiArrowLeft }} </v-icon>
        <v-icon v-else> {{ mdiArrowRight }} </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mdiCellphoneBasic, mdiArrowRight, mdiArrowLeft } from '@mdi/js';

export default {
  data: () => ({
    mdiCellphoneBasic,
    mdiArrowRight,
    mdiArrowLeft,
    disableSubmit: true,
    showLoading: false,
  }),
  computed: {
    mobileNumber: {
      get() {
        return this.$store.state.prescription.search.mobileNumber;
      },
      set(value) {
        this.$store.commit('prescription/search/updateMobileNumber', value);
      },
    },
    orders: {
      get() {
        return this.$store.state.prescription.search.orders;
      },
      set(value) {
        this.$store.commit('prescription/search/updateOrders', value);
      },
    },
  },
  methods: {
    async onSubmit() {
      // show loading
      this.showLoading = true;
      // reset orders
      this.orders = [];

      try {
        // Get related prescriptions to phone number
        const response = await this.$http.$get(`/orders/?phone=${this.mobileNumber}&paid=0`, {
          headers: {
            hash: process.env.HASH,
          },
        });

        // show error message if order is not exist
        if (!response?.results?.length) {
          // Show error message
          this.$store.commit('showGlobalSnackbar', {
            text: 'try again or check mobile number.',
            color: 'error',
            actionText: 'try again',
            timeout: 6000,
            action: this.onSubmit,
          });
        }

        // if only one order exists, redirect to it
        if (response?.results?.length === 1) {
          this.$router.push(`/p/${response?.results[0].uuid}`);
        }

        // show list of sorted orders
        this.orders = response?.results?.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
      } catch (error) {
        // Show error message
        this.$store.commit('showGlobalSnackbar', {
          text: 'server side error!',
          color: 'error',
          actionText: 'try again',
          timeout: 6000,
          action: this.onSubmit,
        });
      }

      // stop showing loading
      this.showLoading = false;
    },
    onInputError(error) {
      this.disableSubmit = error;
    },
    requiredRule(value) {
      return !!value || '2';
    },
    phoneRule(value) {
      const pattern = /([0-9]{8})$/;
      return pattern.test(value) || '3';
    },
  },
};
</script>

<style>
.go-btn button {
  color: #fff !important;
}
</style>
