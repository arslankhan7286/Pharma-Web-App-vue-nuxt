<i18n lang="json5">
{
  en: {
    '0': 'Shipping Address',
    '1': 'First Name',
    '2': 'Last Name',
    '3': 'Email Address',
    '4': 'Street Address',
    '5': 'Fetching data was failed.',
    '6': 'State/Province',
    '7': 'City',
    '8': 'Please Select State/Provinde',
    '9': 'Zip/Postal Code',
    '10': 'Phone',
    '11': 'My billing and shipping address are the same.',
    '12': 'Create an account for later use.',
    '13': 'Billing Address',
  },
  ar: {
    '0': 'عنوان الشحن',
    '1': 'الاسم الأول',
    '2': 'الكنية',
    '3': 'عنوان البريد الإلكتروني',
    '4': 'عنوان الشارع',
    '5': 'فشل جلب البيانات.',
    '6': 'الدولة / المقاطعة',
    '7': 'مدينة',
    '8': 'يرجى اختيار الولاية / المقاطعة',
    '9': 'الرمز البريدي / الرمز البريدي',
    '10': 'هاتف',
    '11': 'عنوان الفواتير والشحن الخاصة بي هي نفسها.',
    '12': 'انشئ حسابا للاستعمال لاحقا.',
    '13': 'عنوان وصول الفواتير',
  },
}
</i18n>

<template>
  <v-expand-transition>
    <div v-if="!sameBillingAndShipping">
      <v-card>
        <!-- Shipping address Title -->
        <v-card-title class="font-weight-bold text-body-1">
          {{ $t('0') }}
        </v-card-title>
        <v-row no-gutters justify="space-around">
          <!-- First Name -->
          <v-col cols="11" sm="5">
            <v-text-field
              v-model="firstName"
              clearable
              dense
              color="black"
              :label="$t('1')"
              outlined
            ></v-text-field>
          </v-col>

          <!-- Last Name -->
          <v-col cols="11" sm="5">
            <v-text-field dense clearable outlined color="black" :label="$t('2')"></v-text-field>
          </v-col>

          <!-- Email Address -->
          <v-col cols="11">
            <v-text-field dense outlined clearable color="black" :label="$t('3')"></v-text-field>
          </v-col>

          <!-- Street Address -->
          <v-col cols="11">
            <v-textarea
              dense
              clearable
              outlined
              auto-grow
              color="black"
              :label="$t('4')"
              row-height="10"
            ></v-textarea>
          </v-col>

          <!-- State/Province -->
          <v-col cols="11" sm="5">
            <v-select
              v-model="province"
              item-text="name"
              item-value="isoCode"
              dense
              outlined
              clearable
              color="black"
              item-color="black"
              :items="provinceList"
              :label="$t('6')"
              @change="getCitiesList"
            ></v-select>
          </v-col>

          <!-- City -->
          <v-col cols="11" sm="5">
            <v-select
              :loading="showCitiesLoading"
              :disabled="showCitiesLoading"
              dense
              outlined
              clearable
              color="black"
              item-text="name"
              item-value="name"
              item-color="black"
              :items="citiesList"
              :label="$t('7')"
            >
              <template #no-data>
                <small class="mx-2"> {{ $t('8') }} </small>
              </template>
            </v-select>
          </v-col>

          <!-- Zip/Postal Code -->
          <v-col cols="11" sm="5">
            <v-text-field dense outlined clearable color="black" :label="$t('9')"></v-text-field>
          </v-col>

          <!-- Phone -->
          <v-col cols="11" sm="5">
            <v-text-field dense outlined clearable color="black" :label="$t('10')"></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-expand-transition>
</template>

<script>
export default {
  data: () => ({
    citiesList: [],
    showCitiesLoading: false,
  }),
  // map states to computed properties
  computed: {
    sameBillingAndShipping() {
      return this.$store.state.prescription.checkout.billing.sameBillingAndShipping;
    },
    provinceList: {
      get() {
        return this.$store.state.prescription.checkout.provinceList;
      },
    },
    firstName: {
      get() {
        return this.$store.state.prescription.checkout.billing.firstName;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateFirstName', value);
      },
    },
    lastName: {
      get() {
        return this.$store.state.prescription.checkout.billing.lastName;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateLastName', value);
      },
    },
    emailAddress: {
      get() {
        return this.$store.state.prescription.checkout.billing.emailAddress;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateEmailAddress', value);
      },
    },
    streetAddress: {
      get() {
        return this.$store.state.prescription.checkout.billing.streetAddress;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateStreetAddress', value);
      },
    },
    province: {
      get() {
        return this.$store.state.prescription.checkout.billing.province;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateProvince', value);
      },
    },
    city: {
      get() {
        return this.$store.state.prescription.checkout.billing.city;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateCity', value);
      },
    },
    phone: {
      get() {
        return this.$store.state.prescription.checkout.billing.phone;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updatePhone', value);
      },
    },
    zipOrPostalCode: {
      get() {
        return this.$store.state.prescription.checkout.billing.zipOrPostalCode;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateZipOrPostalCode', value);
      },
    },
  },
  mounted() {},
  methods: {
    // get cities list from server
    async getCitiesList() {
      if (!this.province) {
        this.citiesList = [];
        return;
      }
      try {
        this.showCitiesLoading = true;

        const response = await this.$http.$get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/KW/regions/${this.province}/cities?limit=10`,
          {
            headers: {
              'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
              'x-rapidapi-key': '75900cd186mshe4b1ca85252ed6ep17db7ejsn387c44b0dac3',
            },
          },
        );
        this.citiesList = response.data;
        this.showCitiesLoading = false;
      } catch (error) {
        this.showCitiesLoading = false;
        console.log(error);
      }
    },
  },
};
</script>
