<i18n lang="json5">
{
  en: {
    '1': 'Sender',
  },
  ar: {
    '1': 'المرسل',
  },
}
</i18n>

<template>
  <v-card class="h100" outlined rounded="lg">
    <!-- Title and Call button -->
    <v-card-title
      class="font-weight-bold text-body-1 d-flex black--text align-center justify-space-between"
    >
      {{ $t('1') }}
      <!--      <a :href="'tel:' + data.phone" class="d-block rounded-xl primary lighten-4 pa-1">-->
      <!--        <v-icon color="primary"> {{ mdiPhoneOutline }} </v-icon>-->
      <!--      </a>-->
    </v-card-title>

    <!-- Expert Information -->
    <v-card-text>
      <v-row no-gutters align="start">
        <v-col cols="auto">
          <v-avatar size="35">
            <img src="/images/erxa_two.png" />
          </v-avatar>
        </v-col>
        <v-col class="mx-2">
          <h3 v-if="data.job" class="black--text text-body-1 font-weight-bold">
            {{ $i18n.locale === 'en' ? data.job : getTranslation() }}
          </h3>
          <span
            class="d-block text-body-1 font-weight-bold text-color"
          >
            {{ data.first_name }} {{ data.last_name }}
          </span>
          <div>
            <span v-if="data.location.org_name">{{ data.location.org_name }}</span>
            <!-- <span v-if="data.location.city">{{ data.location.city }},</span> -->
            <!-- <span v-if="data.location.street"> {{ data.location.street }} </span> -->
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiPhoneOutline } from '@mdi/js';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    mdiPhoneOutline,
  }),
  methods: {
    getTranslation() {
      if (this.data.job === 'Dentist') {
        return 'طبيب اسنان';
      }

      if (this.data.job === 'Medical Doctor') {
        return 'طبيب بشري';
      }
    },
  },
};
</script>

<style scoped>
.primary--text {
  color: #30bc8f !important;
}
.text-color{
  color: #000 !important;
  font-size: 0.875rem !important;
}
.v-avatar {
  background-color: none;
  border: 1px solid #30bc8f;
}
</style>
