<template>
    <!-- Prescription Page -->
    <div class="page">
      <GlobalLoading ref="loading" />
      <v-container v-if="isValid" class="d-flex flex-grow-1">
        <keep-alive>
          <Details v-if="step === 1" :key="1" />
          <Options v-if="step === 2" :key="2" />
          <Checkout v-if="step === 3" :key="3" />
          <Invoice v-if="step === 4" :key="4" />
          <UnsuccessfulTransaction v-if="step === 5" :key="5" />
        </keep-alive>
      </v-container>
    </div>
  </template>

  <script>
  import Details from '~/components/prescriptions/new/Details.vue';
  import Options from '~/components/prescriptions/new/Options.vue';
  import Checkout from '~/components/prescriptions/new/Checkout.vue';
  import Invoice from '~/components/prescriptions/new/Invoice.vue';
  import GlobalLoading from '~/components/layout/GlobalLoading.vue';
  import UnsuccessfulTransaction from '~/components/prescriptions/new/UnsuccessfulTransaction.vue';

  export default {
    components: {
      GlobalLoading,
      Details,
      Options,
      Checkout,
      Invoice,
      UnsuccessfulTransaction,
    },

    data: () => ({
      isValid: false,
    }),
    head() {
      return {
        title: 'Erxa | Prescription',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Checkout Page',
          },
          {
            name: 'robots',
            content: 'noindex',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes',
          },
        ],
      };
    },
    computed: {
      step() {
        return this.$store.state.prescription.step;
      },
    },
    async mounted() {
      this.$i18n.locale = 'ar';
      this.$vuetify.rtl = true;
      // this.$i18n.defaultLocale = 'ar';
      const query = this.$route.query;
      if (query && query.tap_id) await this.verifyPayment();
      else this.checkPaymentStatus();

      // //  Commented our for refreshing page
      // setTimeout(() => {
      //   // window.location.reload(true);
      //   this.$router.go();
      // }, 10000);

      //   or use setInterval instead of setTimeout
    },
    methods: {
      showDetailspage() {
        // showing prescription details page
        this.$store.commit('prescription/goToNextStep', 1);
        console.log(this.PAYMENT_STATUS);
      },
      async verifyPayment() {
        // show loading
        this.$refs.loading.start();
        try {
          // check the payment status
          const query = this.$route.query;

          const response = await this.$http.$get(`/paymentsystems/purchase/status/${query.tap_id}/`, {
            headers: {
              hash: process.env.HASH,
            },
          });

          //  update Payment Type for displaying in Invoice
          this.$store.commit('prescription/updatePaymentType', response.source.payment_method);
          // update invoice state
          this.$store.commit('prescription/updateInvoice', response.invoice);
          // update delivery/pickup option
          this.$store.commit('prescription/changeOption', response.invoice.option);
          // update pickup location
          this.$store.commit('prescription/changePickupLocation', response.invoice.pickup_location);

          this.isValid = true;
          if (response.success) {
            // showing invoice page
            this.$store.commit('prescription/goToNextStep', 4);
          } else {
            // showing unsuccessful page
            this.$store.commit('prescription/goToNextStep', 5);
          }
        } catch (error) {
          // stop loading and show error
          this.$nuxt.context.error(error);
        }
        // stop showing loading
        this.$refs.loading.finish();
      },
      async checkPaymentStatus() {
        // TODO: implement new endpoint

        this.$refs.loading.start();
        try {
          // show loading

          // check the payment status
          const id = this.$route.params.id;

          const order = await this.$http.$get(`/orders/order-purchased/?order_uuid=${id}`, {
            headers: {
              hash: process.env.HASH,
            },
          });
          if (order && order.results.length > 0 && order.results[0].status === 'approved') {
            this.$router.push('/pv2/paid-prescription');
          } else {
            this.isValid = true;
            this.showDetailspage();
          }
        } catch (error) {
          this.$nuxt.context.error(error);
        }
        // stop loading and show error
        this.$refs.loading.finish();
      },
    },
  };
  </script>