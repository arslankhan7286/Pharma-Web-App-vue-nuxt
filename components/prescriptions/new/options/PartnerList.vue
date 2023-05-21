<template>
  <v-item-group v-model="option">
    <v-container>
      <v-row>
        <PartnerItem v-for="option in options" :key="option" :option="option" />
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import PartnerItem from './PartnerItem.vue';
export default {
  components: {
    PartnerItem,
  },
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  created() {
    localStorage.setItem('option', '')
  },
  computed: {
    option: {
      get() {
        const itemStorge = localStorage.getItem('option');
        if (!itemStorge) {
          localStorage.setItem('option', this.$store.state.prescription.option)
        }
        return this.$store.state.prescription.option;
      },
      set(option) {
        localStorage.setItem('option', option)
        this.$store.commit('prescription/changeOption', option);
      },
    },
  },
};
</script>
