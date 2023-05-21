<i18n lang="json5">
{
  en: {
    '1': 'Professional Info',
    '2': 'Type of Practice:',
    '3': 'Speciality:',
    '4': 'Degree:',
    '5': 'Office Name:',
    '6': 'Office Address:',
  },
  ar: {
    '1': 'معلومات احترافية',
    '2': 'نوع الممارسة:',
    '3': 'تخصص:',
    '4': 'الدرجة العلمية:',
    '5': 'اسم المكتب:',
    '6': 'عنوان المكتب:',
  },
}
</i18n>

<template>
  <v-card rounded="lg" class="h100">
    <!-- Professional Info Title -->
    <v-card-title class="font-weight-bold text-h6 text-md-h5"> {{ $t('1') }} </v-card-title>

    <!-- Professional Info Table -->
    <v-card-text>
      <v-row class="flex-nowrap overflow-auto text-md-body-1">
        <v-col cols="auto" class="d-flex flex-column font-weight-bold">
          <span class="pa-1"> {{ $t('2') }} </span>
          <span class="pa-1"> {{ $t('3') }} </span>
          <span class="pa-1"> {{ $t('4') }} </span>
          <span class="pa-1"> {{ $t('5') }} </span>
          <span class="pa-1"> {{ $t('6') }} </span>
        </v-col>

        <v-col class="d-flex flex-column black--text">
          <span class="pa-1 text-capitalize"> dr john doe </span>
          <span class="pa-1"> male </span>
          <span class="pa-1"> Doctor </span>
          <span class="pa-1"> my office </span>
          <span class="pa-1"> 401 2nd ave apt 23e New York, NY 10010 </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
