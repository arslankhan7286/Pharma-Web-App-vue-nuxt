<i18n lang="json5">
{
    en: {
    '1': 'Logout',
    },
    ar: {
    '1': 'تسجيل خروج'
    },
}
</i18n>
<template>
    <div class="d-md-block">
        <!-- Logout btn -->
        <v-card-actions>
                <v-btn class="logout" @click.prevent="logOut">
                    {{ $t('1') }}
                    <v-icon>{{ mdiLogout }}</v-icon>
                </v-btn>
          </v-card-actions>
        <!-- <v-btn color="#30BC8F" class="font-weight-bold rounded-lg" text @click.prevent="logOut"> {{ $t('1') }} </v-btn> -->
    </div>
</template>

<script>
import { mdiLogout } from '@mdi/js';
export default {
    data: () => ({
        mdiLogout,
    }),
    methods: {
        logOut() {
            this.$router.push('/login');
            this.$store.dispatch('userAuth/logout')
            this.$toast.success('Account logged out successfully');
        }
    },
};
</script>

<style scoped>
.logout {
    background: transparent !important;
    border: none;
    box-shadow: none;
    color: #fff;
    font-weight: 600;
}
.logout span {
    color: #fff !important;
    margin-left: 10px;
}
.logout span span .v-icon__svg {
    width: 20px !important;
    height: 20px !important;
}
</style>
