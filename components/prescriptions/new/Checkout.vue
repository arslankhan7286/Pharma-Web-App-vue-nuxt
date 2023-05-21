<i18n lang="json5">
{
  en: {
    '1': 'BACK',
    '2': 'Pay',
    '16': 'Area',
    '17': 'Block',
    '18': 'Avenue',
    '19': 'House/building',
    '20': 'Floor',
    '21': 'Apartment',
    '22': 'Street',
    '23': 'Additional directions',
  },
  ar: {
    '1': 'عودة',
    '2': 'دفع',
    '16': 'منطقة',
    '17': 'قطعة',
    '18': 'جادة',
    '19': 'منزل/بناية',
    '20': 'الدور',
    '21': 'شقة',
    '22': 'شارع',
    '23': 'معلومات اضافية',
  },
}
</i18n>
<template>
  <div class="flex-grow-1 d-flex flex-column">
    <v-row class="my-2" justify="center">
      <v-col cols="12" md="8" class="px-0 px-md-3">
        <BillingAddress ref="billingAddress" />

        <!-- It will be enable in future -->
        <!-- <ShippingMethod /> -->

        <!-- It will be enable in future -->
        <!-- <ShippingAddress /> -->

        <!-- It will be enable in future -->
        <!-- <PaymentMethod /> -->
      </v-col>
      <v-col cols="12" md="4" class="px-0 px-md-3">
        <div class="sticky-sidebar">
          <OrderReview />

          <!-- It will be enable in future -->
          <!-- <DiscountCode /> -->

          <BillingSummary />
          <PaymentMethodSelector @onSelectPaymentMode="onPayment" :validate-block="validateBlock" :validate-form="validateForm"/>
        </div>
      </v-col>
    </v-row>

    <!-- Navigation Buttons -->
    <v-row class="pb-4 ma-0 flex-grow-1" justify="center" justify-md="space-between" align="end">
      <v-col cols="4" md="6" lg="4" xl="2" v-if="getPath !== 'pv2-id'">
        <v-btn
          block
          outlined
          :large="$vuetify.breakpoint.mdAndUp"
          class="rounded-lg font-weight-bold"
          color="#0E6998"
          @click="goToPreviousStep"
        >
          {{ $t('1') }}
        </v-btn>
      </v-col>

      <v-col cols="8" md="6" lg="4">
        <!-- <v-btn @click="checkData">CHECK DATA</v-btn> -->
        <!-- <v-btn
          depressed
          block
          class="rounded-lg font-weight-bold"
          color="primary"
          :large="$vuetify.breakpoint.mdAndUp"
          @click="onPayment('cash')"
        >
          {{ $t('3') }}
        </v-btn>
        <v-btn
          depressed
          block
          class="rounded-lg font-weight-bold"
          color="primary"
          :large="$vuetify.breakpoint.mdAndUp"
          @click="onPayment('knet')"
        >
          {{ $t('4') }}
        </v-btn> -->
        <!-- <v-btn
          depressed
          block
          class="rounded-lg font-weight-bold"
          color="primary"
          :large="$vuetify.breakpoint.mdAndUp"
          @click="onPayment"
        >
          {{ $t('2') }}
        </v-btn> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import ShippingMethod from '~/components/prescriptions/new/checkout/ShippingMethod.vue';
// import ShippingAddress from '~/components/prescriptions/new/checkout/ShippingAddress.vue';
// import DiscountCode from '~/components/prescriptions/new/checkout/DiscountCode.vue';
// import PaymentMethod from '~/components/prescriptions/new/checkout/PaymentMethod.vue';
// import uniqueId from 'lodash/uniqueId';
import PaymentMethodSelector from '~/components/prescriptions/new/checkout/PaymentMethodSelector.vue';
import BillingAddress from '~/components/prescriptions/new/checkout/BillingAddress.vue';
import OrderReview from '~/components/prescriptions/new/checkout/OrderReview.vue';
import BillingSummary from '~/components/prescriptions/new/checkout/BillingSummary.vue';

export default {
  // computed: {
  //   orderId() {
  //     return
  //   },
  // },
  components: {
    OrderReview,
    BillingSummary,
    BillingAddress,
    PaymentMethodSelector,
    // PaymentMethod,
    // ShippingAddress,
    // ShippingMethod,
    // DiscountCode,
  },
  data: () => ({
    selectedCashOption: 'cash',
    getPath: null,
    passedIsPickup: '',
  }),
  created() {
    if(this.$route.query && this.$route.query.is_pickup) {
      this.passedIsPickup = this.$route.query.is_pickup
    }
  },
  mounted() {
    this.getPath = this.$route.name;
  },
  computed: {
    option() {
      return this.$store.state.prescription.option;
    },
    deliveryCharges() {
      return this.$store.state.prescription.checkout.billing.deliveryCharges;
    },
    expert() {
      return this.$store.state.prescription.expert;
    },
  },
  methods: {
    // validateBlock when check terms & conditions
    validateBlock() {
      const isValid = this.$refs.billingAddress.validateBlock();
      if (!isValid) {
        return;
      };
    },

    validateForm() {
      const isValid = this.$refs.billingAddress.validateInputs();
      return isValid;
    },

    async onPayment(paymentType) {
      // run form validations
      const isValid = this.$refs.billingAddress.otherFields();
      if (!isValid) return;

      await this.redirectToPayment(paymentType);
    },
    goToPreviousStep() {
      this.$store.commit('prescription/goToPreviousStep');
    },
    async redirectToPayment(paymentType) {
      try {
        // show loading
        this.$nextTick(this.$nuxt.$loading.start);

        // sending user info
        const billing = this.$store.state.prescription.checkout.billing;

        const userId = this.$store.state.prescription.user.id;
        let userAddress = null;
        if (this.option !== 'pickup') {
          userAddress = {
            type: 'billing',
            area: billing.city,
            block: billing.block,
            street: billing.streetAddress,
            avenue: billing.avenue,
            building: billing.house,
            floor: billing.floor,
            apartment: billing.apartment,
            additional_direction: billing.directions,
          };
        }
        const response = await this.$http.$patch(
          `/users/${userId}/`,
          {
            email: billing.emailAddress,
            first_name: billing.firstName,
            last_name: billing.lastName,
            // phone: billing.phone,
            contact_phone: billing.phone,
            user_address: userAddress,
          },
          {
            headers: {
              hash: process.env.HASH,
            },
          },
        );
        this.$store.commit('prescription/checkout/billing/updateContact', response.contact_phone)
        this.$store.commit('prescription/changePaymentMethod', paymentType);
        const inventory = this.$store.state.prescription.selectedOption;
        // const user = this.$store.state.prescription.user;
        // const userAddress = user.user_address[0];
        // Extract prescription id from url params
        // const orderId = this.$route.params.id;

        const orderId = this.$store.state.prescription.orderId;
        const pickupLocation = this.$store.state.prescription.pickupLocation;
        const option = this.$store.state.prescription.option;
        if (paymentType === 'cash') {
          const response = await this.$http.$post(
            '/paymentsystems/cash/',
            {
              inventory_ids: inventory?.available_products.map(p => p.inventory.id),
              order_id: Number(orderId),
              amount: inventory.total_price + ((this.option !== 'pickup' && this.passedIsPickup !== '1') ? this.deliveryCharges : 0),
              pickup_location: option === 'pickup' ? pickupLocation?.id : this.passedIsPickup === '1' ? 1 : null,
            },
            {
              headers: {
                hash: process.env.HASH,
              },
            },
          );
          console.log(response);
          this.$store.commit('prescription/checkout/billing/updatePurchaseId', response.id)
          let locationDetail = {};
          if (pickupLocation && option === 'pickup') {
            const locationAddress =
              this.$t('16') + //  area start
              ' ' +
              pickupLocation.area + // area end
              ' , ' +
              this.$t('17') + // block start
              ' ' +
              pickupLocation.block + // block end
              ' , ' +
              this.$t('22') + //  street start
              ' ' +
              pickupLocation.street + //  street end
              ' , ' +
              (pickupLocation.avenue ? this.$t('18') : '') + //  avenue start
              ' ' +
              (pickupLocation.avenue || '') + // avenue end
              (pickupLocation.avenue ? ' , ' : '') +
              this.$t('19') + //  house/building start
              ' ' +
              pickupLocation.building + // house/building end
              ' , ' +
              this.$t('20') +
              ' ' +
              pickupLocation.floor +
              ' , ' +
              this.$t('21') +
              ' ' +
              pickupLocation.apartment;
            locationDetail = {
              name: pickupLocation.name,
              address: locationAddress,
              phone: pickupLocation.phone,
              email: pickupLocation.email,
              pickupLocation: pickupLocation.map_location,
            };
          }

          let address = `${this.$t('16')} ${billing.city}, ${this.$t('17')} ${billing.block}, ${this.$t('22')} ${billing.streetAddress}`;
          if (billing.avenue) {
            address += `, ${this.$t('18')} ${billing.avenue}`;
          }

          if (billing.house) {
            address += `, ${this.$t('19')} ${billing.house}`;
          }

          if (billing.floor) {
            address += `, ${this.$t('20')} ${billing.floor}`;
          }

          if (billing.apartment) {
            address += `, ${this.$t('21')} ${billing.apartment}`;
          }

          const customer = {
            name: billing.firstName + ' ' + billing.lastName,
            email: billing.emailAddress,
            phone: billing.phone,
            directions: billing.directions,
            address,
          };

          const invoice = {
            id: this.$store.state.prescription.orderId,
            remark: '',
            location: locationDetail,
            customer,
            // customer: {
            //   name: billing.firstName + ' ' + billing.lastName,
            //   email: billing.emailAddress,
            //   phone: billing.phone,
            //   directions: billing.directions,
            //   address:
            //     this.$t('16') + //  area start
            //     ' ' +
            //     billing.city + // area end
            //     ' , ' +
            //     this.$t('17') + // block start
            //     ' ' +
            //     billing.block + // block end
            //     ' , ' +
            //     this.$t('22') + //  street start
            //     ' ' +
            //     billing.streetAddress + //  street end
            //     ' , ' +
            //     (billing.avenue ? this.$t('18') : '') + //  avenue start
            //     ' ' +
            //     (billing.avenue || '') + // avenue end
            //     (billing.avenue ? ' , ' : '') +
            //     this.$t('19') + //  house/building start
            //     ' ' +
            //     billing.house + // house/building end
            //     ' , ' +
            //     this.$t('20') +
            //     ' ' +
            //     billing.floor +
            //     ' , ' +
            //     this.$t('21') +
            //     ' ' +
            //     billing.apartment,

            //   // address: `${billing.apartment},${this.$t('20')} ${billing.floor} , ${billing.house} , ${billing.streetAddress} ,${billing.avenue} , ${billing.block} , ${billing.city}`,
            //   // ${user.user_address[0].area}, ${user.user_address[0].block}, ${user.user_address[0].avenue} ,${user.user_address[0].street}, ${user.user_address[0].floor} , ${user.user_address[0].apartment}
            // },
            expert: {
              name: `${this.expert.first_name} ${this.expert.last_name}`,
              job: this.expert.job,
              organization: this.expert.location.org_name,
            },
            products: inventory?.available_products.map(item => ({
              id: item.product.id,
              name: item.product.name,
              code: item.product.code,
              price: item.per_product_cost,
              quantity: item.quantity,
              description: item.product.description,
              price_per_unit: item.price,
              inventory: item.inventory.name,
            })),
            total_price: inventory?.total_price,
            created_at: new Date(),
          };
          this.$store.commit('prescription/updateInvoice', invoice);
          this.$store.commit('prescription/goToNextStep', 4);
        } else {
          // Sending data to server to get payment url
          const response = await this.$http.$post(
            '/paymentsystems/purchase/',
            {
              inventory_ids: inventory?.available_products.map(p => p.inventory.id),
              order_id: Number(orderId),
              amount: inventory.total_price + (this.option !== 'pickup' ? this.deliveryCharges : 0),
              redirect_url: window.location.href,
              pickup_location: option === 'pickup' ? pickupLocation?.id : null,
            },
            {
              headers: {
                hash: process.env.HASH,
              },
            },
          );

          // validating response status to be INITIATED
          if (!response.status || response.status !== 'INITIATED' || !response.url) {
            return this.$store.commit('showGlobalSnackbar', {
              text: 'Error to creating payment gateway',
              timeout: 10000,
              action: this.onPayment,
            });
          }

          // redirect user to payment gateway
          window.location.href = response.url;
        }

        // stop showing loading
        this.$nextTick(this.$nuxt.$loading.finish);
      } catch (error) {
        this.$nextTick(this.$nuxt.$loading.finish);
        this.$store.commit('showGlobalSnackbar', {
          text: JSON.stringify(error),
          timeout: 10000,
          action: this.onPayment,
        });
      }
    },
  },
};
</script>
<style scoped>
.sticky-sidebar {
  position: sticky;
  top: 0;
}
</style>
