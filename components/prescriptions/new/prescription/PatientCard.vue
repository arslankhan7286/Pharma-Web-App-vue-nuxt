<i18n lang="json5">
{
  en: {
    '1': 'Customer',
  },
  ar: {
    '1': 'العميل',
  },
}
</i18n>

<template>
  <v-card class="h100" outlined rounded="lg">
    <!-- Patirnt Title -->
    <v-card-title class="font-weight-bold text-body-1 py-5">
      {{ $t('1') }}
    </v-card-title>

    <!-- Patirnt Information -->
    <v-card-text>
      <v-row no-gutters align="center">
        <v-col cols="auto">
          <v-avatar size="35">
            <v-icon size="25" color="white"> {{ mdiAccount }} </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="mx-2 font-weight-bold text-body-2">
          <span class="d-block black--text text-capitalize">
            {{ data.first_name }} {{ data.last_name }}
          </span>
          <span class="d-block"> {{ data.phone }} </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAccount } from '@mdi/js';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    mdiAccount,
  }),
};
</script>

<style>
.v-avatar {
  background-color: none;
  border: 1px solid #30bc8f;
}
.v-avatar svg {
  color: #30bc8f;
}
</style>
