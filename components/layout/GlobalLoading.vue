<template>
  <transition name="fade-transition">
    <div v-if="loading" class="loading-overlay">
      <img src="https://erxa-files.s3.amazonaws.com/assets/erxa_two.svg" alt="">
    </div>
  </transition>
</template>

<script>

export default {
  components: {},
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  z-index: var(--loading-overlay-index);
}
.loading-overlay img {
  width: 150px;
}

.loading-overlay > svg {
  width: 30%;
  height: 30%;
}
.loading-overlay > svg > g {
  fill: var(--primary-color);
}

.loading-overlay > svg .pill-path {
  animation: pill-path-animation 1400ms infinite;
  transform-origin: 500% 270%;
}

@keyframes pill-path-animation {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
