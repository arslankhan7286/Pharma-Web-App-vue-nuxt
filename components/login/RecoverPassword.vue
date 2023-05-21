<i18n lang="json5">
    {
      en: {
        '1': 'Email',
        '2': 'Password',
        '3': 'Back to Sign in',
        '4': 'Recover Password',
      },
      ar: {
        '1': 'اسم المستخدم',
        '2': 'كلمة المرور',
        '3': 'كلمة المرور',
      },
    }
    </i18n>
<template>
    <div class="recover-password">
        <div class="overlay" v-if="loading">
            <div class="loader"></div>
        </div>
        <div class="erxa-logo w100 text-center">
            <img src="https://erxa-files.s3.amazonaws.com/assets/erxa_one.png" alt="">
        </div>
        <div class="form">
            <h2>{{ $t('4') }}</h2>
            <v-row>
                <v-col col="12">
                    <v-text-field
                      :ref="$t('1')"
                      v-model="email"
                      outlined
                      :placeholder="$t('1')"
                      color="#30BC8F"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-btn class="login-btn" color="#0E6998" @click.prevent="recoverPassword">
                    {{ $t('4') }}
                </v-btn>
            </v-row>
            <v-row>
                <nuxt-link :to="localePath('/login')" class="text-decoration-none">
                    <v-btn class="reset-password">
                        {{ $t('3') }}
                    </v-btn>
                </nuxt-link>
            </v-row>
        </div>
    </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        email: '',
        loading: false,
      }
    },

    methods: {
        // user recover-password
        async recoverPassword() {
            this.loading = true;
            try {
                const response = await this.$http.$post('/users/reset-password/',
                {
                    email: this.email,
                },
                {
                    headers: {
                        hash: process.env.HASH,
                    },
                })
                if(response){
                    this.$router.push({
                        path: '/check-your-email',
                        query: {
                            email: this.email,
                        },
                    });
                    return this.$toast.success('Email sent successfully');
                }
            } catch (error) {
                console.log(error);
                if(error){
                    return this.$toast.error('No user exists with this email');
                }
            } finally {
                this.loading = false;
            }
        },
    },
  }
</script>
<style scoped>
.recover-password {
    width: 100%;
    padding-bottom: 50px;
}
.recover-password .erxa-logo {
    width: 250px;
    margin: 0 auto;
}
.recover-password .erxa-logo img {
    width: 100%;
    height: auto;
}
.recover-password .form {
    max-width: 320px;
    margin: 0 auto;
    padding: 20px;
}
.recover-password .form h2 {
    color: #0e6998;
    margin-bottom: 20px;
    text-align: center;
}
.recover-password .form .row .col {
    padding-left: 0;
    padding-right: 0;
}
.recover-password .form .v-input {
    height: 55px;
    margin-top: 5px;
}
.recover-password .form .login-btn {
    width: 100%;
    margin-top: 10px;
    font-weight: 700;
    color: #fff;
    text-transform: capitalize;
}
.recover-password .form a {
    width: 100%;
}
.recover-password .form .reset-password {
    width: 100%;
    margin-top: 10px;
    background: none;
    box-shadow: unset;
    color: #999494;
    text-decoration: underline;
    font-weight: 100;
    text-transform: capitalize;
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
