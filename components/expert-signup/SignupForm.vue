<i18n lang="json5">
{
  en: {
    // '0': 'Registration Form',
    '1': 'First Name',
    '2': 'Last Name',
    '3': 'Email Address',
    '4': 'Your Email Address',
    '5': 'Middle Name',
    '10': 'Mobile',
    '11': 'Your Mobile Number',
    '12': 'Work place',
    '13': 'There is no Item',
    '14': 'This field is required',
    '15': 'Invalid e-mail.',
    '16': 'Mobile Number is Invalid.',
    '17': "I have read and accept erxa's ",
    '18': ' Privacy Policy',
    '20': 'Close',
    '21': 'Submit',
    '22': 'Username',
    '23': 'Password',
    '24': 'Minimum 8 Characters',
    '25': 'You must confirm this option to continue.',
    '26': 'Username should not include whitespace',
    '27': 'Organization Name',
    '28': 'Image',
    '29': 'Select Your Image',
    '30': 'Password does not match',
    '31': 'Job',
    '32': 'Select Your Job',
    '35': 'Confirm Password',
    '36': 'Bank',
    '37': 'IBAN is not valid',
    '38': ' Terms & Conditions',
    '39': 'Country Code',
    '40': 'and',
    '41': ' ',
  },
  ar: {
    '0': 'إستمارة تسجيل',
    '1': 'الاسم الاول',
    '2': 'الاسم الاخير/العائلة',
    '3': 'البريد الالكتروني',
    '4': 'عنوان بريدك الإلكتروني',
    '5': 'الاسم الثاني',
    '10': 'الهاتف المحمول',
    '11': 'رقم هاتفك',
    '12': 'جهة العمل',
    '13': 'لم يتم العثور على منظمة',
    '14': 'هذه الخانة مطلوبه',
    '15': 'بريد إلكتروني خاطئ.',
    '16': 'رقم الهاتف المحمول غير صالح.',
    '17': ' أقر بقراءة وقبول',
    '18': 'سياسية الخصوصية',
    '20': 'إغلاق',
    '21': 'إرسال',
    '22': 'اسم المستخدم',
    '23': 'كلمة المرور',
    '24': 'الحد الأدنى 8 أحرف',
    '25': 'يجب تأكيد هذا الخيار للمتابعة.',
    '26': 'يجب ألا يشمل اسم المستخدم Whitespace',
    '27': 'اسم المنظمة',
    '28': 'صورة',
    '29': 'حدد صورتك',
    '30': 'كلمة السر غير متطابقة',
    '31': 'المهنة',
    '32': 'حدد مهنتك',
    '35': 'تأكيد كلمة المرور',
    '36': 'بنك',
    '37': 'ايبان غير صالح',
    '38': ' شروط الاستخدام',
    '39': 'الرمز الدولي',
    '40': 'و',
    '41': 'الخاصة باركسا',
  },
}
</i18n>

<template>
  <v-card class="my-8 mx-auto" max-width="960px">
    <!-- <v-card-title class="font-weight-bold text-body-1">
      {{ $t('0') }}
    </v-card-title> -->

    <v-card-text>
      <v-row>
        <!-- organizations -->
        <v-col cols="12">
          <v-autocomplete
            ref="selectedOrganization"
            v-model="selectedOrganization"
            :dense="$vuetify.breakpoint.mobile"
            outlined
            :append-icon="$fetchState.error ? mdiRefresh : undefined"
            color="#30BC8F"
            :items="$i18n.locale === 'ar' ? organizations : englishOrganizations"
            item-value="id"
            item-text="name"
            :disabled="$fetchState.pending"
            :loading="$fetchState.pending"
            :rules="[requiredRule]"
            :label="$t('12')"
            @click:append="onClickorganizationAppendIcon"
          >
            <template #no-data>
              <span class="pa-2"> {{ $t('13') }} </span>
            </template>
            <template #message="{ message }">{{ $t(message) }}</template>
            <template #item="data">
              <p class="font-weight-bold my-2 black--text">{{ data.item.name }}</p>
            </template>
          </v-autocomplete>
        </v-col>

        <!-- Upload Image -->
        <!-- <v-col cols="12" sm="4">
                 <v-file-input
                   ref="expertImage"
                   v-model="expertImage"
                   :dense="$vuetify.breakpoint.mobile"
                   :placeholder="$t('29')"
                   :label="$t('28')"
                   color="black"
                   outlined
                   prepend-icon
                   show-size
                   :rules="[requiredRule]"
                   accept="image/png, image/jpg, image/jpeg"
                 ></v-file-input>
               </v-col> -->

        <!-- Select Job -->
        <v-col cols="12">
          <v-autocomplete
            ref="selectedJob"
            v-model="selectedJob"
            :rules="[requiredRule]"
            :dense="$vuetify.breakpoint.mobile"
            outlined
            color="#30BC8F"
            :items="jobsList"
            :item-text="$i18n.locale"
            item-value="id"
            :label="$t('31')"
            :placeholder="$t('32')"
          >
            <template #message="{ message }">{{ $t(message) }}</template>
            <template #item="data">
              <p class="font-weight-bold my-2 black--text">{{ data.item[$i18n.locale] }}</p>
            </template>
          </v-autocomplete>
        </v-col>

        <!-- First Name -->
        <v-col cols="12" sm="4">
          <v-text-field
            ref="firstName"
            v-model="firstName"
            clearable
            :rules="[requiredRule]"
            :dense="$vuetify.breakpoint.mobile"
            color="#30BC8F"
            :label="$t('1')"
            outlined
          >
            <template #message="{ message }">{{ $t(message) }}</template>
          </v-text-field>
        </v-col>

        <!-- Middle Name -->
        <v-col cols="12" sm="4">
          <v-text-field
            ref="middleName"
            v-model="middleName"
            :rules="[]"
            :dense="$vuetify.breakpoint.mobile"
            clearable
            outlined
            color="#30BC8F"
            :label="$t('5')"
          >
            <template #message="{ message }">{{ $t(message) }}</template>
          </v-text-field>
        </v-col>

        <!-- Last Name -->
        <v-col cols="12" sm="4">
          <v-text-field
            ref="lastName"
            v-model="lastName"
            :rules="[requiredRule]"
            :dense="$vuetify.breakpoint.mobile"
            clearable
            outlined
            color="#30BC8F"
            :label="$t('2')"
          >
            <template #message="{ message }">{{ $t(message) }}</template>
          </v-text-field>
        </v-col>

        <!-- Email Address -->
        <v-col cols="12">
          <v-text-field
            ref="emailAddress"
            v-model="emailAddress"
            :rules="[requiredRule, emailRule]"
            :dense="$vuetify.breakpoint.mobile"
            outlined
            clearable
            color="#30BC8F"
            :label="$t('3')"
          >
            <template #message="{ message }">{{ $t(message) }}</template>
          </v-text-field>
        </v-col>

        <!-- Username -->
        <v-col cols="12" sm="6">
          <v-text-field
            ref="username"
            v-model="username"
            :dense="$vuetify.breakpoint.mobile"
            outlined
            autocomplete="off"
            clearable
            color="#30BC8F"
            :label="$t('22')"
            :rules="[requiredRule, isNotInlcudeWhitespace]"
          >
            <template #message="{ message }">{{ $t(message) }}</template>
          </v-text-field>
        </v-col>

        <!-- Country Code -->
        <v-col cols="12" sm="3">
          <v-autocomplete
            ref="selectedCountryCode"
            v-model="selectedCountryCode"
            :dense="$vuetify.breakpoint.mobile"
            outlined
            color="#30BC8F"
            :items="countryCodeList"
            :rules="[requiredRule]"
            :label="$t('39')"
            item-value="dial_code"
            item-text="name"
            :disabled="loadingCountries"
            :loading="loadingCountries"
          >
            <template #message="{ message }">{{ $t(message) }}</template>

            <template #no-data>
              <span class="pa-2"> {{ $t('13') }} </span>
            </template>
            <template #item="data">
              <p class="font-weight-bold my-2 black--text">
                <span class="primary--text">{{ data.item.dial_code }}</span>
                <span>{{ data.item.name }}</span>
              </p>
            </template>
          </v-autocomplete>
        </v-col>

        <!-- Mobile -->
        <v-col cols="12" sm="3">
          <v-text-field
            ref="phoneNumber"
            v-model="phoneNumber"
            :dense="$vuetify.breakpoint.mobile"
            outlined
            :rules="[requiredRule, phoneRule]"
            clearable
            color="#30BC8F"
            :label="$t('10')"
          >
            <template #message="{ message }">{{ $t(message) }}</template>
          </v-text-field>
        </v-col>

        <!-- Password -->
        <v-col cols="12" sm="6">
          <v-text-field
            ref="password"
            v-model="password"
            :append-icon="showPassword ? mdiEye : mdiEyeOff"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            :rules="[requiredRule, min8Length]"
            :dense="$vuetify.breakpoint.mobile"
            outlined
            clearable
            color="#30BC8F"
            counter
            :label="$t('23')"
            @click:append="showPassword = !showPassword"
          >
            <template #message="{ message }">{{ $t(message) }}</template>
          </v-text-field>
        </v-col>

        <!-- Confirm Password -->
        <v-col cols="12" sm="6">
          <v-text-field
            ref="confirmPassword"
            v-model="confirmPassword"
            :append-icon="showConfirmPassword ? mdiEye : mdiEyeOff"
            :type="showConfirmPassword ? 'text' : 'password'"
            autocomplete="new-password"
            :rules="[requiredRule, min8Length, confirmPasswordRule]"
            :dense="$vuetify.breakpoint.mobile"
            outlined
            clearable
            :disabled="!password"
            color="#30BC8F"
            counter
            :label="$t('35')"
            @click:append="showConfirmPassword = !showConfirmPassword"
          >
            <template #message="{ message }">{{ $t(message) }}</template>
          </v-text-field>
        </v-col>

        <!-- Bank List -->
        <!-- <v-col cols="12">
          <v-autocomplete
            ref="selectedBank"
            v-model="selectedBank"
            :dense="$vuetify.breakpoint.mobile"
            outlined
            color="black"
            :items="banksList"
            :rules="[requiredRule]"
            :label="$t('36')"
          >
            <template #item="data">
              <p class="font-weight-bold my-2 black--text">{{ data.item }}</p>
            </template>
          </v-autocomplete>
        </v-col> -->

        <!-- IBAN -->
        <!-- <v-col cols="12" sm="12">
          <v-text-field
            ref="IBAN"
            v-model="IBAN"
            clearable
            :rules="[requiredRule, ibanRule]"
            :dense="$vuetify.breakpoint.mobile"
            color="black"
            label="IBAN"
            outlined
          ></v-text-field>
        </v-col> -->

        <!-- Privacy Policy -->
        <v-col cols="12" class="py-0">
          <!-- Privacy Policy Checkbox  -->
          <v-checkbox
            ref="acceptPrivacypolicy"
            v-model="acceptPrivacypolicy"
            dense
            :rules="[isCheckedRule]"
            color="#30BC8F"
          >
            <template #message="{ message }">{{ $t(message) }}</template>
            <template #label>
              <div class="text-body-2 text-md-body-1">
                <span class="black--text">{{ $t('17') }} </span>
                <span class="primary-text" @click="privacyPolicyModal = true">{{ $t('18') }}</span>
                <span class="black--text">{{ $t('40') }} </span>
                <span class="primary-text" @click="termsModal = true">{{ $t('38') }}</span>
                <span class="black--text">{{ $t('41') }} </span>
              </div>
            </template>
          </v-checkbox>

          <!-- Privacy Policy Modal -->
          <v-dialog v-model="privacyPolicyModal" persistent scrollable max-width="700px">
            <v-card v-if="privacyPolicyModal" rounded="lg">
              <v-card-text>
                <PrivacyPolicyText />
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between">
                <v-checkbox v-model="acceptPrivacypolicy" dense color="black">
                  <template #label>
                    <span class="font-weight-bold text-caption text-md-body-1"
                      >{{ $t('17') }} {{ $t('18') }}</span
                    >
                  </template>
                </v-checkbox>

                <v-btn
                  text
                  outlined
                  color="#30BC8F"
                  class="rounded-lg"
                  @click="privacyPolicyModal = false"
                >
                  {{ $t('20') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <!-- Terms and Conditions -->
        <v-col cols="12" class="py-0">
          <!-- Terms and Conditions Checkbox  -->

          <!-- Terms and Conditions Modal -->
          <v-dialog v-model="termsModal" persistent scrollable max-width="700px">
            <v-card v-if="termsModal" rounded="lg">
              <v-card-text>
                <TermsText />
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between">
                <v-checkbox v-model="acceptPrivacypolicy" dense color="#30BC8F">
                  <template #label>
                    <span class="font-weight-bold text-caption text-md-body-1">
                      {{ $t('17') }} {{ $t('38') }}
                    </span>
                  </template>
                </v-checkbox>

                <v-btn text outlined color="#30BC8F" class="rounded-lg" @click="termsModal = false">
                  {{ $t('20') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <!-- Submit Button -->
        <v-col class="mx-auto my-8 my-md-12" cols="8" md="6" lg="4">
          <v-btn
            depressed
            block
            class="rounded-lg font-weight-bold submit-btn"
            color="#30BC8F"
            :large="!$vuetify.breakpoint.mobile"
            @click="onSubmitForm"
          >
            {{ $t('21') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiEye, mdiEyeOff, mdiRefresh } from '@mdi/js';
import PrivacyPolicyText from '@/components/privacy-policy/PrivacyPolicyText.vue';
import TermsText from '@/components/expert-signup/Terms.vue';

export default {
  components: {
    PrivacyPolicyText,
    TermsText,
  },
  data: () => ({
    privacyPolicyModal: false,
    acceptPrivacypolicy: false,
    termsModal: false,
    showPassword: false,
    showConfirmPassword: false,
    selectedCountryCode: null,
    loadingCountries: false,
    countryCodeList: [],
    selectedJob: null,
    jobsList: [
      // { en: 'Medical doctor', ar: 'طبيب بشري', id: 1 },
      { en: 'Dentist', ar: 'طبيب اسنان', id: 2 },
      // { en: 'Nutritionist', ar: 'طبيب - اخصائي تغذية', id: 3 },
      // { en: 'Personal trainer', ar: 'مدرب شخصي', id: 4 },
      // { en: 'Beautician', ar: 'خبير تجميل ', id: 5 },
      { en: 'Dental Hygienist', ar: 'أخصائي تنظيف الأسنان', id: 6 },
    ],
    emailAddress: null,
    banksList: [
      'Ahli United Bank [AUB]',
      'Al Ahli Bank of Kuwait [ABK]',
      'Al Rajhi Bank [Rajhi]',
      'Bank of Bahrain And kuwait [BBK]',
      'Boubyan Bank [Boubyan]',
      'Burgan Bank [Burgan]',
      'Commercial Bank of Kuwait [CBK]',
      'Doha Bank [Doha]',
      'Gulf Bank of Kuwait [GBK]',
      'Knet Test Card [KNET1]',
      'Kuwait Finance House [KFH]',
      'Kuwait International Bank [KIB]',
      'National Bank of Kuwait [NBK]',
      'Qatar National Bank [QNB]',
      'Union National Bank [UNB]',
      'Warba Bank [WRBA]',
    ],
    selectedBank: null,
    lastName: null,
    middleName: null,
    IBAN: null,
    firstName: null,
    expertImage: null,
    phoneNumber: null,
    username: null,
    password: null,
    confirmPassword: null,
    organizations: [],
    englishOrganizations: [
      { name: 'Aljahra Speciality Dental Center', id: '21' },
      { name: 'Alamiri Speciality Dental Center', id: '22' },
      { name: 'Bnied Algar Speciality Dental Center', id: '23' },
      { name: 'Jaber Alahmad Speciality Dental Center', id: '24' },
      { name: 'Aladan Speciality Dental Center', id: '25' },
      { name: 'Alfarwaniya Speciality Dental Center', id: '20' },
    ],
    selectedOrganization: null,
    mdiEye,
    mdiEyeOff,
    mdiRefresh,
  }),
  // we using static hosting and fetch called once in page generation
  fetchOnServer: false,
  async fetch() {
    // load organizations list from server
    const organizations = await this.$http.$get('/locations/?org_type=2');

    // get organizations name and id and push them into organizations local state
    if (organizations && organizations.results?.length) {
      for (const organization of organizations.results) {
        // `${organization.organization.name}, ${organization.street}, ${organization.city}`
        this.organizations.push({
          name: organization.organization.name,
          id: organization.id,
        });
        this.sortOrganizations('id');
        this.sortEnglishOrganization('id');
      }
    }
  },
  computed: {
    inputs() {
      return {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        emailAddress: this.emailAddress,
        phoneNumber: this.phoneNumber,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        acceptPrivacypolicy: this.acceptPrivacypolicy,
        selectedOrganization: this.selectedOrganization,
        selectedJob: this.selectedJob,
        selectedCountryCode: this.selectedCountryCode,
        // expertImage: this.expertImage,
        // selectedBank: this.selectedBank,
        // IBAN: this.IBAN,
      };
    },
  },
  mounted() {
    this.getCountriesList();
  },
  methods: {
    async getCountriesList() {
      this.loadingCountries = true;

      try {
        const response = await this.$http.$get(
          'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json',
        );

        this.countryCodeList = response;
      } catch (error) {
        this.$store.commit('showGlobalSnackbar', {
          text: 'Fetchinf Countries was failed!',
          action: this.getCountriesList,
        });
      }
      this.loadingCountries = false;
    },
    async onSubmitForm() {
      let formIsValid = true;
      // run input validators and rturn validation result
      Object.keys(this.inputs).forEach(input => {
        this.$refs[input].validate(true);
        if (!this.$refs[input].valid) formIsValid = false;
      });
      if (formIsValid) await this.sendExpertDataToServer();
    },
    async sendExpertDataToServer() {
      // show loading
      this.$nextTick(this.$nuxt.$loading.start);

      // Sending data to server to register user
      try {
        await this.$http.$post(
          '/users/register-expert/',
          {
            role: 3,
            email: this.emailAddress,
            phone: this.phoneNumber,
            username: this.username,
            location: this.selectedOrganization,
            first_name: this.firstName,
            last_name: this.lastName,
            password: this.password,
            job: this.selectedJob,
            iban: '0',
            bank: '0',
          },
          {
            headers: {
              hash: process.env.HASH,
            },
          },
        );

        // Show success mmessage
        this.$store.commit('showGlobalSnackbar', {
          text: 'Success Registration!',
          color: 'success',
          actionText: 'ok',
          timeout: -1,
          action: () => {},
        });

        // redirect user to home page
        this.$router.push('/expert-signup/welcome');
      } catch (error) {
        let message = 'Server Error';
        if (error?.response?.data) {
          const key = Object.keys(error.response.data)[0];
          message = key + error.response.data[key];
        }
        this.$store.commit('showGlobalSnackbar', { text: message, action: this.onSubmitForm });
      }
      // hide loading
      this.$nextTick(this.$nuxt.$loading.finish);
    },
    onClickorganizationAppendIcon() {
      if (this.$fetchState.error) {
        // fetch data again
        this.$fetch();
      } else {
        // open the list dropdown
        this.$refs.selectedOrganization.focus();
        this.$refs.selectedOrganization.activateMenu();
      }
    },
    ibanRule(value) {
      const pattern =
        /^([A-Z]{2}[-]?[0-9]{2})(?=(?:[-]?[A-Z0-9]){9,30}$)((?:[-]?[A-Z0-9]{3,5}){2,7})([-]?[A-Z0-9]{1,3})?$/;

      return pattern.test(value) || '37';
    },
    requiredRule(value) {
      return !!value || '14';
    },
    emailRule(value) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || '15';
    },
    min8Length(value) {
      if (value !== null) return value.length >= 8 || '24';
      else return true;
    },
    phoneRule(value) {
      const pattern = /([0-9]{8})$/;
      return pattern.test(value) || '16';
    },
    isCheckedRule(value) {
      return value === true ? true : '25';
    },
    confirmPasswordRule(value) {
      return value !== this.password ? '30' : true;
    },
    isNotInlcudeWhitespace(value) {
      return !/\s/g.test(value) || '26';
    },
    sortOrganizations(id) {
      this.organizations.sort((a, b) => (a[id] < b[id] ? -1 : 1));
    },
    sortEnglishOrganization(id) {
      this.englishOrganizations.sort((a, b) => (a[id] < b[id] ? -1 : 1));
    },
  },
};
</script>
<style scoped>
.submit-btn {
  color: #fff;
}
.primary-text {
  color: #30bc8f;
}
</style>
