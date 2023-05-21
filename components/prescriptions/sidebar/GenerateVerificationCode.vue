<template>
    <div class="main-sidebar">
        <Sidebar />
        <div class="right-sidebar">
            <div class="gen-verification-codes">
                <v-card>
                    <!-- generate-verification-code -->
                    <div class="add-gen-codes">
                        <v-card-actions>
                            <nuxt-link :to="localePath('/er/dashboard/verification-codes')">
                                <v-btn class="cancel-btn mod-btn">
                                    Back
                                </v-btn>
                            </nuxt-link>
                        </v-card-actions>
                    </div>
                    <div class="code-gen">
                        <div class="logo w100 text-center">
                            <img src="https://erxa-files.s3.amazonaws.com/assets/erxa_one.png" alt="">
                        </div>
                        <div class="form">
                            <h1>Agent Portal Access</h1>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                    :ref="phone"
                                    v-model="phone"
                                    outlined
                                    placeholder="Mobie No."
                                    color="#30BC8F"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="8">
                                    <v-text-field
                                    :ref="code"
                                    v-model="code"
                                    outlined
                                    color="#30BC8F"
                                    placeholder="Generate Code"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-btn color="#0E6998" :disabled="!isPhoneNumberValid" @click="generateCode">
                                        Generate Code
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn class="send-code" color="#30bc8f" :disabled="!isCodeValid" @click="sendToExert">
                                        Send Code to Expert
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
export default {
    components: { Sidebar },
    data: () => ({
        phone: '',
        code: '',
        token: localStorage.getItem('token'),
        response: null,
    }),
    computed: {
        isPhoneNumberValid() {
            return this.phone.length > 7;
        },
        isCodeValid() {
            return this.code.length > 0;
        },
    },
    methods: {
        // generate code
        async generateCode() {
            console.log('triggerrr', this.token)
            try {
                const response = await this.$http.$post('/common/generate-code/',
                {
                    phone: this.phone,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                    },
                })
                this.response = response
                if(response) {
                    this.$toast.success('Code generated successfully!')
                    this.code = response.code
                }
                console.log('responsoeee', response)
            } catch(error) {
                console.log(error)
            }
        },
        // code send to expert
        sendToExert() {
            this.phone = '';
            this.code = '';
            const message =
            `Dear,%0a%0aYour verification code is: ${this.response.code}%0aPlease use the below URL to download the application to signup using this code.
            %0a%0a` +
            window.origin +
            `/download-app/` +
            `
            %0a%0aRegards,%0aERXA Team`;
          return window.open(`https://api.whatsapp.com/send?phone=${this.response.phone}&text=${message}`);
        }
    }
};
</script>

<style scoped>
.main-sidebar {
    display: flex;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
}
.v-sheet .v-card__actions {
    position: absolute;
    top: 10px;
    right: 10px;
}
.v-sheet .v-card__actions a{
    text-decoration: none;
}
.cancel-btn {
    color: #30bc8f;
    border: 1px solid #30bc8f;
    width: 100px;
    font-weight: 600;
}
.right-sidebar {
    width: 80%;
    height: 100vh;
    overflow: scroll;
}
.gen-verification-codes {
    width: 100%;
    position: relative;
}
.gen-verification-codes .v-card {
    box-shadow: none;
}
.gen-verification-codes .code-gen {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 30px 0px;
    padding-top: 25px;
    display: flex;
    flex-direction: column;
}
.gen-verification-codes .logo {
    width: 250px;
    margin: 0 auto;
}
.gen-verification-codes .logo img {
    width: 100%;
    height: auto;
}
::v-deep .form .v-input__control .v-input__slot {
    width: 100%;
}
::v-deep .form .v-input__control {
    margin: 0;
    height: 45px;
    width: 100%;
}
.form h1 {
    text-align: center;
    margin: 22px;
    margin-top: 0;
    font-weight: 600;
    color: #0e6998;
}
.form .row button {
    width: 100%;
    height: 56px;
    color: #fff;
    font-weight: 600;
}
.form .row .col-sm-8 {
    padding-right: 0;
}
.form .row .col-sm-4 {
    padding-left: 0;
}
.form .row .col-sm-4 button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
::v-deep .form .col-sm-8 .v-input__control {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
::v-deep .theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
    background: #598ea9 !important;
    color: #fff !important;
}
::v-deep .send-code.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
    background: #7adbbc !important;
    color: #fff !important;
}
@media only screen and (max-width: 768px) {
    .gen-verification-codes .logo {
        width: 170px;
    }
    .gen-verification-codes .form {
        margin: 0 20px;
    }
    .gen-verification-codes .form h1 {
        font-size: 24px;
    }
}
@media only screen and (max-width: 600px) {
    .col-sm-8 {
        padding-right: 12px !important;
    }
    .form .row .col-sm-4 {
        padding-left: 12px !important;
    }
    ::v-deep .form .col-sm-8 .v-input__control {
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
    }
    .form .row .col-sm-4 button {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
}
</style>
