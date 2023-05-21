<i18n lang="json5">
{
  en: {
    '1': 'Copyright © ',
    '2': 'erxa - All Rights Reserved.',
  },
  ar: {
    '1': 'حقوق النشر © ',
    '2': 'Erxa - جميع الحقوق محفوظة.'
  },
}
</i18n>
<template>
  <div class="footer text-center py-10 no-print">
    <p class="gray text-body-2 text-sm-body-1">
      {{ $t('1') }} {{ currentYear }} {{ $t('2') }}
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  }
};
</script>
<style scoped>
.footer {
  background-color: #0e6998;
}
.footer p {
  color: #ccc;
}
</style>
