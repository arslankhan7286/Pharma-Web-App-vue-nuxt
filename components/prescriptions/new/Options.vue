<i18n lang="json5">
{
  en: {
    '1': 'Please select the desired method',
    // '2': 'Select Partner',
    '3': 'Next',
    '4': 'BACK',
  },
  ar: {
    '1': 'الرجاء اختيار الوسيلة المناسبة',
    '2': 'حدد الشريك',
    '3': 'التالي',
    '4': 'عودة',
  },
}
</i18n>

<template>
  <div class="flex-grow-1 d-flex flex-column">
    <h1 class="px-2 my-4 text-h6 text-md-h4 font-weight-bold">{{ $t('1') }}</h1>

    <!-- <h3 class="text-body-1 text-md-h6">{{ $t('2') }}</h3> -->

    <PartnerList v-if="options.length && selectedOption" :options="options" />

    <!-- Navigation Buttons -->
    <v-row class="pb-4 ma-0 flex-grow-1" justify="center" justify-md="space-between" align="end">
      <v-col cols="4" md="6" lg="4" xl="2">
        <v-btn
          block
          outlined
          :large="$vuetify.breakpoint.mdAndUp"
          class="rounded-lg font-weight-bold"
          color="#0E6998"
          @click="goToPreviousStep"
        >
          {{ $t('4') }}
        </v-btn>
      </v-col>

      <v-col cols="8" md="6" lg="4" xl="2">
        <v-btn
          depressed
          :disabled="!selectedOption || !(option === 'delivery' ? option : option && pickupLocation)"
          block
          class="rounded-lg font-weight-bold next-btn"
          color="#0E6998"
          :large="$vuetify.breakpoint.mdAndUp"
          @click="goToNextStep"
        >
          {{ $t('3') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PartnerList from '~/components/prescriptions/new/options/PartnerList.vue';

export default {
  components: {
    PartnerList,
  },
  data: () => ({
    options: ['delivery', 'pickup'],
  }),
  computed: {
    selectedOption() {
      return this.$store.state.prescription.selectedOption;
    },
    option() {
      return this.$store.state.prescription.option;
    },
    pickupLocation() {
      return this.$store.state.prescription.pickupLocation;
    },
  },
  async mounted() {
    // show loading
    this.$nextTick(this.$nuxt.$loading.start);

    try {
      // Extract prescription id from url params
      const id = this.$route.params.id;

      // Get options array from server
      const response = await this.$http.$get(`/inventory/order-prod-price/?uuid=${id}`, {
        headers: {
          hash: process.env.HASH,
        },
      });
      // this.options = response.length ? [response[0]] : [];
      this.$store.commit('prescription/changeSelectedOption', response);

      // stop showing loading
      this.$nextTick(this.$nuxt.$loading.finish);
    } catch (error) {
      // stop showing loading
      this.$nextTick(this.$nuxt.$loading.finish);

      this.$nuxt.context.error(error);
    }
  },
  methods: {
    goToNextStep() {
      this.$store.commit('prescription/goToNextStep');
    },
    goToPreviousStep() {
      this.$store.commit('prescription/goToPreviousStep');
    },
  },
};
</script>
<style scoped>
.next-btn {
  color: #fff;
}
</style>
