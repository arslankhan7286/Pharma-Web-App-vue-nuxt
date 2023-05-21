<i18n lang="json5">
{
  en: {
    '1': 'Billing Summary',
    '2': 'Subtotal',
    '3': 'Discount',
    '4': 'Warranty',
    '5': 'Shipping',
    '6': 'Tax',
    '7': 'Grand Total',
    '8': 'Order Comment',
    '9': 'Type here...',
    '10': 'Please check to acknowledge our',
    '11': 'Privacy & Terms Policy',
    '12': 'Pay',
    '13': 'KD',
  },
  ar: {
    '1': 'ملخص الفاتورة',
    '2': 'فرعي',
    '3': 'خصم',
    '4': 'ضمان',
    '5': 'شحن',
    '6': 'ضريبة',
    '7': 'المبلغ الإجمالي',
    '8': 'طلب تعليق',
    '9': 'أكتب هنا...',
    '10': 'يرجى التحقق من الاعتراف بنا',
    '11': 'سياسة الخصوصية والشروط',
    '12': 'يدفع',
    '13': 'د.ك',
  },
}
</i18n>

<template>
  <div>
    <v-card class="my-6">
      <!-- Billing Summary Table -->
      <v-card-title class="font-weight-bold text-body-1">
        <v-row no-gutters align="center" justify="space-between">
          <!-- Title -->
          <v-col tag="span" cols="auto">
            {{ $t('1') }}
          </v-col>

          <!-- Toggle button -->
          <v-col tag="span" cols="auto" class="mx-n3">
            <v-btn icon color="#30BC8F" @click="billingSummary = !billingSummary">
              <v-icon>
                {{ billingSummary ? mdiMenuUp : mdiMenuDown }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-expand-transition>
        <div v-if="billingSummary">
          <!-- Information Table -->

          <!-- It will be available in future -->
          <!-- <v-card-text>
          <v-row justify="space-between">
            <v-col tag="span" cols="auto"> {{ $t('2') }} </v-col>
            <v-col tag="span" cols="auto"> 3720,27 </v-col>
          </v-row>

          <v-row justify="space-between">
            <v-col tag="span" cols="auto"> {{ $t('3') }} </v-col>
            <v-col tag="span" cols="auto"> -749.99 </v-col>
          </v-row>

          <v-row justify="space-between">
            <v-col tag="span" cols="auto"> {{ $t('4') }} </v-col>
            <v-col tag="span" cols="auto"> 259.99 </v-col>
          </v-row>

          <v-row justify="space-between">
            <v-col tag="span" cols="auto"> {{ $t('5') }} </v-col>
            <v-col tag="span" cols="auto"> 0.00 </v-col>
          </v-row>

          <v-row justify="space-between">
            <v-col tag="span" cols="auto"> {{ $t('6') }} </v-col>
            <v-col tag="span" cols="auto"> 0.00 </v-col>
          </v-row>

          <v-divider class="mt-4"></v-divider>
        </v-card-text> -->

          <!-- Total title -->
          <v-card-title class="font-weight-bold text-body-1">
            <v-row no-gutters justify="space-between">
              <v-col tag="span" cols="auto">
                {{ $t('7') }}
              </v-col>
              <v-col tag="span" cols="auto"> {{ totalPrice }} {{ $t('13') }} </v-col>
            </v-row>
          </v-card-title>

          <!-- It will be available in future -->
          <v-card-text>
            <!-- Input Field -->
            <!--
          <v-textarea
            dense
            clearable
            outlined
            hide-details
            auto-grow
            row-height="10"
            rows="1"
            color="black"
            :label="$t('8')"
            :placeholder="$t('9')"
          ></v-textarea> -->

            <!-- It will be available in future -->
            <!-- <div class="d-flex justify-start align-start my-3">
            <v-checkbox dense class="d-inline-flex pa-0 ma-0" color="primary"> </v-checkbox>
            <span>
              {{ $t('10') }}
              <a target="_blank" class="d-inline black--text" :href="localePath('/privacy-policy')">
                {{ $t('11') }}
              </a>
            </span>
          </div> -->

            <!-- <v-btn block class="font-weight-bold" color="primary" @click="onPayment">
              {{ $t('12') }}
            </v-btn> -->
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { mdiMenuUp, mdiMenuDown } from '@mdi/js';
export default {
  components: {},
  data: () => ({
    billingSummary: true,
    mdiMenuUp,
    mdiMenuDown,
  }),
  computed: {
    totalPrice() {
      // get total price from state
      const selectedOption = this.$store.state.prescription.selectedOption;
      if (selectedOption && selectedOption.total_price) {
        return selectedOption.total_price;
      }
      return 0;
    },
    deliveryCharges() {
      return this.$store.state.prescription.checkout.billing.deliveryCharges;
    },
  },
};
</script>
