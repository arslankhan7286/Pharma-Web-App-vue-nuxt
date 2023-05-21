<template>
  <v-snackbar
    v-model="showSnackbar"
    transition="slide-x-reverse-transition"
    right
    :top="$vuetify.breakpoint.mobile"
    :timeout="$store.state.globalSnackbarTimeout"
    rounded="lg"
    width="100%"
    min-width="300px"
    max-width="400px"
    content-class="font-weight-bold"
    :color="$store.state.globalSnackbarColor"
  >
    {{ $store.state.globalSnackbarText }}
    <template v-if="$store.state.globalSnackbarAction" #action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="onAction">
        {{ $store.state.globalSnackbarActionText }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    showSnackbar: {
      get() {
        return this.$store.state.globalSnackbar;
      },
      set() {
        // hide snackbar
        this.$store.commit('hideGlobalSnackbar');
      },
    },
  },
  methods: {
    onAction() {
      this.$store.commit('hideGlobalSnackbar');
      this.$store.state.globalSnackbarAction();
    },
  },
};
</script>

<style></style>
