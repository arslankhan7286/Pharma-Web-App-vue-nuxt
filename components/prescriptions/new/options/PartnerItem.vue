<i18n lang="json5">
{
  en: {
    '1': 'ERXA Delivery',
    '2': 'ERXA Pickup',
    '3': 'Select Pickup Location',
    '4': 'Area',
    '5': 'Block',
    '6': 'Street',
    '7': 'Avenue',
    '8': 'Building',
    '9': 'Floor',
    '10': 'Office',
    '11': 'KD',
  },
  ar: {
    '1': 'توصيل أركسا',
    '2': 'إستلام أركسا',
    '3': 'اختار موقع الاستلام',
    '4': 'منطقة',
    '5': 'قطعه',
    '6': 'شارع',
    '7': 'السبيل',
    '8': 'مبنى',
    '9': 'الدور',
    '10': 'مكتب',
    '11': 'د.ك',
  },
}
</i18n>
<template>
  <v-col cols="12" md="6" lg="5" xl="3">
    <v-item v-slot="{ active, toggle }" :value="option">
      <v-card v-if="option === 'delivery'" rounded="lg" @click="toggle">
        <v-card-title class="font-weight-bold text-body-1">
          <div class="d-flex align-center justify-space-between w100">
            <v-icon color="#30BC8F">
              {{ active ? mdiRadioboxMarked : mdiRadioboxBlank }}
            </v-icon>
            <!--            <span class="option-title px-2" @click="toggle">{{ option.organization }}</span>-->
            <span class="option-title px-2">{{ $t('1') }}</span>
            <v-btn icon color="#30BC8F" @click="showDetails = !showDetails">
              <v-icon> {{ showDetails ? mdiMenuUp : mdiMenuDown }}</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <v-card-subtitle>
          <v-row justify="space-between">
            <v-col cols="12">
              <span>
                <!--                <v-icon color="black"> {{ mdiMapMarker }}</v-icon>-->
                <!--                <span v-if="option.location.street"> {{ option.location.street }}, </span>-->
                <!--                <span v-if="option.location.city">{{ option.location.city }},</span>-->
                <!--                <span v-if="option.location.state">{{ option.location.state }}</span>-->
                <!--                <span>Office 18, M1 Floor, Building No. 17605 </span>-->
                <!--                <span>Block 3,</span>-->
                <!--                <span>Hawally</span>-->
              </span>
            </v-col>
            <!--            <v-col v-else cols="12" class="mt-5"></v-col>-->

            <v-col cols="auto" :class="$vuetify.rtl ? 'text-left' : 'text-right'">
              <span>
                {{ selectedOption.available_products.length }}
                {{ selectedOption.available_products.length > 1 ? 'items' : 'item' }}</span
              >
            </v-col>

            <v-col cols="6" :class="$vuetify.rtl ? 'text-left' : 'text-right'">
              <span class="black--text font-weight-bold"> {{ selectedOption.total_price }} </span>
              <span class="text-caption">{{ $t('11') }}</span>
            </v-col>
          </v-row>
        </v-card-subtitle>

        <!-- Discount Input -->
        <v-expand-transition>
          <div v-if="showDetails">
            <v-divider></v-divider>
            <v-card-text>
              <div v-for="(product, index) in selectedOption.available_products" :key="product.product">
                <div class="d-flex align-center justify-space-between">
                  <span> {{ product.product.name }} </span>
                  <span class="primary--text text-no-wrap"> {{ product.per_product_cost }} {{ $t('11') }} </span>
                </div>
                <v-divider
                  v-if="index < selectedOption.available_products.length - 1"
                  class="my-2 white"
                ></v-divider>
              </div>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <v-card v-else rounded="lg">
        <v-card-title class="font-weight-bold text-body-1" @click="toggle">
          <div class="d-flex align-center justify-space-between w100">
            <v-icon color="#30BC8F">
              {{ active ? mdiRadioboxMarked : mdiRadioboxBlank }}
            </v-icon>
            <!--            <span class="option-title px-2" @click="toggle">{{ option.organization }}</span>-->
            <span class="option-title px-2">{{ $t('2') }}</span>
            <v-btn icon color="#30BC8F" @click="showDetails = !showDetails">
              <v-icon> {{ showDetails ? mdiMenuUp : mdiMenuDown }}</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <v-card-subtitle>
          <v-row justify="space-between">
            <v-col cols="12">
              <v-autocomplete
                ref="pickup"
                v-model="selectedPickup"
                dense
                outlined
                clearable
                :clear-icon="mdiDelete"
                :rules="[v => !!v || 'This Field is required']"
                color="#30BC8F"
                :item-text="$i18n.locale === 'ar' ? 'area_ar' : 'area'"
                return-object
                item-color="#30BC8F"
                :label="$t('3')"
                :items="pickupLocations"
                @change="changePickup"
              >
              </v-autocomplete>
              <span v-if="selectedPickup" @click="toggle">
                <v-icon color="#30BC8F"> {{ mdiMapMarker }}</v-icon>
                <span v-if="selectedPickup.area">{{ $i18n.locale === 'ar' ? selectedPickup.area_ar : selectedPickup.area }},</span>
                <span v-if="selectedPickup.block">{{ $t('5') }} {{ selectedPickup.block }},</span>
                <span v-if="selectedPickup.street">{{$i18n.locale === 'ar' ? $t('6') : ''}} {{ selectedPickup.street }} {{ $i18n.locale !== 'ar' ? $t('6') : ''}},</span>
                <span v-if="selectedPickup.avenue">{{ $t('7') }} {{ selectedPickup.avenue }},</span>
                <span v-if="selectedPickup.building">{{ $t('8') }} {{ selectedPickup.building }},</span>
                <span v-if="selectedPickup.floor">{{ $t('9') }} {{ selectedPickup.floor }},</span>
                <span v-if="selectedPickup.apartment"
                  >{{ $t('10') }} {{ selectedPickup.apartment }}</span
                >
              </span>
            </v-col>
            <!--            <v-col v-else cols="12" class="mt-5"></v-col>-->

            <v-col cols="auto" :class="$vuetify.rtl ? 'text-left' : 'text-right'">
              <span>
                {{ selectedOption.available_products.length }}
                {{ selectedOption.available_products.length > 1 ? 'items' : 'item' }}</span
              >
            </v-col>

            <v-col cols="6" :class="$vuetify.rtl ? 'text-left' : 'text-right'">
              <span class="black--text font-weight-bold"> {{ selectedOption.total_price }} </span>
              <span class="text-caption">{{ $t('11') }}</span>
            </v-col>
          </v-row>
        </v-card-subtitle>

        <!-- Discount Input -->
        <v-expand-transition>
          <div v-if="showDetails">
            <v-divider></v-divider>
            <v-card-text @click="toggle">
              <div v-for="(product, index) in selectedOption.available_products" :key="product.product">
                <div class="d-flex align-center justify-space-between">
                  <span> {{ product.product.name }} </span>
                  <span class="primary--text text-no-wrap"> {{ product.per_product_cost }} {{ $t('11') }} </span>
                </div>
                <v-divider
                  v-if="index < selectedOption.available_products.length - 1"
                  class="my-2 white"
                ></v-divider>
              </div>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-item>
  </v-col>
</template>

<script>
import { mdiRadioboxBlank, mdiRadioboxMarked, mdiMenuDown, mdiMenuUp, mdiMapMarker, mdiDelete } from '@mdi/js';

export default {
  props: {
    option: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    mdiRadioboxBlank,
    mdiRadioboxMarked,
    mdiMenuDown,
    mdiMenuUp,
    mdiMapMarker,
    mdiDelete,
    pickupLocations: [],
    selectedPickup: null,
    showDetails: false,
  }),
  computed: {
    selectedOption() {
      return this.$store.state.prescription.selectedOption;
    },
  },
  async mounted() {
    this.$nextTick(this.$nuxt.$loading.start);
    try {
      this.pickupLocations = await this.$http.$get('/locations/pickup/', {
        headers: {
          hash: process.env.HASH,
        },
      });
      this.selectedPickup = this.pickupLocations[0];
      this.$store.commit('prescription/changePickupLocation', this.selectedPickup);
    } catch (e) {
      console.log('error fetching pickup locations', e);
    }
    this.$nextTick(this.$nuxt.$loading.finish);
  },
  methods: {
    changePickup() {
      this.$store.commit('prescription/changePickupLocation', this.selectedPickup);
    },
  },
};
</script>

<style scoped>
.option-title {
  cursor: pointer;
  word-break: break-word;
}
</style>
