<i18n lang="json5">
{
  en: {
    '1': 'Payment Method',
    '2': 'PayPal',
    '3': 'You will be redirected to the PayPal website after submitting your order.',
    '4': 'Pay with Credit Card',
    '5': 'Card Number',
    '6': 'Expiration Date',
    '7': 'Card Security Code',
    '8': 'What is this?',
    '9': 'We protect your payment information using encryption to provide bank-level security.',
  },
  ar: {
    '1': 'طريقة الدفع او السداد',
    '2': 'باي بال',
    '3': 'سيتم إعادة توجيهك إلى موقع PayPal الإلكتروني بعد تقديم طلبك.',
    '4': 'دفع مع بطاقة الائتمان',
    '5': 'رقم البطاقة',
    '6': 'تاريخ الإنتهاء',
    '7': 'رمز أمان الكرت',
    '8': 'ما هذا؟',
    '9': 'نحمي معلومات الدفع الخاصة بك باستخدام التشفير لتوفير الأمن على مستوى البنك.',
  },
}
</i18n>

<template>
  <v-card class="mt-4 pb-4">
    <v-card-title class="font-weight-bold text-body-1 justify-space-between">
      <span>{{ $t('1') }}</span>

      <div class="credit-cards">
        <v-card outlined class="d-inline-block pa-1 pb-0">
          <VisaLogoSvg />
        </v-card>

        <v-card outlined class="d-inline-block pa-1 pb-0">
          <MaestroLogoSvg />
        </v-card>

        <v-card outlined class="d-inline-block pa-1 pb-0">
          <DiscoverLogoSvg />
        </v-card>

        <v-card outlined class="d-inline-block pa-1 pb-0">
          <MastercardLogoSvg />
        </v-card>
      </div>
    </v-card-title>

    <v-item-group v-model="selectedPayment">
      <v-row no-gutters justify="space-around">
        <!-- Method 1 -->
        <v-item v-slot="{ active }" :value="1">
          <v-col cols="11" class="mb-2">
            <v-card :ripple="false" @click="selectedPayment = 1">
              <v-card-text>
                <v-row align="center" justify="space-between">
                  <v-col class="pb-0 pb-md-3" cols="auto">
                    <v-icon color="black">
                      {{ active ? mdiRadioboxMarked : mdiRadioboxBlank }}
                    </v-icon>
                    <span
                      class="font-weight-bold text-body-2 text-md-body-1"
                      :class="{ 'black--text': active }"
                    >
                      {{ $t('2') }}
                    </span>
                  </v-col>
                  <v-col cols="9" sm="8">
                    <p class="mb-0">{{ $t('3') }}</p>
                  </v-col>
                  <v-col cols="auto">
                    <v-card outlined class="paypal-svg-card pa-1 pb-0">
                      <PayPalLogoSvg />
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-item>

        <!-- Method 2 -->
        <v-item v-slot="{ active }" :value="2">
          <v-col cols="11" class="mb-2">
            <v-card :ripple="false" @click="selectedPayment = 2">
              <v-card-text>
                <v-row no-gutters align="center" justify="space-between">
                  <v-col cols="auto" md="6" class="mb-6">
                    <v-icon color="black">
                      {{ active ? mdiRadioboxMarked : mdiRadioboxBlank }}
                    </v-icon>
                    <span
                      class="font-weight-bold text-body-2 text-md-body-1"
                      :class="{ 'black--text': active }"
                    >
                      {{ $t('4') }}
                    </span>
                  </v-col>

                  <v-col cols="auto" class="credit-cards mb-6">
                    <v-card outlined class="d-inline-block pa-1 pb-0">
                      <VisaLogoSvg />
                    </v-card>

                    <v-card outlined class="d-inline-block pa-1 pb-0">
                      <MaestroLogoSvg />
                    </v-card>

                    <v-card outlined class="d-inline-block pa-1 pb-0">
                      <DiscoverLogoSvg />
                    </v-card>

                    <v-card outlined class="d-inline-block pa-1 pb-0">
                      <MastercardLogoSvg />
                    </v-card>
                  </v-col>

                  <!-- Card Number -->
                  <v-col cols="12" sm="5">
                    <v-text-field dense clearable color="black" :label="$t('5')" outlined></v-text-field>
                  </v-col>

                  <!-- Expiration Date -->
                  <v-col cols="12" sm="5">
                    <v-text-field
                      dense
                      clearable
                      outlined
                      placeholder="MM/YY"
                      color="black"
                      :label="$t('6')"
                    ></v-text-field>
                  </v-col>

                  <!-- Card Security Code -->
                  <v-col cols="12" sm="5">
                    <v-text-field dense clearable outlined color="black" :label="$t('7')"></v-text-field>
                  </v-col>

                  <!-- What is this link -->
                  <v-col cols="12" sm="5">
                    <a href="#" class="black--text">
                      {{ $t('8') }}
                    </a>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-item>
      </v-row>
    </v-item-group>

    <!-- Lock Icon and Protection info -->
    <v-card-actions class="pa-4 align-start">
      <v-icon color="black"> {{ mdiLock }} </v-icon>
      <span class="grey--text px-2 text-body-2 text-md-body-1 text--darken-2"> {{ $t('9') }}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiRadioboxBlank, mdiRadioboxMarked, mdiLock } from '@mdi/js';
import MaestroLogoSvg from '~/static/images/maestro-logo.svg?inline';
import MastercardLogoSvg from '~/static/images/mastercard-logo.svg?inline';
import VisaLogoSvg from '~/static/images/visa-logo.svg?inline';
import DiscoverLogoSvg from '~/static/images/discover-logo.svg?inline';
import PayPalLogoSvg from '~/static/images/paypal-logo.svg?inline';

export default {
  components: {
    VisaLogoSvg,
    MaestroLogoSvg,
    DiscoverLogoSvg,
    MastercardLogoSvg,
    PayPalLogoSvg,
  },
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    selectedPayment: 1,
    mdiRadioboxBlank,
    mdiRadioboxMarked,
    mdiLock,
  }),
};
</script>

<style scoped>
.paypal-svg-card svg,
.credit-cards svg {
  width: 20px;
}
</style>
