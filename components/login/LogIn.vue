<i18n lang="json5">
    {
      en: {
        '1': 'Email',
        '2': 'Password',
        '3': 'Sign In',
        '4': 'Access Your Account',
        '5': 'Reset Password',
      },
      ar: {
        '1': 'بريد إلكتروني',
        '2': 'كلمة المرور',
        '3': 'تسجيل الدخول',
        '4': 'الوصول إلى حسابك',
        '5': 'إعادة تعيين كلمة المرو',
      },
    }
    </i18n>
<template>
    <div class="login-screen">
        <div class="logo w100 text-center">
            <img src="https://erxa-files.s3.amazonaws.com/assets/erxa_one.png" alt="">
        </div>
        <div class="form">
            <h2>{{ $t('4') }}</h2>
            <h4 v-if="invalidEmailPass">Incorrect email or password</h4>
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
                <v-col col="12">
                    <v-text-field
                      :ref="$t('2')"
                      v-model="password"
                      :append-icon="showPassword ? mdiEye : mdiEyeOff"
                      :type="showPassword ? 'text' : 'password'"
                      outlined
                      color="#30BC8F"
                      :placeholder="$t('2')"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-btn class="login-btn" color="#0E6998" @click.prevent="logIn">
                    {{ $t('3') }}
                </v-btn>
            </v-row>
            <v-row>
                <nuxt-link :to="localePath('/recover-password')" class="text-decoration-none">
                    <v-btn class="reset-password">
                        {{ $t('5') }}
                    </v-btn>
                </nuxt-link>
            </v-row>
        </div>
        <div class="overlay" v-if="loading">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js';
  export default {
    components: {},
    data() {
      return {
        email: '',
        password: '',
        token: '',
        isAgent: '',
        getUser: null,
        loading: false,
        invalidEmailPass: null,
        showPassword: false,
        mdiEye,
        mdiEyeOff,
      }
    },

    methods: {
        // super-admin or agent login
        async logIn() {
            this.loading = true;
            try {
                const response = await this.$http.$post('/users/login/',
                {
                    email: this.email,
                    password: this.password,
                },
                {
                    headers: {
                        hash: process.env.HASH,
                    },
                })
                if (response.token) {
                    this.isAgent = response.user.role
                        try {
                            const res = await this.$http.$get(`/users/${response.user.id}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${response.token}`,
                                },
                            })
                            if(res.id === response.user.id && this.isAgent === 'superadmin' || this.isAgent === 'agent') {
                                try {
                                    const expireToken = JSON.parse(atob(response.token.split('.')[1])).exp;
                                    const currentTime = Math.floor(Date.now() / 1000)
                                    const newPath = this.$route.path.endsWith('/login/') ? this.$route.path.slice(0, -1) : this.$route.path;
                                    if (expireToken < currentTime) {
                                        this.$store.commit('userAuth/SET_TOKEN', null)
                                        localStorage.removeItem('token')
                                        this.$toast.error('Your token has expired!');
                                        return this.$router.push('/login');
                                    } else if (newPath === '/login') {
                                        this.$store.dispatch('userAuth/login', response.token)
                                        this.$store.commit('userAuth/SET_TOKEN', response.token)
                                        this.$root.$emit("updateHeader");
                                        this.$toast.success('Logged in successfully');
                                        return this.$router.push('/er/dashboard');
                                    }
                                } catch (err) {
                                    this.$store.commit('userAuth/SET_TOKEN', null)
                                    localStorage.removeItem('token', )
                                    return this.$router.push('/login')
                                }
                                this.$store.commit('userAuth/SET_USERS', res)
                            } else {
                                return this.$toast.error('You are not a admin or agent');
                            }
                        } catch (error) {
                            console.log(error)
                        }
                } else {
                    return this.$toast.error('Something went wrong');
                }
            } catch (error) {
                this.invalidEmailPass = error
                console.log(error);
                if(error){
                    return this.$toast.error('Invalid email or password');
                }
            } finally {
                this.loading = false;
            }
        },
    },
  }
</script>
<style scoped>
.login-screen {
    width: 100%;
    padding-bottom: 50px;
}
.login-screen .logo {
    width: 250px;
    margin: 0 auto;
}
.login-screen .logo img {
    width: 100%;
    height: auto;
}
.login-screen .form {
    max-width: 320px;
    margin: 0 auto;
    padding: 20px;
}
.login-screen .form h2 {
    color: #0e6998;
    margin-bottom: 20px;
    text-align: center;
}
.login-screen .form h4 {
    color: #ff5252;
    margin-bottom: 10px;
    text-align: center;
}
.login-screen .form label {
    font-weight: 700;
}
.login-screen .form .row .col {
    padding-left: 0;
    padding-right: 0;
}
.login-screen .form .v-input {
    height: 55px;
    margin-top: 5px;
}
.login-screen .form .login-btn {
    width: 100%;
    margin-top: 10px;
    font-weight: 700;
    color: #fff;
    text-transform: capitalize;
}
.login-screen .form a{
    width: 100%;
}
.login-screen .form .reset-password {
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
