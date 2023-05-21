<i18n lang="json5">
{
  en: {
    '1': 'Registration form',
  },
  ar: {
    '1': 'استمارة تسجيل',
  },
}
</i18n>

<template>
  <div class="page">
    <v-container>
      <h1 class="text-h5 font-weight-bold text-center my-4 my-md-8">{{ $t('1') }}</h1>
      <SignupForm />
    </v-container>
  </div>
</template>

<script>
import SignupForm from '@/components/expert-signup/SignupForm.vue';
export default {
  components: {
    SignupForm,
  },
  head() {
    return {
      title: 'Erxa | Expert Registration Page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Erxa Web Application Registration Page For Experts',
        },
      ],
    };
  },
};
</script>

<style></style>
