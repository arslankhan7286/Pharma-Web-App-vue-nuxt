<i18n lang="json5">
{
  en: {
    '1': 'Quantity',
    '2': 'Directions',
  },
  ar: {
    '1': 'الكمية',
    '2': 'التعليمات',
  },
}
</i18n>

<template>
  <v-card flat class="drug-item lighten-5 rounded-lg h100">
    <v-card-title class="text-body-1">
      <span class="font-weight-bold"> * </span>
      <v-divider vertical class="mx-2"></v-divider>
      <span class="font-weight-bold"> {{ data.product.name }} </span>
      <v-btn :class="className" :loading="loading" top :right="$i18n.locale!=='ar'" :left="$i18n.locale==='ar'" absolute icon depressed @click="deleteProduct(data.id)">
        <v-icon color="#30BC8F">{{ mdiClose }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <span class="black--text"> {{ $t('1') }}: {{ data.quantity }} </span>
      <span class="grey--text text--lighten-1 mx-2">|</span>
      <span class="black--text"> {{ $t('2') }}: {{ data.direction }} </span>
      <v-divider class="my-2"></v-divider>
      <p class="black--text">{{ data.product.description }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiClose } from '@mdi/js';
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    removeProduct: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    mdiClose,
  }),
  computed: {
    className() {
      if (this.$i18n.locale === 'ar') {
        return 'inactive rtl';
      } else {
        return 'active';
      }
    },
  },
  methods: {
    async deleteProduct(productId) {
      // const confirm = window.confirm('Do you really want to remove this product?')
      // if(!confirm) return;
      this.loading = true;
      await this.removeProduct(productId);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.drug-item {
  background-color: #e7f7f2;
  border-color: #e7f7f2;
}
@media (max-width: 576px) {
  .drug-item .active {
    top: 10px;
    right: 0;
  }.drug-item .rtl {
    top: -4px;
    left: 0;
  }
  .v-card__title {
    padding: 20px;
  }
}
</style>
