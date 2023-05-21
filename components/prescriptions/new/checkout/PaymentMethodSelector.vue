<i18n lang="json5">
  {
    en: {
      '1': 'Payment Method',
      '2': 'Cash',
      '3': 'Knet/Credit Card',
      '23': "I have read and accept erxa's ",
      '24': ' Privacy Policy',
      '25': 'and',
      '26': ' Terms & Conditions',
      '27': ' ',
      '28': 'Close',
      '29': 'Please agree to the T&Cs before placing an order.',
    },
    ar: {
      '1': 'طريقة الدفع',
      '2': ' نقداً ',
      '3': 'كي نت - بطاقة ائتمانية',
      '23': ' أقر بقراءة وقبول',
      '24': 'سياسية الخصوصية',
      '25': 'و',
      '26': ' شروط الاستخدام',
      '27': 'الخاصة بتطبيق اركسا',
      '28': 'إغلاق',
      '29': 'يجب تأكيد هذا الخيار للمتابعة.',
    },
  }
  </i18n>

  <template>
  <div>
    <div v-if="this.getPath === 'er-id'" class="my-4">
      <v-card class="copy-link mb-2">
        <v-btn color="#0e6998" @click="copyOrderLink()"> Copy order link </v-btn>
      </v-card>
      <v-card class="copy-link">
        <v-btn color="#0e6998" @click="getWhatsappLink()"> Save and Send </v-btn>
      </v-card>
    </div>

    <div v-else>
      <v-card>
        <v-card-title class="font-weight-bold text-body-1">
          <v-row no-gutters align="center" justify="space-between">
            <!-- Order Review title -->
            <v-col tag="span" cols="auto">
              {{ $t('1') }}
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <!-- Privacy Policy -->
            <v-col cols="12" class="pb-5">
              <!-- Privacy Policy Checkbox  -->
              <v-checkbox
                ref="acceptPrivacypolicy"
                v-model="acceptPrivacypolicy"
                dense
                :rules="[isCheckedRule]"
                color="#0e6998"
                @change="onAccept"
              >
                <template #message="{ message }">{{ $t(message) }}</template>
                <template #label>
                  <div class="text-body-2 text-md-body-1">
                    <span class="black--text">{{ $t('23') }} </span>
                    <span class="primary--text" @click="privacyPolicyModal = true">{{ $t('24') }}</span>
                    <span class="black--text">{{ $t('25') }} </span>
                    <span class="primary--text" @click="termsModal = true">{{ $t('26') }}</span>
                    <span class="black--text">{{ $t('27') }} </span>
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
                    <v-checkbox v-model="acceptPrivacypolicy" dense color="#0e6998" @change="onAccept">
                      <template #label>
                        <span class="font-weight-bold text-caption text-md-body-1"
                          >{{ $t('23') }} {{ $t('24') }}</span
                        >
                      </template>
                    </v-checkbox>

                    <v-btn
                      text
                      outlined
                      color="#0e6998"
                      class="rounded-lg"
                      @click="privacyPolicyModal = false"
                    >
                      {{ $t('28') }}
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
                    <v-checkbox v-model="acceptPrivacypolicy" dense color="#0e6998" @change="onAccept">
                      <template #label>
                        <span class="font-weight-bold text-caption text-md-body-1">
                          {{ $t('23') }} {{ $t('26') }}
                        </span>
                      </template>
                    </v-checkbox>

                    <v-btn text outlined color="#0e6998" class="rounded-lg" @click="termsModal = false">
                      {{ $t('28') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row>
            <!-- Order Review Toggle button -->
            <v-col>
              <!-- <v-radio-group v-model="selectedOption">
                  <v-radio value="cash" color="primary" :label="$t('2')" />
                  <v-radio value="credit" color="primary" :label="$t('3')" />
                </v-radio-group> -->

              <v-btn
                :disabled="$store.state.prescription.checkout.billing.acceptPolicy"
                depressed
                class="rounded-lg font-weight-bold payment-btn"
                block
                color="#0e6998"
                :large="$vuetify.breakpoint.mdAndUp"
                @click="selectedMode('cash')"
              >
                {{ $t('2') }}
              </v-btn>
              <v-btn
                :disabled="$store.state.prescription.checkout.billing.acceptPolicy"
                depressed
                block
                class="rounded-lg font-weight-bold mt-2 payment-btn credit-btn"
                color="#0e6998"
                :large="$vuetify.breakpoint.mdAndUp"
                @click="selectedMode('knet')"
              >
                {{ $t('3') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

  <script>
import { mdiWhatsapp } from '@mdi/js';
import PrivacyPolicyText from '@/components/privacy-policy/PrivacyPolicyText.vue';
import TermsText from '@/components/expert-signup/Terms.vue';
export default {
  components: {
    PrivacyPolicyText,
    TermsText,
  },
  props: {
    validateBlock: {
      type: Function,
      required: true,
    },
    validateForm: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    privacyPolicyModal: false,
    acceptPrivacypolicy: false,
    termsModal: false,
    mdiWhatsapp,
    getPath: null,
    getUuid: null,
    isPickup: '',
  }),

  computed: {
    option() {
      return this.$store.state.prescription.option;
    },
  },

  mounted() {
    this.getPath = this.$route.name;
  },
  // props: {
  //   value: {
  //     type: String,
  //     required: true,
  //     default: 'cash',
  //   },
  // },
  // computed: {
  //   selectedOption: {
  //     get() {
  //       return this.value;
  //     },
  //     set(value) {
  //       this.$emit('input', value);
  //     },
  //   },
  // },
  methods: {
    detectIsPickup() {
      const option = localStorage.getItem('option');
      if(option === 'pickup') {
        this.isPickup = '1';
      } else {
        this.isPickup = ''
      }
    },
    selectedMode(mode) {
      if(this.getPath === 'pv2-id') {
        if(this.validateForm() === true) {
          this.$emit('onSelectPaymentMode', mode);
        }
      }else {
        this.$emit('onSelectPaymentMode', mode);
      }
    },
    isCheckedRule(value) {
      return value === true ? true : '29';
    },
    onAccept() {
      this.validateBlock();
      this.$store.commit('prescription/checkout/billing/updateAcceptPolicy', this.acceptPrivacypolicy);
    },

    getPageUrl() {
      this.getUuid = this.$route.params.id;
      if (process.client) {
        return window.origin + `/pv2/${this.getUuid}`;
      }
    },
    // form submit request
    async formSubmissionRequest() {
      try {
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
            user_address: userAddress,
            contact_phone: billing.phone,
          },
          {
            headers: {
              hash: process.env.HASH,
            },
          },
        );
        return response;
      } catch (error) {
        console.log(error);
        if (error) {
          return this.$toast.error('user with this Email Address already exists.');
        }
      }
    },

    async copyOrderLink() {
      const response = await this.formSubmissionRequest()
      if (response) {
        const getUrl = this.getPageUrl();
        this.detectIsPickup();
        navigator.clipboard.writeText(getUrl+`?is_pickup=${this.isPickup}`).then(
          () => {
            this.$toast.success('Link copied!');
          },
          err => {
            console.error('Could not copy text: ', err);
          },
        );
      }
    },
    async getWhatsappLink() {
      const response = await this.formSubmissionRequest()
      if (response) {
        const billing = this.$store.state.prescription.checkout.billing;
        const contactPhone = response.contact_phone;
        const phoneNumber = contactPhone !== '' ? contactPhone : billing.phone
        const firstName = this.$store.state.prescription.user.first_name;
        this.detectIsPickup();
        const message =
          `Dear ${firstName},%0a%0aYour order is ready for payment in ERXA systems, please proceed with the payment using the link below.
          %0a%0a` +
          window.origin +
          `/pv2/${this.$route.params.id}?is_pickup=${this.isPickup}` +
          `
          %0a%0aRegards,%0aERXA Team`;
        this.isCheckedRule();
        this.getUuid = this.$route.params.id;
        return window.open(`https://api.whatsapp.com/send?phone=+${phoneNumber}&text=${message}`);
      }
    },
  },
};
</script>
  <style scoped>
.primary--text {
  color: #0e6998 !important;
}
.payment-btn {
  color: #fff;
}
.copy-link button {
  width: 100%;
  color: #fff;
}
.credit-btn {
  display: none;
}
</style>
