<template>
    <div class="page">
      <v-container class="h100 flex-grow-1 d-flex flex-column align-center justify-center">
        <LogIn />
      </v-container>
    </div>
</template>
  
<script>
import LogIn from '~/components/login/LogIn';
export default {
    components: { LogIn },
    head() {
    return { title: 'Erxa | Login', };
    },
}
</script>
  