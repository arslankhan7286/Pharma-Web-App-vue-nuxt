<i18n lang="json5">
{
  en: {
    '10': 'Sender',
    '11': 'Customer',
  },
  ar: {
    '10': 'المرسل',
    '11': 'العميل',
  },
}
</i18n>

<template>
  <!-- List -->
  <v-expand-transition>
    <div v-if="orders.length > 1" class="w100">
      <v-row class="w100 ma-0 pa-0" justify="center" align="center">
        <v-col cols="12" sm="8" lg="6" class="ma-0 pa-0">
          <v-list rounded>
            <div v-for="(order, index) in orders" :key="order.id">
              <v-list-item link :to="`/p/${order.uuid}`" class="my-2">
                <v-list-item-content>
                  <v-list-item-title>
                    <div>
                      <span class="text-caption text-sm-body-1 grey--text"> {{ $t('10') }}: </span>
                      <span class="text-caption text-sm-body-1 font-weight-bold">
                        {{ order.from_user.first_name }}
                      </span>
                      <span class="text-caption text-sm-body-1 font-weight-bold mx-1">
                        {{ order.from_user.last_name }}
                      </span>
                    </div>

                    <div>
                      <span class="text-caption text-sm-body-1 grey--text"> {{ $t('11') }}: </span>

                      <span class="text-caption text-sm-body-1 font-weight-bold">
                        {{ order.to_user.first_name }}
                      </span>
                      <span class="text-caption text-sm-body-1 font-weight-bold mx-1">
                        {{ order.to_user.last_name }}
                      </span>
                    </div>

                    <div>
                      <span class="text-caption text-sm-body-1 font-weight-bold">
                        {{ $dayjs().locale($i18n.locale).to($dayjs(order.created_at)) }}
                      </span>
                    </div>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon class="align-self-center">
                  <v-icon v-if="$vuetify.rtl"> {{ mdiArrowLeft }} </v-icon>
                  <v-icon v-else> {{ mdiArrowRight }} </v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider v-if="index < orders.length - 1"></v-divider>
            </div>
          </v-list>
        </v-col>
      </v-row>
    </div>
  </v-expand-transition>
</template>

<script>
import { mdiArrowRight, mdiArrowLeft } from '@mdi/js';

export default {
  data: () => ({
    mdiArrowRight,
    mdiArrowLeft,
  }),
  computed: {
    orders: {
      get() {
        return this.$store.state.prescription.search.orders;
      },
      set(value) {
        this.$store.commit('prescription/search/updateOrders', value);
      },
    },
  },
};
</script>

<style></style>
