<i18n lang="json5">
    {
      en: {
        '3': 'Back to Log in',
      },
      ar: {
        '3': 'كلمة المرور',
      },
    }
</i18n>
<template>
    <div class="check-email">
        <div class="overlay" v-if="loading">
            <div class="loader"></div>
        </div>
        <v-container>
            <v-row align="center" justify="center">
              <v-col cols="12 text-center">
                <v-img
                  class="mx-auto"
                  height="80"
                  width="80"
                  src="/images/icons/checkEmail.png"
                ></v-img>
      
                <h3 class="text-center my-5 font-weight-bold">Check Your Email</h3>
                <p class="email-instr">We have sent a password recover instructions to your email "{{ $route.query.email }}"</p>
      
                </v-col>
            </v-row>
            <v-row class="back-to" align="center" justify="center">
                <v-col cols="12 text-center">
                    <div class="text-center">
                    <v-btn  color="primary" class="rounded-lg font-weight-bold" @click="openEmailApp">
                        Open email app
                    </v-btn>
                    </div>
                    <div class="text-center mt-5">
                        <p>Did not receive the email? Check your spam folder</p>
                        <v-btn class="send-again" @click.prevent="resendEmail()">Send again</v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row class="back-to" align="center" justify="center">
                <nuxt-link :to="localePath('/login')" class="text-decoration-none">
                    <v-btn class="reset-password">
                        {{ $t('3') }}
                    </v-btn>
                </nuxt-link>
            </v-row>
          </v-container>
    </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        loading: false,
      }
    },

    methods: {
        openEmailApp() {
            window.location.href = "mailto:" + this.$route.query.email;
        },
        // resend email
        async resendEmail() {
            this.loading = true;
            try {
                const response = await this.$http.$post('/users/reset-password/',
                {
                    email: this.$route.query.email,
                },
                {
                    headers: {
                        hash: process.env.HASH,
                    },
                })
                if(response){
                    // this.$router.push('/login')
                    return this.$toast.success('Password recovery email resent successfully');
                }
            } catch (error) {
                console.log(error);
                if(error){
                    return this.$toast.error('Something went wrong');
                }
            } finally {
                this.loading = false;
            }
        }
    },
  }
</script>
<style scoped>
.send-again {
    width: 120px;
    background: transparent !important;
    color: #137eb5;
    box-shadow: none;
    text-transform: none;
}
button {
    width: 100%;
}
.email-instr {
    margin: 0;
}
.back-to {
    margin: 0;
}
.back-to .col-12 {
    padding-left: 0;
    padding-right: 0;
}
.reset-password {
    width: 100%;
    margin-top: 10px;
    background: transparent !important;
    box-shadow: unset;
    color: #999494;
    text-decoration: underline;
}
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #137eb5;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
