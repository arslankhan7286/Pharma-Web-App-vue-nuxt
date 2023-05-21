<i18n lang="json5">
{
  en: {
    '1': 'Order Review',
    '2': 'Order Items',
    '3': 'KD ',
  },
  ar: {
    '1': 'مراجعة الطلب',
    '2': 'طلب بضاعة',
    '3': 'د.ك',
  },
}
</i18n>

<template>
  <v-card>
    <v-card-title class="font-weight-bold text-body-1">
      <v-row no-gutters align="center" justify="space-between">
        <!-- Order Review title -->
        <v-col tag="span" cols="auto">
          {{ $t('1') }}
        </v-col>

        <!-- Order Review Toggle button -->
        <v-col tag="span" cols="auto" class="mx-n3">
          <v-btn icon color="#30BC8F" @click="showOrderReview = !showOrderReview">
            <v-icon>
              {{ showOrderReview ? mdiMenuUp : mdiMenuDown }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-subtitle class="pb-0">
      {{ $t('2') }}
    </v-card-subtitle>

    <v-expand-transition>
      <div v-if="showOrderReview">
        <v-card-text class="pb-0 pt-0">
          <!-- Order Item -->
          <div v-for="product of products" :key="product.product.id">
            <v-row justify="space-between" class="my-1">
              <!-- It will be enable in future -->
              <!-- <v-col cols="3" md="4" lg="3" xl="2">
                <v-skeleton-loader height="70" width="70" type="card"> </v-skeleton-loader>
              </v-col> -->
              <v-col cols="9" md="8" lg="9" xl="10">
                <v-row align="center" justify="space-between" class="my-0 mx-0 h100">
                  <v-col class="pa-0" cols="12">
                    <v-row no-gutters justify="space-between">
                      <v-col tag="span" cols="10">
                        <p class="mb-0 small-line-height text-caption">
                          {{ product.product.name }}
                        </p>
                      </v-col>

                      <!-- It will be enable in future -->
                      <!-- <v-col tag="span" class="mx-n3" cols="auto">
                        <v-btn icon color="black">
                          <v-icon small> {{ mdiClose }} </v-icon>
                        </v-btn>
                      </v-col> -->
                    </v-row>
                  </v-col>

                  <v-col class="pa-0" cols="12">
                    <v-row no-gutters align="center" justify="space-between">
                      <!-- It will be enable in future -->
                      <!-- <v-col cols="auto">
                        <v-btn
                          x-small
                          height="unset"
                          min-width="unset"
                          outlined
                          class="pa-0"
                          color="black"
                        >
                          <v-icon> {{ mdiMinus }} </v-icon>
                        </v-btn>
                        <span class="font-weight-bold mx-1">1</span>
                        <v-btn
                          x-small
                          height="unset"
                          min-width="unset"
                          outlined
                          class="pa-0"
                          color="black"
                        >
                          <v-icon> {{ mdiPlus }} </v-icon>
                        </v-btn>
                      </v-col> -->

                      <v-col cols="auto">
                        <!-- It will be enable in future -->
                        <!-- <small class="d-block text-right text-decoration-line-through"> $245,78 </small> -->
                        <strong class="d-block text-right font-weight-bold">
                          {{ product.per_product_cost }} {{ $t('3') }}
                        </strong>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-divider></v-divider>
          </div>
          <div>
            <v-row justify="space-between" v-if="option !== 'pickup'" class="my-1">
              <v-col cols="9" md="8" lg="9" xl="10">
                <v-row align="center" justify="space-between" class="my-0 mx-0 h100">
                  <v-col class="pa-0" cols="12">
                    <v-row no-gutters justify="space-between">
                      <v-col tag="span" cols="10">
                        <p class="mb-0 small-line-height text-caption">Delivery Charges</p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col class="pa-0" cols="12">
                    <v-row no-gutters align="center" justify="space-between">
                      <v-col cols="auto">
                        <!-- It will be enable in future -->
                        <!-- <small class="d-block text-right text-decoration-line-through"> $245,78 </small> -->
                        <strong class="d-block text-right font-weight-bold">
                          {{ deliveryCharges }} {{ $t('3') }}
                        </strong>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mdiMenuUp, mdiMenuDown, mdiMinus, mdiPlus, mdiClose } from '@mdi/js';
export default {
  components: {},
  data: () => ({
    showOrderReview: true,
    deliverCharges: 2,
    mdiPlus,
    mdiMinus,
    mdiMenuUp,
    mdiMenuDown,
    mdiClose,
    passedIsPickup: '',
  }),
  created() {
    if(this.$route.query && this.$route.query.is_pickup) {
      this.passedIsPickup = this.$route.query.is_pickup
    }
  },
  computed: {
    products() {
      const selectedOption = this.$store.state.prescription.selectedOption;
      if (selectedOption && selectedOption.available_products) {
        return selectedOption.available_products;
      }
      return [];
    },
    deliveryCharges() {
      return this.$store.state.prescription.checkout.billing.deliveryCharges;
    },
    option() {
      let opt = this.$store.state.prescription.option
      if (!opt) {
        opt = this.passedIsPickup === '1' ? 'pickup' : '';
      }
      return opt;
    },
  },
  mounted() {
  },
};
</script>
