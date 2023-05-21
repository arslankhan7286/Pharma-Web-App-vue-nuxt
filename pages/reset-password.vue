<i18n lang="json5">
{
  en: {
    '1': 'New Password',
    '2': 'Confirm Password',
    '3': 'Minimum 8 Characters',
    '4': 'Password does not match',
    '5': 'This field is required',
    '6': 'New Password is set successfully.',
    '7': 'Download Mobile App to Login',
    '8': 'Reset Your Password',
    '9': 'Reset Password ',
    '10': 'Maximum 32 characters allowed', 
    '11': 'New Password must be atleast 8 characters and maximum 32 characters',
    '12': 'New Password must have a capital letter',
    '13': 'New Password must have a special character',
    '14': 'At least one number (0-9)',
  },
  ar: {
    '1': 'كلمة المرور',
    '2': 'تأكيد كلمة المرور',
    '3': 'الحد الأدنى 8 أحرف',
    '4': 'كلمة السر غير متطابقة',
    '5': 'هذه الخانة مطلوبه',
    '6': 'تم تعيين كلمة المرور الجديدة بنجاح.',
    '7': 'الذهاب للتطبيق لتسجيل الدخول',
    '8': 'إعادة ضبط كلمة المرور',
    '9': 'إعادة ضبط كلمة المرور',
    '10': '32 حرف كحد أقصى',
    '11': 'New Password must be atleast 8 characters and maximum 32 characters',
    '12': 'New Password must have a capital letter',
    '13': 'New Password must have a special character',
    '14': 'At least one number (0-9)',
  },
}
</i18n>
<template>
  <div class="page">
    <v-container>
      <v-row v-if="showSuccess" align="center" justify="center" class="my-16">
        <v-col cols="12" sm="12" lg="6" md="8">
          <v-img
            class="mx-auto"
            height="80"
            width="80"
            src="/images/icons/reset-password-success.png"
          ></v-img>

          <h3 class="text-center my-5 font-weight-bold">{{ $t('6') }}</h3>
            <div>
                <div class="download-app">
                    <v-btn
                    v-if="this.$device.isIos"
                    large
                    depressed
                    color="#b42c2c"
                    class="ma-5 white--text btn"
                    href="https://apps.apple.com/in/app/erxa-expert/id1576109528"
                    >
                    <v-icon>{{ mdiApple }}</v-icon>
                    <p><span>Download on the</span><br>App Store</p>
                    </v-btn>
                    <v-btn
                    v-if="this.$device.isAndroid"
                    large
                    depressed
                    color="#30bc8f"
                    class="ma-5 white--text btn"
                    href="https://erxa-files.s3.amazonaws.com/erxa-expert.apk"
                    ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="36px" height="36px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd">
                        <g><path style="opacity:0.852" fill="#7bb242" d="M 11.5,3.5 C 13.4649,4.129 15.4649,4.79566 17.5,5.5C 19.1349,5.12229 20.6349,4.45563 22,3.5C 22.5389,5.71296 23.7055,8.0463 25.5,10.5C 20.1667,11.8333 14.8333,11.8333 9.5,10.5C 10.1279,8.74186 11.1279,7.24186 12.5,6C 11.7476,5.32924 11.4142,4.4959 11.5,3.5 Z"/></g>
                        <g><path style="opacity:0.924" fill="#7cb242" d="M 5.5,12.5 C 6.5,12.5 7.5,12.5 8.5,12.5C 8.5,16.1667 8.5,19.8333 8.5,23.5C 7.5,23.5 6.5,23.5 5.5,23.5C 5.5,19.8333 5.5,16.1667 5.5,12.5 Z"/></g>
                        <g><path style="opacity:0.854" fill="#7bb441" d="M 9.5,12.5 C 14.8333,12.5 20.1667,12.5 25.5,12.5C 25.6657,16.8461 25.499,21.1794 25,25.5C 22.9838,26.9552 22.1505,28.9552 22.5,31.5C 21.1667,31.5 19.8333,31.5 18.5,31.5C 17.8333,24.8333 17.1667,24.8333 16.5,31.5C 15.1667,31.5 13.8333,31.5 12.5,31.5C 12.8495,28.9552 12.0162,26.9552 10,25.5C 9.50098,21.1794 9.33432,16.8461 9.5,12.5 Z"/></g>
                        <g><path style="opacity:0.924" fill="#7cb242" d="M 26.5,12.5 C 27.5,12.5 28.5,12.5 29.5,12.5C 29.5,16.1667 29.5,19.8333 29.5,23.5C 28.5,23.5 27.5,23.5 26.5,23.5C 26.5,19.8333 26.5,16.1667 26.5,12.5 Z"/></g>
                        </svg>
                    
                    <p><span>Download</span><br>Android App</p>
                    </v-btn>
                    <div v-if="this.$device.isDesktop" class="text-center">
                        <v-btn href="/download-app" color="primary" class="rounded-lg font-weight-bold">
                        {{ $t('7') }}
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-col>
      </v-row>

      <v-card v-if="!showSuccess" class="my-8 mx-auto" max-width="600px">
        <v-col cols="12">
          <v-img
            class="mx-auto"
            width="100"
            height="100"
            contain
            src="/images/prescriptions/invoice/erxa_two.png"
          >
          </v-img>
          <h2 class="text-center my-3">{{ $t('8') }}</h2>
        </v-col>

        <div class="pass-guide">
          <h3>Password must contain</h3>
          <ul>
            <li>At least 8 characters</li>
            <li>Both uppercase and lowercase letters (A-Z & a-z)</li>
            <li>At least one number (0-9)</li>
            <li>At least one special character e.g. , ! @ # ? ]</li>
          </ul>
        </div>

        <v-card-text>
          <v-row>
            <!--New Password -->
            <v-col cols="12">
              <v-text-field
                ref="password"
                v-model="password"
                :append-icon="showPassword ? mdiEye : mdiEyeOff"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                :rules="[capitalLetterRule, specialCharacterRule, atLeastOneNumberRule, lengthRule]"
                :dense="$vuetify.breakpoint.mobile"
                outlined
                clearable
                color="#30bc8f"
                counter
                :label="$t('1')"
                @click:append="showPassword = !showPassword"
              >
                <template #message="{ message }">{{ $t(message) }}</template>
              </v-text-field>
            </v-col>

            <!-- Confirm Password -->
            <v-col cols="12">
              <v-text-field
                ref="confirmPassword"
                v-model="confirmPassword"
                :append-icon="showConfirmPassword ? mdiEye : mdiEyeOff"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                :rules="[ confirmPasswordRule]"
                :dense="$vuetify.breakpoint.mobile"
                outlined
                clearable
                :disabled="!password"
                color="#30bc8f"
                counter
                :label="$t('2')"
                @click:append="showConfirmPassword = !showConfirmPassword"
              >
                <template #message="{ message }">{{ $t(message) }}</template>
              </v-text-field>
            </v-col>

            <!-- Submit Button -->
            <v-col class="mx-auto my-8 my-md-12" cols="8" md="6" lg="4">
              <v-btn
                depressed
                block
                class="rounded-lg font-weight-bold reset-pass"
                color="#30bc8f"
                :large="!$vuetify.breakpoint.mobile"
                @click="onSubmitForm"
              >
                {{ $t('9') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// import ErxaCloudLogo from '~/static/images/erxa-cloud.svg?inline';
import { mdiEye, mdiEyeOff, mdiRefresh, mdiApple } from '@mdi/js';
export default {
  components: {
    // ErxaCloudLogo,
  },
  data: () => ({
    showPassword: false,
    showConfirmPassword: false,
    password: null,
    confirmPassword: null,
    mdiEye,
    mdiEyeOff,
    mdiRefresh,
    mdiApple,
    showError: false,
    showSuccess: false,
    showResetPassword: false,
    url: null,
    // isInstalled: false,
  }),
  head() {
    return {
      title: 'Erxa | Reset Your Password',
    };
  },
  computed: {
    inputs() {
      return {
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
    },
  },
  mounted() {
    //  to set only ENGLISH layout for password reset
    this.$i18n.setLocale('en');
  },
  methods: {
    async onSubmitForm() {
      let formIsValid = true;
      // run input validators and rturn validation result
      Object.keys(this.inputs).forEach(input => {
        this.$refs[input].validate(true);
        if (!this.$refs[input].valid) {
          formIsValid = false;
        }
      });
      if (formIsValid) {
        await this.sendResetPassword();
      }
    },
    async sendResetPassword() {
      this.$nextTick(this.$nuxt.$loading.start);
      try {
        const response = await this.$http.put(
          '/users/reset-password/',
          {
            new_password: this.password,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.$route?.query?.token,
            },
          },
        );
        // console.log(response);
        if (response.status === 200) {
          this.showSuccess = true;
        } else {
          this.showSuccess = false;
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.$store.commit('showGlobalSnackbar', { text: error.response.data.message });
        } else {
          this.$store.commit('showGlobalSnackbar', { text: 'Token Invalid Or Expired' });
        }
        // this.$nuxt.context.error(error);
      }
      this.$nextTick(this.$nuxt.$loading.finish);
    },
    // passwordRules: [
    //
    //
    //  ,
    //   value =>
    //     (value && /[^A-Za-z0-9]/.test(value)) || 'Password must include at least one special character',
    //   value => (value && value.length > 8) || 'Password must be minimum 8 characters',
    // ],
    capitalLetterRule(value) {
      if (!/[A-Z]/.test(value)) {
        return this.$t('12');
      }
      return true;
    },
    specialCharacterRule(value) {
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return this.$t('13');
      }
      return true;
    },
    lengthRule(value) {
      if (value == null) {
        return this.$t('12');
      }
      if (value.length < 8 || value.length > 32) {
        return this.$t('11');
      }
      return true;
    },
    atLeastOneNumberRule(value) {
      if (value == null) {
        return this.$t('12');
      }
      if (value.length < 8 || value.length > 32) {
        return this.$t('11');
      }
      if (!/\d/.test(value)) {
        return this.$t('14');
      }
      return true;
    },
    min1DigitRule(value) {
      // return (value && /\d/.test(value)) || 'Password must include at least one digit';
      return (value && /\d/.test(value)) || this.$t('11');
    },
    min1CapitalRule(value) {
      // return (value && /[A-Z]{1}/.test(value)) || 'Password must include at least one capital letter';
      return (value && /[A-Z]{1}/.test(value)) || this.$t('11');
    },
    min1SpecialCharacterRule(value) {
      return (
        // (value && /[^A-Za-z0-9]/.test(value)) || 'Password must include at least one special character'
        (value && /[^A-Za-z0-9]/.test(value)) || this.$t('11')
      );
    },
    min8Length(value) {
      if (value !== null) return value.length >= 8 || this.$t('11');
      else return true;
    },

    max32Length(value) {
      // const message = this.$t('10');
      if (value !== null) return value.length <= 32 || this.$t('11');
      else return true;
    },
    confirmPasswordRule(value) {
      return value !== this.password ? '4' : true;
    },
    requiredRule(value) {
      return !!value || '5';
    },
  },
};
</script>

<style scoped>
.logo > svg {
  width: 10%;
  height: 20%;
}

/* change svg path color */
.logo > svg > g {
  fill: var(--primary-color);
}
.reset-pass {
  color: #fff;
}
.pass-guide {
  padding: 0 10px;
}
.pass-guide h3 {
  padding-bottom: 10px;
  margin-left: 10px;
}
.pass-guide ul li {
  position: relative;
  padding-bottom: 10px;
  list-style: none;
}
.pass-guide ul li::before {
  position: absolute;
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #000;
  left: -14px;
  top: 8px;
}
.download-app .btn {
    background-color: transparent !important;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    color: #000 !important;
}
.download-app .btn p {
    margin: 0;
    color: #000;
    font-weight: 700;
    font-size: 12px;
    margin-left: 5px;
}
.download-app  .btn p span {
    font-weight: 100;
    color: #8d8a8a;
}
.download-app .btn .v-icon svg {
    width: 34px;
    height: 34px;
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
