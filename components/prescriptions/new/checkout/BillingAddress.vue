<i18n lang="json5">
{
  en: {
    '1': 'First Name*',
    '2': 'Last Name*',
    '3': 'Email Address*',
    '4': 'Street*',
    '5': 'Fetching data was failed.',
    '6': 'State/Province',
    '7': 'City*',
    '8': 'Please Select State/Provinde',
    '9': 'Zip/Postal Code',
    '10': 'Phone*',
    '11': 'My billing and shipping address are the same.',
    '12': 'Create an account for later use.',
    '13': 'Contact details',
    '14': 'This field is required*',
    '15': 'Invalid e-mail.',
    '16': 'Area*',
    '17': 'Block*',
    '18': 'Avenue',
    '19': 'House/building*',
    '20': 'Floor',
    '21': 'Apartment',
    '22': 'Additional directions',
    '23': 'Mobile Number is Invalid.',
    '24': 'No space allowed',
    '25': 'No numbers and special characters allowed',
    '26': 'Only digit allowed',
    '27': 'Minimum 2 characters allowed',
    '28': 'Maximum 20 characters allowed',
  },
  ar: {
    '1': '*الاسم الأول',
    '2': '*الاسم الاخير/العائلة',
    '3': '*عنوان البريد الإلكتروني',
    '4': '*الشارع',
    '5': 'فشل جلب البيانات.',
    '6': 'الدولة / المقاطعة',
    '7': '*مدينة',
    '8': 'يرجى اختيار الولاية / المقاطعة',
    '9': 'الرمز البريدي / الرمز البريدي',
    '10': '*هاتف',
    '11': 'عنوان الفواتير والشحن الخاصة بي هي نفسها.',
    '12': 'انشئ حسابا للاستعمال لاحقا.',
    '13': 'المعلومات الشخصية',
    '14': 'هذه الخانة مطلوبه',
    '15': 'بريد إلكتروني خاطئ.',
    '16': '*منطقة',
    '17': '*قطعة',
    '18': 'جادة',
    '19': '*منزل/بناية',
    '20': 'الدور',
    '21': 'شقة',
    '22': 'معلومات اضافية',
    '23': 'رقم الهاتف المحمول غير صالح.',
    '24': 'المسافة غير مسموحة',
    '25': 'الأرقام والرموز الخاصة غير مسموحة',
    '26': 'الأرقام متاحة فقط',
    '27': 'حرفين كحد أدنى',
    '28': '٢٠ حرف كحد أقصى',
  },
}
</i18n>

<template>
  <v-card>
    <!-- Title -->
    <v-card-title class="font-weight-bold text-body-1">
      <v-row no-gutters align="center" justify="space-between">
        <v-col tag="span" cols="auto">
          {{ $t('13') }}
        </v-col>

        <!-- Toggle button -->
        <v-col tag="span" cols="auto" class="mr-2" v-if="getPath === 'pv2-id'">
          <v-btn icon color="#30BC8F" @click="editAble">
            <v-icon>
              {{ isDisabled ? mdiAccountEditOutline : mdiAccountOffOutline }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-row no-gutters justify="space-around">
      <!-- First Name -->
      <v-col cols="11" sm="5">
        <v-text-field
          ref="firstName"
          v-model="firstName"
          clearable
          :clear-icon="mdiDelete"
          :rules="[requiredRule]"
          dense
          color="#30BC8F"
          :label="$t('1')"
          outlined
          :disabled="isDisabled"
          @keydown="nameKeydown($event)"
        ></v-text-field>
      </v-col>
      <!-- :rules="[requiredRule, whiteSpaceRule, onlyCharactersRule, max20Length, min2Length]" -->

      <!-- Last Name -->
      <v-col cols="11" sm="5">
        <v-text-field
          ref="lastName"
          v-model="lastName"
          :rules="[requiredRule]"
          dense
          clearable
          :clear-icon="mdiDelete"
          outlined
          :disabled="isDisabled"
          color="#30BC8F"
          :label="$t('2')"
          @keydown="nameKeydown($event)"
        ></v-text-field>
      </v-col>

      <!-- Email Address -->
      <v-col cols="11">
        <v-text-field
          ref="emailAddress"
          v-model="emailAddress"
          :rules="[requiredRule, emailRule]"
          dense
          outlined
          :disabled="isDisabled"
          clearable
          :clear-icon="mdiDelete"
          color="#30BC8F"
          :label="$t('3')"
        ></v-text-field>
      </v-col>

      <!-- Phone -->
      <v-col cols="11">
        <v-text-field
          ref="phone"
          v-model="phone"
          :rules="[requiredRule]"
          dense
          outlined
          :disabled="isDisabled"
          clearable
          :clear-icon="mdiDelete"
          color="#30BC8F"
          :label="$t('10')"
        ></v-text-field>
        <!--        <vue-tel-input-vuetify-->
        <!--          ref="phone"-->
        <!--          v-model="phone"-->
        <!--          :rules="[requiredRule]"-->
        <!--          dense-->
        <!--          outlined-->
        <!--          clearable-->
        <!--          :clear-icon="mdiDelete"-->
        <!--          default-country="KW"-->
        <!--          :max-len="14"-->
        <!--          select-label="Country"-->
        <!--          color="black"-->
        <!--          :label="$t('10')"-->
        <!--          @keydown.space.prevent-->
        <!--        ></vue-tel-input-vuetify>-->
      </v-col>

      <!-- <v-col cols="11">
        <v-autocomplete
          ref="phone"
          v-model="phone"
          :items="countriesList"
          item-text="common.name"
          append-icon="flags.png"
        >
        </v-autocomplete>
      </v-col> -->

      <!-- Error Snackbar for Fetcing Provinces -->
      <v-snackbar
        v-model="$fetchState.error"
        transition="slide-x-reverse-transition"
        right
        :timeout="-1"
        rounded="lg"
        width="100%"
        min-width="300px"
        max-width="400px"
        color="#30BC8F"
      >
        {{ $t('5') }}
        <template #action="{ attrs }">
          <v-btn color="#30BC8F" text v-bind="attrs" @click="$fetch"> Retry </v-btn>
        </template>
      </v-snackbar>

      <!-- State/Province -->
      <!--      <v-col cols="11" sm="5">-->
      <!--        <v-select-->
      <!--          v-model="province"-->
      <!--          :disabled="$fetchState.pending"-->
      <!--          :loading="$fetchState.pending"-->
      <!--          item-text="name"-->
      <!--          item-value="isoCode"-->
      <!--          dense-->
      <!--          :rules="[requiredRule]"-->
      <!--          outlined-->
      <!--          clearable-->
      <!--          color="black"-->
      <!--          item-color="black"-->
      <!--          :items="provinceList"-->
      <!--          :label="$t('6')"-->
      <!--          @change="getCitiesList"-->
      <!--        ></v-select>-->
      <!--      </v-col>-->
      <v-col v-if="option !== 'pickup'" cols="11">
        <!-- Area -->
        <v-autocomplete
          ref="city"
          v-model="selectedCity"
          dense
          :loading="showCitiesLoading"
          :disabled="isDisabled"
          outlined
          clearable
          :clear-icon="mdiDelete"
          :rules="[requiredRule]"
          color="#30BC8F"
          :item-text="$i18n.locale === 'ar' ? 'name_ar' : 'name'"
          return-object
          item-color="#30BC8F"
          :items="citiesList"
          :label="$t('16')"
          @change="changeCity"
        >
        </v-autocomplete>

        <!-- Block -->
        <v-text-field
          ref="block"
          v-model.number="block"
          :rules="[onlyNumberRule, requiredRule]"
          dense
          outlined
          :disabled="isDisabled"
          clearable
          :clear-icon="mdiDelete"
          color="#30BC8F"
          :label="$t('17')"
        ></v-text-field>

        <!-- Street -->
        <v-textarea
          ref="streetAddress"
          v-model="streetAddress"
          :rules="[requiredRule]"
          dense
          clearable
          :clear-icon="mdiDelete"
          outlined
          :disabled="isDisabled"
          auto-grow
          color="#30BC8F"
          :label="$t('4')"
          row-height="10"
        ></v-textarea>

        <!-- Avenue -->
        <v-text-field
          ref="avenue"
          v-model.number="avenue"
          dense
          outlined
          :disabled="isDisabled"
          type="number"
          clearable
          :clear-icon="mdiDelete"
          color="#30BC8F"
          :label="$t('18')"
        ></v-text-field>

        <!-- House/building -->
        <v-text-field
          ref="house"
          v-model="house"
          :rules="[requiredRule]"
          dense
          clearable
          :clear-icon="mdiDelete"
          outlined
          :disabled="isDisabled"
          color="#30BC8F"
          :label="$t('19')"
        ></v-text-field>

        <!-- Floor -->
        <v-text-field
          ref="floor"
          v-model="floor"
          :rules="[onlyNumberRule]"
          dense
          clearable
          :clear-icon="mdiDelete"
          outlined
          :disabled="isDisabled"
          color="#30BC8F"
          :label="$t('20')"
        >
        </v-text-field>

        <!-- Apartment -->
        <v-text-field
          ref="apartment"
          v-model="apartment"
          :rules="[onlyNumberRule]"
          dense
          clearable
          :clear-icon="mdiDelete"
          outlined
          :disabled="isDisabled"
          color="#30BC8F"
          :label="$t('21')"
        ></v-text-field>

        <!-- Additional directions -->
        <v-text-field
          ref="directions"
          v-model="directions"
          :rules="[]"
          dense
          clearable
          :clear-icon="mdiDelete"
          outlined
          :disabled="isDisabled"
          color="#30BC8F"
          :label="$t('22')"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiDelete, mdiAccountEditOutline, mdiAccountOffOutline } from '@mdi/js';
export default {
  data: () => ({
    citiesList: [],
    selectedCity: null,
    showCitiesLoading: false,
    privacyPolicyModal: false,
    acceptPrivacypolicy: false,
    termsModal: false,
    mdiAccountEditOutline,
    mdiAccountOffOutline,
    mdiDelete,
    isOpen: false,
    countriesList: [],
    getPath: null,
    isDisabled: true,
    passedIsPickup: '',
  }),
  // we using static hosting and fetch called once in page generation
  // we disabled fetchOnServer to fetch data each time in client side
  fetchOnServer: false,
  async fetch() {
    // load cities list from server
    try {
      this.showCitiesLoading = true;
      this.citiesList = await this.$http.$get('/locations/city/', {
        headers: {
          hash: process.env.HASH,
        },
      });
      // this.citiesList = response.results || [];
      // console.log(this.citiesList);
      this.showCitiesLoading = false;
    } catch (error) {
      this.showCitiesLoading = false;
      console.log(error);
    }
  },
  created() {
    if(this.$route.query && this.$route.query.is_pickup) {
      this.passedIsPickup = this.$route.query.is_pickup
    }
  },
  // map states to computed properties
  computed: {
    option() {
      let opt = this.$store.state.prescription.option;
      if (!opt) {
        opt = this.passedIsPickup === '1' ? 'pickup' : '';
      }
      return opt;
    },
    inputs() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAddress: this.emailAddress,
        city: this.selectedCity,
        block: this.block,
        streetAddress: this.streetAddress,
        avenue: this.avenue,
        phone: this.phone,
        house: this.house,
        floor: this.floor,
        apartment: this.apartment,
        directions: this.directions,
      };
    },
    // we also used this state in shipping address component
    provinceList: {
      get() {
        return this.$store.state.prescription.checkout.provinceList;
      },
      set(value) {
        this.$store.commit('prescription/checkout/updateProvinceList', value);
      },
    },
    floor: {
      get() {
        return this.$store.state.prescription.checkout.billing.floor;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateFloor', value);
      },
    },
    apartment: {
      get() {
        return this.$store.state.prescription.checkout.billing.apartment;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateApartment', value);
      },
    },
    directions: {
      get() {
        return this.$store.state.prescription.checkout.billing.directions;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateDirections', value);
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
    house: {
      get() {
        return this.$store.state.prescription.checkout.billing.house;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateHouse', value);
      },
    },
    block: {
      get() {
        return this.$store.state.prescription.checkout.billing.block;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateBlock', value);
      },
    },
    avenue: {
      get() {
        return this.$store.state.prescription.checkout.billing.avenue;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateAvenue', value);
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
    sameBillingAndShipping: {
      get() {
        return this.$store.state.prescription.checkout.billing.sameBillingAndShipping;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateSameBillingAndShipping', value);
      },
    },
    createAccount: {
      get() {
        return this.$store.state.prescription.checkout.billing.createAccount;
      },
      set(value) {
        this.$store.commit('prescription/checkout/billing/updateCreateAccount', value);
      },
    },
  },
  mounted() {
    this.fillUserInfo();
    this.validateInputs();
    this.getPath = this.$route.name;
    if (this.getPath !== 'pv2-id') {
      this.isDisabled = false;
    }
    // this.getCountries();
  },

  methods: {
    editAble() {
      this.isDisabled = !this.isDisabled;
    },

    changeCity() {
      this.showCitiesLoading = true;
      const city = this.$i18n.locale === 'ar' ? this.selectedCity.name_ar : this.selectedCity.name;
      this.$store.commit('prescription/checkout/billing/updateCity', city);
      this.$store.commit(
        'prescription/checkout/billing/updateDeliveryCharges',
        this.selectedCity.delivery_charges,
      );
      this.showCitiesLoading = false;
    },
    fillUserInfo() {
      setTimeout(() => {
        this.selectedCity = this.$store.state.prescription.user.user_address[0].area
      }, 1500)
      const user = this.$store.state.prescription.user;
      if(user.user_address.length) {
        // this.selectedCity = this.$store.state.prescription.user.user_address[0].area
      }
      if (user) {
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.emailAddress = user.email;
        this.phone = user.contact_phone ? user.contact_phone : user.phone;
        if (user.user_address && user.user_address.length) {
          const address = user.user_address[0];
          this.streetAddress = address.street;
          this.zipOrPostalCode = address.zip_code;
          this.city = address.area;
          this.block = address.block;
          this.street = address.street;
          this.avenue = address.avenue;
          this.house = address.building;
          this.floor = address.floor;
          this.apartment = address.apartment;
          this.directions = address.additional_direction;
        }
      }
    },
    nameKeydown(e) {
      if (!/[a-zA-Z\u0600-\u06FF]+$/.test(e.key)) {
        e.preventDefault();
      }
    },
    requiredRule(value) {
      const message = this.$t('14');
      return !!value || message;
    },
    emailRule(value) {
      const message = this.$t('15');
      const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      return pattern.test(value) || message;
    },
    phoneRule(value) {
      const message = this.$t('23');
      // const pattern = /^(?!(0))[0-9]{8}$/;
      const pattern = /^(\+965[569]\d\s{9})/;
      // const pattern = /([0-9]{8})$/;
      return pattern.test(value) || message;
    },
    whiteSpaceRule(value) {
      const pattern = /^\S/;
      const message = this.$t('24');
      return pattern.test(value) || message;
    },
    onlyCharactersRule(value) {
      const pattern = /[a-zA-Z\u0600-\u06FF\s]+$/;
      const message = this.$t('25');
      return pattern.test(value) || message;
    },
    onlyNumberRule(value) {
      const pattern = /^[0-9\u0660-\u0669]+$/;
      const message = this.$t('26');
      return !value || pattern.test(value) || message;
    },
    min2Length(value) {
      const message = this.$t('27');
      if (value !== null) return value.length >= 2 || message;
      else return true;
    },
    max20Length(value) {
      const message = this.$t('28');
      if (value !== null) return value.length <= 20 || message;
      else return true;
    },

    validateBlock() {
      let formIsValid = true;
      const block = ['block'];
      if (this.option === 'delivery') {
        this.$refs[block[0]].validate(true);
        if (!this.$refs[block[0]].valid) {
          formIsValid = false;
        }
      }
      return formIsValid;
    },

    // otherfields validations
    otherFields() {
      let formIsValid = true;
      const inputs = ['emailAddress', 'city', 'streetAddress', 'phone', 'house'];
        if (this.option === 'delivery') {
          inputs.forEach(input => {
          this.$refs[input].validate(true);
          if (!this.$refs[input].valid) {
            formIsValid = false;
          }
        });
      }
      return formIsValid;
    },

    validateForm() {
      const errors = [];
      const inputs = ['firstName', 'lastName', 'emailAddress', 'city', 'streetAddress', 'phone', 'house', 'block'];
      inputs.forEach(input => {
        this.$refs[input].validate(true);
        if (!this.$refs[input].valid) {
          errors.push(input);
        }
      });
      return errors.length === 0;
    },

    validateInputs() {
      let formIsValid = true;
      // run input validators and rturn validation result
      if (this.option === 'pickup' || this.passedIsPickup === '1') {
        ['firstName', 'lastName', 'emailAddress'].forEach(input => {
          this.$refs[input].validate(true);
          if (!this.$refs[input].valid) {
            formIsValid = false;
          }
        });
      } else if(this.option === 'delivery') {
        ['firstName', 'lastName'].forEach(input => {
          this.$refs[input].validate(true);
          if (!this.$refs[input].valid) {
            formIsValid = false;
          }
        });
      } else if(this.option === 'delivery'){
          const inputs = ['emailAddress', 'city', 'streetAddress', 'avenue', 'phone', 'house', 'floor', 'apartment', 'directions'];
          if (this.option === 'delivery') {
            inputs.forEach(input => {
            this.$refs[input].validate(true);
            if (!this.$refs[input].valid) {
              formIsValid = false;
            }
          });
        }
      }
      return formIsValid;
    },
  },
};
</script>
