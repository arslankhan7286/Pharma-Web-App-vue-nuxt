<i18n lang="json5">
  {
  en: {
  '1': 'Payment Method',
  '2': 'Cash',
  '3': 'Knet/Credit Card',
  '23': "I have read and accept erxa's ",
  '24': ' Privacy Policy',
  '25': 'and',
  '26': ' Terms & Conditions',
  '27': ' ',
  '28': 'Close',
  '29': 'You must confirm this option to continue.',
  },
  ar: {
  '1': 'طريقة الدفع',
  '2': ' نقداً ',
  '3': 'كي نت - بطاقة ائتمانية',
  '23': ' أقر بقراءة وقبول',
  '24': 'سياسية الخصوصية',
  '25': 'و',
  '26': ' شروط الاستخدام',
  '27': 'الخاصة باركسا',
  '28': 'إغلاق',
  '29': 'يجب تأكيد هذا الخيار للمتابعة.',
  },
  }
</i18n>

<template>
  <v-container class="vendor-register">
    <v-stepper v-model="stepNumber">
      <v-stepper-header>
        <v-stepper-step :editable="parseInt(stepNumber) > 1" step="1"> Proposal</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :editable="parseInt(stepNumber) > 2" step="2">
          Choose Your Package
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3"> Thank You</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1" class="px-0">
        <v-container>
          <v-card tile>
            <v-card-title> Read and sign your offer</v-card-title>
            <v-divider />
            <v-card-text>
              <div class="ma-5">
                <v-row> Dear Sir/Madam,</v-row>
                <br />
                <br />
                <v-row>
                  We are pleased to submit herewith our proposal for the digital platform services that
                  are provided through Erxa.
                </v-row>
                <br />
                <br />
                <v-row>
                  Erxa is a novel concept that acts as an intermediary between doctors, pharmaceutical
                  suppliers and patients to sell medical products and materials. It is a one-stop-shop
                  for anyone looking for medical supplies. Whether they are looking for; a) convenience
                  and prefer ordering the required item from the comfort of their home, or b) efficiency
                  since they like to compare prices of anything they buy to make sure they get the best
                  deals! We are glad to present to you the below process of how the application works.
                </v-row>
                <br />
                <br />
                <v-row>
                  1. Vendors will list their products in the application with the prices and will choose
                  the type of subscription that they want to have which will be saved and uploaded for
                  them.
                </v-row>
                <v-row>
                  2. The doctors can browse these products and prescribe patients with the required and
                  suitable products.
                </v-row>
                <v-row>
                  3. Customers will receive a link via SMS which will direct them to a webpage in order
                  to finalize their order by providing delivery information and payment details.The
                  application also facilitates the payment process through a secured gateway which can be
                  done through the app or with CoD basis.
                </v-row>
                <v-row>
                  4. Orders made by customers will be sent to you on a daily basis for preparation and
                  delivery to the company's delivery center.
                </v-row>
                <v-row>
                  5. Orders will be dispatched to customers within 24 hours at the address confirmed by
                  the customer.
                </v-row>
                <v-row>
                  6. The payment to vendors will be made on a monthly basis after the deduction of agreed
                  commission.
                </v-row>
                <v-row>
                  <v-col cols="1"></v-col>
                  <v-col cols="10">
                    <v-img :src="require('static/images/vendor-signup/p1.png')"></v-img>
                  </v-col>
                  <v-col cols="1"></v-col>
                </v-row>
                <v-row>
                  <v-col cols="1"></v-col>
                  <v-col cols="10">
                    <v-img :src="require('static/images/vendor-signup/p2.png')"></v-img>
                  </v-col>
                  <v-col cols="1"></v-col>
                </v-row>
                <v-row>
                  <v-col cols="1"></v-col>
                  <v-col cols="10">
                    <v-img :src="require('static/images/vendor-signup/p3.png')"></v-img>
                  </v-col>
                  <v-col cols="1"></v-col>
                </v-row>
                <br />
                <br />
                <br />
                <v-row>
                  <v-col cols="6">
                    <div class="ml-10">
                      <v-row>Kindly feel free to contact us for any queries on above.</v-row>
                      <br />
                      <v-row>With kind regards,</v-row>
                      <br />
                      <br />
                      <v-row>Dr. Mohammad Almogahwi</v-row>
                      <v-row>CEO & Founder</v-row>
                      <v-row>Erxa General Trading</v-row>
                      <v-row>
                        <v-col cols="4">
                          <v-img :src="require('static/images/vendor-signup/signature.png')"></v-img>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div>
                      <v-row>Kindly feel free to contact us for any queries on above.</v-row>
                      <br />
                      <v-row>Your Name,</v-row>
                      <br />
                      <br />
                      <v-row>
                        <v-text-field
                          v-model="firstName"
                          :rules="[v => !!v || 'This Field is required']"
                          dense
                          clearable
                          :clear-icon="mdiDelete"
                          color="#30bc8f"
                          label="First Name"
                          name="First Name"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field
                          v-model="middleName"
                          clearable
                          :clear-icon="mdiDelete"
                          color="#30bc8f"
                          label="Middle Name"
                          name="Middle Name"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field
                          v-model="lastName"
                          :rules="[v => !!v || 'This Field is required']"
                          dense
                          clearable
                          :clear-icon="mdiDelete"
                          color="#30bc8f"
                          label="Last Name"
                          name="Last Name"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          dense
                          clearable
                          :clear-icon="mdiDelete"
                          color="#30bc8f"
                          label="Email"
                          name="Email"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field
                          v-model="company"
                          :rules="[v => !!v || 'This Field is required']"
                          dense
                          color="#30bc8f"
                          clearable
                          :clear-icon="mdiDelete"
                          label="Company Name"
                          name="Company Name"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template #activator="{ on }">
                            <v-text-field
                              v-model="date"
                              label="Date"
                              readonly
                              :rules="[rules.required]"
                              clearable
                              :clear-icon="mdiDelete"
                              dense
                              color="#30bc8f"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="#30bc8f" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="#30bc8f" @click="$refs.menu.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
          <v-btn
            color="#30bc8f"
            :disabled="!firstName || !lastName || !email || !date || !company"
            class="continue-btn"
            @click="changeStep"
          >
            Accept
          </v-btn>
          <v-btn color="#30bc8f" class="continue-btn" @click="stepNumber = 3"> Decline</v-btn>

        </v-container>
      </v-stepper-content>
      <v-stepper-content step="2" class="px-0">
        <v-container>
          <v-row>
            <v-col cols="12" class="px-2">
              <v-card>
                <v-card-title>Choose Your Package</v-card-title>
                <v-card-subtitle>Select the Package You Want</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                  <v-select
                    v-model="selectedPlan"
                    :items="plans"
                    return-object
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    color="#30bc8f"
                    label="Choose a Plan"
                    name="Choose a Plan"
                  ></v-select>
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template #activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Date"
                        readonly
                        dense
                        outlined
                        color="#30bc8f"
                        :rules="[rules.required]"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="#30bc8f" @click="menu2 = false">Cancel</v-btn>
                      <v-btn text color="#30bc8f" @click="$refs.menu2.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-text-field
                    v-model="company"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    color="#30bc8f"
                    label="Company Name"
                    name="Company Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="position"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    color="#30bc8f"
                    label="Position"
                    name="Position"
                  ></v-text-field>
                  <v-text-field
                    v-model="civil"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    color="#30bc8f"
                    label="Civil Id"
                    name="Civil Id"
                  ></v-text-field>
                  <v-text-field
                    v-model="country"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    color="#30bc8f"
                    label="Country"
                    name="Country"
                  ></v-text-field>
                  <v-autocomplete
                    ref="city"
                    v-model="city"
                    :loading="showCitiesLoading"
                    :disabled="showCitiesLoading"
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    :rules="[v => !!v || 'This Field is required']"
                    color="#30bc8f"
                    :item-text="$i18n.locale === 'ar' ? 'name_ar' : 'name'"
                    :item-value="$i18n.locale === 'ar' ? 'name_ar' : 'name'"
                    item-color="#30bc8f"
                    :items="citiesList"
                    label="Area"
                    name="Area"
                  >
                  </v-autocomplete>

                  <!-- Block -->
                  <v-text-field
                    ref="block"
                    v-model="block"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    color="#30bc8f"
                    label="Block"
                    name="Block"
                  ></v-text-field>

                  <!-- Street -->
                  <v-textarea
                    ref="streetAddress"
                    v-model="street"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    clearable
                    :clear-icon="mdiDelete"
                    outlined
                    auto-grow
                    color="#30bc8f"
                    label="Street"
                    name="Street"
                    row-height="10"
                  ></v-textarea>

                  <!-- Avenue -->
                  <v-text-field
                    ref="avenue"
                    v-model="avenue"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    color="#30bc8f"
                    label="Avenue"
                    name="Avenue"
                  ></v-text-field>

                  <!-- House/building -->
                  <v-text-field
                    ref="building"
                    v-model="building"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    :clear-icon="mdiDelete"
                    clearable
                    outlined
                    color="#30bc8f"
                    label="Building"
                    name="Building"
                  ></v-text-field>

                  <!-- Floor -->
                  <v-text-field
                    ref="floor"
                    v-model="floor"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    :clear-icon="mdiDelete"
                    clearable
                    outlined
                    color="#30bc8f"
                    label="Floor"
                    name="Floor"
                  >
                  </v-text-field>

                  <!-- Apartment -->
                  <v-text-field
                    ref="officeNumber"
                    v-model="officeNumber"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    :clear-icon="mdiDelete"
                    clearable
                    outlined
                    color="#30bc8f"
                    label="Office Number"
                    name="Office Number"
                  ></v-text-field>

                  <!-- Additional directions -->
                  <v-text-field
                    ref="directions"
                    v-model="directions"
                    :rules="[]"
                    dense
                    :clear-icon="mdiDelete"
                    clearable
                    outlined
                    color="#30bc8f"
                    label="Additional Directions"
                    name="Additional Directions"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    :rules="[v => !!v || 'This Field is required']"
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    color="#30bc8f"
                    label="Email"
                    name="Email"
                  ></v-text-field>
                  <v-text-field
                    v-model="license_number"
                    :rules="licenceRule"
                    dense
                    outlined
                    :clear-icon="mdiDelete"
                    clearable
                    color="#30bc8f"
                    label="Trading license number"
                    name="Trading license number"
                  ></v-text-field>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/1.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/2.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/3.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/4.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/5.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/6.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/7.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/8.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/9.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/10.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/11.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/12.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/13.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/14.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/15.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/16.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/17.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/18.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/19.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/20.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/21.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/22.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/23.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                      <v-img :src="require('static/images/vendor-signup/subscription/24.png')"></v-img>
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <!-- Privacy Policy -->
            <v-col cols="12" class="pb-5">
              <!-- Privacy Policy Checkbox  -->
              <v-checkbox
                ref="acceptPrivacypolicy"
                v-model="acceptPrivacypolicy"
                dense
                :rules="[isCheckedRule]"
                color="#30bc8f"
                @change="acceptPrivacypolicy = true"
              >
                <template #message="{ message }">{{ $t(message) }}</template>
                <template #label>
                  <div class="text-body-2 text-md-body-1">
                    <span class="black--text">I have read and accept erxa's </span>
                    <span class="primary--text" @click="privacyPolicyModal = true"> Privacy Policy</span>
                    <span class="black--text">and</span>
                    <span class="primary--text" @click="termsModal = true"> Terms & Conditions</span>
                    <span class="black--text"> </span>
                  </div>
                </template>
              </v-checkbox>

              <!-- Privacy Policy Modal -->
              <v-dialog v-model="privacyPolicyModal" persistent scrollable max-width="700px">
                <v-card v-if="privacyPolicyModal" rounded="lg">
                  <v-card-text>
                    <PrivacyPolicyText />
                  </v-card-text>

                  <v-card-actions class="d-flex justify-space-between">
                    <v-checkbox v-model="acceptPrivacypolicy" dense color="black">
                      <template #label>
                    <span class="font-weight-bold text-caption text-md-body-1"
                    >I have read and accept erxa's Privacy Policy</span
                    >
                      </template>
                    </v-checkbox>

                    <v-btn
                      text
                      outlined
                      color="#30bc8f"
                      class="rounded-lg"
                      @click="privacyPolicyModal = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>

            <!-- Terms and Conditions -->
            <v-col cols="12" class="py-0">
              <!-- Terms and Conditions Checkbox  -->

              <!-- Terms and Conditions Modal -->
              <v-dialog v-model="termsModal" persistent scrollable max-width="700px">
                <v-card v-if="termsModal" rounded="lg">
                  <v-card-text>
                    <TermsText />
                  </v-card-text>

                  <v-card-actions class="d-flex justify-space-between">
                    <v-checkbox v-model="acceptPrivacypolicy" dense color="black">
                      <template #label>
                    <span class="font-weight-bold text-caption text-md-body-1">
                      I have read and accept erxa's Term & Conditions
                    </span>
                      </template>
                    </v-checkbox>

                    <v-btn text outlined color="primary" class="rounded-lg" @click="termsModal = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-btn
            color="#30bc8f"
            class="continue-btn"
            :disabled="
              !selectedPlan ||
              !date ||
              !company ||
              !position ||
              !civil ||
              !country ||
              !city ||
              !block ||
              !street ||
              !avenue ||
              !building ||
              !floor ||
              !officeNumber ||
              !email ||
              !license_number ||
              !acceptPrivacypolicy
            "
            @click="changeStep"
          >
            Continue
          </v-btn>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="3" class="px-0">
        <v-container>
          <v-row>
            <v-col cols="12" class="px-2">
              <v-card>
                <v-card-title>Thank You</v-card-title>
                <v-card-subtitle>Thank you for taking the time and filling these out</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>Please confirm. We will contact you within 7 working days.</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-btn
            :loading="loading"
            color="#30bc8f"
            class="continue-btn"
            :disabled="disableConfirm"
            @click="confirm"
          >
            Confirm
          </v-btn>
        </v-container>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>
<script>
import { mdiEye, mdiEyeOff, mdiAttachment, mdiDelete } from '@mdi/js';
import { vendorRegister } from '~/mixins/vendorSignup/vendorRegister';
import PrivacyPolicyText from '@/components/privacy-policy/PrivacyPolicyText.vue';
import TermsText from '@/components/expert-signup/Terms.vue';

export default {
  components: {
    PrivacyPolicyText,
    TermsText,
  },
  mixins: [vendorRegister],
  data: () => ({
    mdiEye,
    mdiEyeOff,
    mdiAttachment,
    mdiDelete,
    show1: false,
  }),
  async mounted() {
    await this.getCities()
  },
};
</script>
<style lang="scss">
.vendor-register {
  padding-top: 50px;
  padding-bottom: 50px;
  .v-stepper__step--active span{
    background-color: #30bc8f !important;
  }
  .primary--text {
    color: #30bc8f !important;
  }

  #tokenform {
    input {
      width: 100% !important;
      height: 40px !important;
    }
  }

  .continue-btn {
    color: #fff !important;
    margin-top: 20px;
    float: right;
    width: 155px;
    padding: 23px 0 !important;
    margin: 20px;
  }
}

.v-stepper__wrapper {
  height: auto !important;
}

@media only screen and (max-width: 767px) {
  .gift-program-card-row {
    .col {
      max-width: 100%;
      flex: 100%;
    }
  }
  .vendor-register {
    .v-stepper__content {
      .v-card__title {
        word-break: break-word;
      }
    }
  }
}
</style>
