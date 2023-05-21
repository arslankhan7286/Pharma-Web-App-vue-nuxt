<template>
    <div class="page">
      <v-container class="h100 flex-grow-1 d-flex flex-column align-center justify-center">
        <RecoverPassword />
      </v-container>
    </div>
</template>
  
<script>
import RecoverPassword from '~/components/login/RecoverPassword';
export default {
    components: { RecoverPassword },
    head() {
    return { title: 'Erxa | RecoverPassword', };
    },
}
</script>
  