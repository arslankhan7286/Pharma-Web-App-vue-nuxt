<template>
    <div>
        <v-card
        class="mx-auto sidebar">
        <v-navigation-drawer
            class="deep-purple accent-4"
            dark
            permanent
        >
            <v-list>
                <v-list-item :class="{ 'active': isOrdersActive, 'item-list': !isOrdersActive }">
                    <v-list-item-content>
                        <nuxt-link :to="localePath('/er/dashboard')">
                            <v-list-item-title>
                                    Orders 
                            </v-list-item-title>
                        </nuxt-link>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :class="{ 'active': isVerificationCodesActive, 'item-list': !isVerificationCodesActive }">
                <v-list-item-content>
                    <nuxt-link :to="localePath('/er/dashboard/verification-codes')">
                        <v-list-item-title>
                            Invitation codes
                        </v-list-item-title>
                    </nuxt-link>
                </v-list-item-content>
            </v-list-item>
            </v-list>
            <v-list>
            </v-list>
        </v-navigation-drawer>
        </v-card>
    </div>
  </template>
<script>
export default {
    components: { },
    data: () => ({
        isActive: false,
        isHighlighted: true,
    }),
    computed: {
        isOrdersActive() {
        return this.$route.name === 'er-dashboard';
        },
        isVerificationCodesActive() {
        return this.$route.name === 'er-dashboard-verification-codes' || this.$route.name === 'er-dashboard-generate-verification-code';
        }
    }
  }
</script>
<style scoped>
.sidebar .v-toolbar__title {
    background: #0e6998;
}
.active {
    width: 210px;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #fff;
    color: #2fba8f !important;
    font-size: 1em;
    font-weight: 600;
    margin-bottom: 10px;
    padding-left: 3.5em;
  }
.sidebar {
    width: 100%;
    height: 100%;
    margin-left: 0 !important;
    border-radius: 0;
    box-shadow: none !important;
    overflow: hidden;
}
.deep-purple.accent-4 {
    background: #0e6998 !important;
    margin-right: 0;
}
.item-list {
    cursor: pointer;
    width: 210px;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: 10px;
    padding-left: 3em;
}
.item-list .v-list-item__content .v-list-item__title {
    font-size: 1em;
    font-weight: 600;
    margin-left: 10px;
}
.item-list .v-list-item__content a {
   text-decoration: none;
   color: unset;
}
.active .v-list-item__content a {
    text-decoration: none;
    color: unset;
 }
.item-list:hover {
    background: #2fba8f;
    color: #fff;
}
.theme--dark.v-list {
    padding-top: 50px;
}
@media only screen and (max-width: 630px) {
    .deep-purple {
        width: 180px !important;
    }
    .active {
        width: 170px;
        padding-left: 1.4em;
    }
    .item-list {
        width: 170px;
        padding-left: 1em;
    }
}
@media only screen and (max-width: 510px) {
    .deep-purple {
        width: 160px !important;
    }
    .active {
        font-size: 13px;
        width: 150px;
        padding-left: 1em;
    }
    .item-list {
        font-size: 13px;
        width: 150px;
        padding-left: 0.6em;
    }
}
</style>