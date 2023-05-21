<i18n lang="json5">
{
  en: {
    '1': 'Discount Code',
    '2': 'Enter your coupon code',
  },
  ar: {
    '1': 'الرقم التسلسلي للخصم',
    '2': 'أدخل رمز القسيمة الخاص بك',
  },
}
</i18n>

<template>
  <v-card class="my-6">
    <v-card-title class="font-weight-bold text-body-1">
      <v-row no-gutters justify="space-between" align="center">
        <!-- Discount Title -->
        <v-col tag="span" cols="auto">
          {{ $t('1') }}
        </v-col>
        <!-- Toggle Button -->
        <v-col tag="span" cols="auto" class="mx-n3">
          <v-btn icon color="black" @click="showDicountCode = !showDicountCode">
            <v-icon>
              {{ showDicountCode ? mdiMenuUp : mdiMenuDown }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <!-- Discount Input -->
    <v-expand-transition>
      <div v-if="showDicountCode">
        <v-card-text>
          <v-text-field
            dense
            outlined
            hide-details
            clearable
            color="black"
            :label="$t('2')"
          ></v-text-field>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mdiMenuUp, mdiMenuDown } from '@mdi/js';
export default {
  components: {},
  data: () => ({
    mdiMenuUp,
    mdiMenuDown,
    showDicountCode: false,
  }),
};
</script>
