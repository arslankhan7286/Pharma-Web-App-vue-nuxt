<i18n lang="json5">
{
  en: {
    '1': 'Shipping Method',
  },
  ar: {
    '1': 'طريقة الشحن',
  },
}
</i18n>

<template>
  <v-card class="my-6 pb-4">
    <!-- Shipping Method Title -->
    <v-card-title class="font-weight-bold text-body-1">
      {{ $t('1') }}
    </v-card-title>

    <v-item-group v-model="selectedShipping">
      <v-row no-gutters justify="space-around">
        <!-- Method 1 -->
        <v-item v-slot="{ active }" :value="1">
          <v-col cols="11" class="mb-2">
            <v-card @click="selectedShipping = 1">
              <v-card-text>
                <v-row align="center">
                  <v-col class="pa-0 pa-md-3" cols="auto">
                    <v-icon color="black">
                      {{ active ? mdiRadioboxMarked : mdiRadioboxBlank }}
                    </v-icon>
                    <span class="font-weight-bold" :class="{ 'black--text': active }"> $2.99 </span>
                  </v-col>
                  <v-col>
                    <p class="mb-0 text-caption text-md-body-2" :class="{ 'black--text': active }">
                      USPS 1st Class With Tracking (5 - 13 days) COVID19 Delay
                    </p>
                  </v-col>
                  <v-col class="pa-0 pa-md-3" cols="auto">
                    <v-icon :color="active ? 'black' : 'grey'">
                      {{ mdiCreditCardOutline }}
                    </v-icon>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-item>

        <!-- Method 2 -->
        <v-item v-slot="{ active }" :value="2">
          <v-col cols="11" class="mb-2">
            <v-card @click="selectedShipping = 2">
              <v-card-text>
                <v-row align="center">
                  <v-col class="pa-0 pa-md-3" cols="auto">
                    <v-icon color="black">
                      {{ active ? mdiRadioboxMarked : mdiRadioboxBlank }}
                    </v-icon>
                    <span class="font-weight-bold" :class="{ 'black--text': active }"> $1.99 </span>
                  </v-col>
                  <v-col>
                    <p class="mb-0 text-caption text-md-body-2" :class="{ 'black--text': active }">
                      USPS 1st Class With Tracking (5 - 13 days) COVID19 Delay
                    </p>
                  </v-col>
                  <v-col class="pa-0 pa-md-3" cols="auto">
                    <v-icon :color="active ? 'black' : 'grey'">
                      {{ mdiCreditCardOutline }}
                    </v-icon>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-item>
      </v-row>
    </v-item-group>
  </v-card>
</template>

<script>
import { mdiRadioboxBlank, mdiRadioboxMarked, mdiCreditCardOutline } from '@mdi/js';

export default {
  data: () => ({
    selectedShipping: 1,
    mdiRadioboxBlank,
    mdiCreditCardOutline,
    mdiRadioboxMarked,
  }),
};
</script>
