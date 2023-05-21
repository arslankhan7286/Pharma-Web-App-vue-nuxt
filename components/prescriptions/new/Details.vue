<i18n lang="json5">
{
  en: {
    '1': 'Prescription details',
    '2': 'ACCEPT',
    '3': 'Reject',
    '4': 'Items',
    '5': 'Add Item',
  },
  ar: {
    '1': 'تفاصيل الوصفة',
    '2': 'قبول',
    '3': 'رفض',
    '4': ' المنتجات',
    '5': 'اضافة المنتجات',
  },
}
</i18n>

<template>
  <div class="flex-grow-1 d-flex flex-column">
    <!-- Prescription Details -->
    <v-row v-if="drugs" class="my-1" justify="space-between">
      <v-col cols="12" class="d-flex justify-space-between align-center flex-wrap">
        <h1 class="text-h6 font-weight-bold">{{ $t('1') }}</h1>
        <span class="text-body-2 grey--text text--darken-2" style="direction: ltr">{{ orderDate }}</span>
      </v-col>

      <v-col cols="12" md="6" xl="4">
        <ExpertCard v-if="expert" :data="expert" />
      </v-col>
      <v-col cols="12" md="6" xl="4">
        <PatientCard v-if="patient" :data="patient" />
      </v-col>

      <v-col cols="12">
        <v-divider class="my-2"></v-divider>
      </v-col>
      <v-col cols="12">
        <h3>{{ $t(4) }}</h3>
      </v-col>

      <v-col v-for="drug of drugs" :key="drug.id" cols="12" md="6" xl="4">
        <div>
          <DrugItemCard v-if="drug" :data="drug" :removeProduct="removeProduct" />
        </div>
      </v-col>
    </v-row>

        <!-- Add Item Buttons -->
        <v-row class="pb-4 ma-0 flex-grow-1" justify="center" justify-md="space-between" align="end">
          <v-col cols="8" md="6" lg="4" xl="2">
            <div v-if="this.getPath === 'er-id'">
              <AddProduct @updateDrugsCard="getPrescriptionDetails()"/>
            </div>
          </v-col>
        </v-row>

    <!-- Buttons -->
    <v-row v-if="this.getPath !== 'pv2-id'" class="pb-4 ma-0 flex-grow-1" justify="center" justify-md="space-between" align="end">
      <v-col cols="4" md="6" lg="4" xl="2">
        <v-btn
          block
          outlined
          :large="$vuetify.breakpoint.mdAndUp"
          class="rounded-lg font-weight-bold"
          color="#0E6998"
          to="/"
        >
          {{ $t('3') }}
        </v-btn>
      </v-col>
      <v-col cols="8" md="6" lg="4" xl="2">
        <v-btn
          depressed
          block
          class="rounded-lg font-weight-bold acceptance"
          color="#0E6998"
          :large="$vuetify.breakpoint.mdAndUp"
          @click="goToNextStep"
        >
          {{ $t('2') }}
        </v-btn>
      </v-col>
    </v-row>
    <div v-if="this.getPath === 'pv2-id'" class="summary-pv2">
      <Checkout />
    </div>
  </div>
</template>

<script>
import { mdiPhoneOutline, mdiAccount, mdiCircleSmall } from '@mdi/js';
import PatientCard from '~/components/prescriptions/new/prescription/PatientCard.vue';
import ExpertCard from '~/components/prescriptions/new/prescription/ExpertCard.vue';
import DrugItemCard from '~/components/prescriptions/new/prescription/DrugItemCard.vue';
import AddProduct from '~/components/prescriptions/new/er/AddProduct.vue'
import Checkout from '~/components/prescriptions/new/Checkout.vue';
export default {
  components: {
    PatientCard,
    ExpertCard,
    DrugItemCard,
    AddProduct,
    Checkout,
  },
  data: () => ({
    mdiPhoneOutline,
    mdiCircleSmall,
    mdiAccount,
    expert: null,
    patient: null,
    drugs: null,
    createdAt: null,
    getPath: null,
  }),
  computed: {
    orderDate() {
      return this.createdAt ? new Date(this.createdAt).toLocaleString() : '';
    },
  },
  async mounted() {
    await this.getPrescriptionDetails();
    this.getPath = this.$route.name;
    if(this.getPath === 'pv2-id'){
      try {
        const id = this.$route.params.id;
        const response = await this.$http.$get(`/inventory/order-prod-price/?uuid=${id}`, {
          headers: {
            hash: process.env.HASH,
          },
        });
        this.$store.commit('prescription/changeSelectedOption', response);
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    goToErrorPage() {
      this.$store.commit('prescription/goToNextStep', 5);
    },
    goToNextStep() {
      this.$store.commit('prescription/goToNextStep');
    },
    async getPrescriptionDetails() {
      // show loading
      this.$nextTick(this.$nuxt.$loading.start);
      try {
        // Extract prescription id from url params
        const id = this.$route.params.id;
        this.$store.commit('prescription/changeOrderUUID', id);

        // Get prescription data from server
        const response = await this.$http.$get(`/orders/${id}/`, {
          headers: {
            hash: process.env.HASH,
          },
        });
        this.expert = response.from_user;
        this.patient = response.to_user;
        this.drugs = response.order_products;
        this.createdAt = response.created_at;

        // update user state
        this.$store.commit('prescription/updateUser', response.to_user);
        // update expert state
        this.$store.commit('prescription/updateExpert', response.from_user);
        // Update order ID
        this.$store.commit('prescription/updateOrderId', response.id);
      } catch (error) {
        // sedn error to error page
        this.$nuxt.context.error(error);
      }
      // stop showing loading
      this.$nextTick(this.$nuxt.$loading.finish);
    },
    async removeProduct(productId) {
      // if (this.drugs.length <= 1) {
      //   this.$toast.info('There is only one product in order');
      //   return;
      // }
      try {
        await this.$http.$delete(`/orders/order-products/${productId}/`, {
          headers: {
            hash: process.env.HASH,
          },
        });
        const index = this.drugs.findIndex(d => d.id === productId);
        if (index > -1) {
          this.drugs.splice(index, 1);
          this.$toast.success('Item removed from prescription successfully');
        }
      } catch (e) {
        this.$toast.error('error deleting product');
      }
    },
  },
};
</script>
<style scoped>
.acceptance {
  color: #fff;
}
</style>
