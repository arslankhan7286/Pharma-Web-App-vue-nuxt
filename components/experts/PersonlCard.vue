<i18n lang="json5">
{
  en: {
    '1': 'Personal Info',
    '2': 'Full Name:',
    '3': 'Gender:',
    '4': 'Age:',
    '5': 'Date of Birth:',
    '6': 'Email:',
    '7': 'Phone No:',
    '8': 'Address:',
  },
  ar: {
    '1': 'معلومات شخصية',
    '2': 'الاسم بالكامل:',
    '3': 'جنس تذكير أو تأنيث:',
    '4': 'سن:',
    '5': 'تاريخ الولادة:',
    '6': 'بريد الالكتروني:',
    '7': 'رقم الهاتف:',
    '8': 'عنوان:',
  },
}
</i18n>

<template>
  <v-card rounded="lg" class="h100">
    <!-- Personal Info Title -->
    <v-card-title class="font-weight-bold text-h6 text-md-h5"> {{ $t('1') }} </v-card-title>

    <!-- Personal Info Table -->
    <v-card-text>
      <v-row class="flex-nowrap overflow-auto text-md-body-1">
        <v-col cols="auto" class="d-flex flex-column font-weight-bold">
          <span class="pa-1"> {{ $t('2') }} </span>
          <span class="pa-1"> {{ $t('3') }} </span>
          <span class="pa-1"> {{ $t('4') }} </span>
          <span class="pa-1"> {{ $t('5') }} </span>
          <span class="pa-1"> {{ $t('6') }} </span>
          <span class="pa-1"> {{ $t('7') }} </span>
          <span class="pa-1"> {{ $t('8') }} </span>
        </v-col>

        <v-col class="d-flex flex-column black--text">
          <span class="pa-1 text-capitalize"> dr john doe </span>
          <span class="pa-1"> male </span>
          <span class="pa-1"> Doctor </span>
          <span class="pa-1"> my office </span>
          <span class="pa-1">aLongEmailToCheckScrollInMobile@gmail.com</span>
          <span class="pa-1">0912332432</span>
          <span class="pa-1"> 401 2nd ave apt 23e New York, NY 10010 </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
