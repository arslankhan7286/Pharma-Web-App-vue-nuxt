<template>
<div class="page">
    <GenerateVerificationCode />
</div>
</template>

<script>
import GenerateVerificationCode from '~/components/prescriptions/sidebar/GenerateVerificationCode.vue';

export default {
    components: { GenerateVerificationCode },
    middleware: 'isAuth',
    head() {
        return {
        title: 'Erxa | Dashboard | Generate Verification Code',
        };
    },
};
</script>
<style scoped>
</style>
