<template>
<div class="page">
    <VerificationCodes />
</div>
</template>

<script>
import VerificationCodes from '~/components/prescriptions/sidebar/VerificationCodes.vue';

export default {
    components: { VerificationCodes },
    middleware: 'isAuth',
    head() {
        return {
        title: 'Erxa | Dashboard | Verification Codes',
        };
    },
};
</script>
<style scoped>
</style>
