<template>
    <div class="page">
      <v-container class="h100 flex-grow-1 d-flex flex-column align-center justify-center">
        <CheckEmail />
      </v-container>
    </div>
</template>
  
<script>
import CheckEmail from '~/components/login/CheckEmail.vue';

export default {
    components: { CheckEmail },
    head() {
    return { title: 'Erxa | Check Your Email', };
    },
}
</script>
  