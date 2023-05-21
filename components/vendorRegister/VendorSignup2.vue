<template>
  <v-container class="vendor-register">
    <v-stepper v-model="stepNumber">
      <v-stepper-header>
        <v-stepper-step :editable="parseInt(stepNumber) > 1" step="1">
          Forming a relationship
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :editable="parseInt(stepNumber) > 2" step="2">
          List your products
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :editable="parseInt(stepNumber) > 3" step="3">
          Be visible to your customers
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4"> Thank You</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1" class="px-0">
        <v-container>
          <v-row>
            <v-col cols="12" class="px-2">
              <v-card tile>
                <v-card-title>Company</v-card-title>
                <v-card-subtitle>Enter Company Details</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="companyName"
                        :rules="['required']"
                        dense
                        clearable
                        outlined
                        color="#30bc8f"
                        label="Company Name"
                        name="Company Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="companyNameAr"
                        :rules="['required']"
                        dense
                        clearable
                        outlined
                        color="#30bc8f"
                        label="Company Name in Arabic"
                        name="Company Name in Arabic"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    v-model="country"
                    :rules="['required']"
                    dense
                    outlined
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
                    clearable
                    :rules="['required']"
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
                    :rules="['required']"
                    dense
                    outlined
                    clearable
                    color="#30bc8f"
                    label="Block"
                    name="Block"
                  ></v-text-field>

                  <!-- Street -->
                  <v-textarea
                    ref="streetAddress"
                    v-model="street"
                    :rules="['required']"
                    dense
                    clearable
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
                    :rules="['required']"
                    dense
                    outlined
                    clearable
                    color="#30bc8f"
                    label="Avenue"
                    name="Avenue"
                  ></v-text-field>

                  <!-- House/building -->
                  <v-text-field
                    ref="building"
                    v-model="building"
                    :rules="['required']"
                    dense
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
                    :rules="['required']"
                    dense
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
                    :rules="['required']"
                    dense
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
                    clearable
                    outlined
                    color="#30bc8f"
                    label="Additional Directions"
                    name="Additional Directions"
                  ></v-text-field>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="companyEmail"
                        :rules="['required']"
                        dense
                        clearable
                        outlined
                        color="#30bc8f"
                        label="Company Email"
                        name="Company Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="companyPhone"
                        :rules="['required']"
                        dense
                        clearable
                        outlined
                        color="#30bc8f"
                        label="Company Phone Number"
                        name="Company Phone Number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <form>
                    <input
                      ref="trade"
                      type="file"
                      accept="application/pdf, image/*"
                      hidden
                      multiple
                      @change="listTradeLicense"
                    />
                    <v-select
                      v-model="tradeLicense"
                      :items="tradeLicense"
                      chips
                      readonly
                      :prepend-icon="mdiAttachment"
                      multiple
                      item-text="name"
                      return-object
                      label="Click Upload Button to Upload Trade License"
                      @click="$refs.trade.click()"
                      @click:prepend="$refs.trade.click()"
                    >
                      <template #selection="{ attrs, item, select, selected }">
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="removeFile(item)"
                        >
                          {{ item.name }}
                        </v-chip>
                      </template>
                    </v-select>
                    <input
                      ref="authSig"
                      type="file"
                      accept="application/pdf, image/*"
                      hidden
                      multiple
                      @change="listAuthSignatory"
                    />
                    <v-select
                      v-model="authorizedSignatory"
                      :items="authorizedSignatory"
                      chips
                      readonly
                      :prepend-icon="mdiAttachment"
                      multiple
                      item-text="name"
                      return-object
                      label="Click Upload Button to Upload Authorized Signatory files"
                      @click="$refs.authSig.click()"
                      @click:prepend="$refs.authSig.click()"
                    >
                      <template #selection="{ attrs, item, select, selected }">
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="removeAuthSignatory(item)"
                        >
                          {{ item.name }}
                        </v-chip>
                      </template>
                    </v-select>
                    <input ref="digLogo" type="file" accept="image/*" hidden multiple @change="listDigLogo" />
                    <v-select
                      v-model="digitalLogo"
                      :items="digitalLogo"
                      chips
                      readonly
                      :prepend-icon="mdiAttachment"
                      multiple
                      item-text="name"
                      return-object
                      label="Click Upload Button to Upload Digital Logo"
                      @click="$refs.digLogo.click()"
                      @click:prepend="$refs.digLogo.click()"
                    >
                      <template #selection="{ attrs, item, select, selected }">
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="removeDigLogo(item)"
                        >
                          {{ item.name }}
                        </v-chip>
                      </template>
                    </v-select>
                  </form>
                  <v-divider></v-divider>
                  <br />
                  <v-row><h3 class="ml-4">Working Hours (24 format) ie: from 08:00 to 22:00</h3></v-row>
                  <br />
                  <br />
                  <v-row v-for="day in Object.keys(workingHours)" :key="day">
                    <v-col cols="3">
                      <h4 class="ml-4">{{ day }}</h4>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="workingHours[day].from"
                        outlined
                        label="From"
                        name="From"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="workingHours[day].to"
                        outlined
                        label="To"
                        name="To"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card tile>
                <v-card-title>Bank</v-card-title>
                <v-card-subtitle>Enter your Account Details</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                  <v-text-field
                    v-model="bankDetails.bank_name"
                    outlined
                    :rules="['required']"
                    label="Bank Name"
                    name="Bank Name"
                  ></v-text-field>
                  <v-row>
                    <v-col cols="7">
                      <v-text-field
                        v-model="bankDetails.iban_number"
                        outlined
                        :rules="['required']"
                        label="IBAN"
                        name="IBAN"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        v-model="bankDetails.account_number"
                        outlined
                        :rules="['required']"
                        label="Account Number"
                        name="Account Number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card tile>
                <v-card-title>Admin User</v-card-title>
                <v-card-subtitle>Enter the Admin User Credentials</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                  <v-text-field
                    v-model="admin.name"
                    outlined
                    :rules="['required']"
                    label="Name"
                    name="Name"
                  ></v-text-field>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="admin.username"
                        outlined
                        :rules="['required']"
                        label="Username"
                        name="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="admin.password"
                        outlined
                        label="Password"
                        name="Password"
                        :append-icon="show1 ? mdiEye : mdiEyeOff"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="admin.email"
                        :rules="['required']"
                        outlined
                        label="Email"
                        name="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="admin.phone"
                        outlined
                        label="Phone Number"
                        name="Phone Number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="admin.position"
                        outlined
                        :rules="['required']"
                        label="Position"
                        name="Position"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="admin.office_number"
                        outlined
                        label="Office Number"
                        name="Office Number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="admin.street"
                        outlined
                        label="Street"
                        name="Street"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="admin.city"
                        outlined
                        label="City"
                        name="City"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3"></v-col>
            <v-col cols="2 vendor-btn">
              <NuxtLink to="/tnc" target="_blank">Term & Conditions</NuxtLink>
            </v-col>
            <v-col cols="2">
              <v-checkbox
                v-model="TermAndConditions"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3"></v-col>
            <v-col cols="2 vendor-btn">
              <NuxtLink to="/pp" target="_blank">Privacy Policy</NuxtLink>
            </v-col>
            <v-col cols="2">
              <v-checkbox
                v-model="PrivacyPolicy"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-btn
            color="#30bc8f"
            :disabled="!TermAndConditions || !PrivacyPolicy"
            class="continue-btn"
            @click="changeStep"
          >
            Continue
          </v-btn>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="2" class="px-0">
        <v-container>
          <v-row>
            <v-col cols="12" class="px-2">
              <v-card>
                <v-card-title>List your products</v-card-title>
                <v-card-subtitle
                >Please Download an excel sheet and fill up and upload it back
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                  <a
                    href="https://erxa-image.s3.ir-thr-at1.arvanstorage.com/products-template.xlsx"
                    target="_blank"
                  >
                    <v-btn>Download xls Sheet</v-btn>
                  </a>
                  <v-file-input v-model="file" label="Choose a XLS file" accept=".xls, .xlsx">
                  </v-file-input>
                </v-card-text>
              </v-card>
              <v-card>
                <v-card-title>MOH Certificates</v-card-title>
                <v-card-subtitle
                >Please Upload MOH certificates (Images and Pdf files only)
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                  <form>
                    <input
                      ref="moh"
                      type="file"
                      accept="application/pdf, image/*"
                      hidden
                      multiple
                      @change="listMOH"
                    />
                    <v-select
                      v-model="MOH"
                      :items="MOH"
                      chips
                      readonly
                      :prepend-icon="mdiAttachment"
                      multiple
                      item-text="name"
                      return-object
                      label="Click Upload Button to Upload MOH Files"
                      @click="$refs.moh.click()"
                      @click:prepend="$refs.moh.click()"
                    >
                      <template #selection="{ attrs, item, select, selected }">
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="removeMOH(item)"
                        >
                          {{ item.name }}
                        </v-chip>
                      </template>
                    </v-select>
                  </form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-btn
            color="#30bc8f"
            class="continue-btn"
            :disabled="!file || !MOH.length"
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
                <v-card-title>Be visible to your customers</v-card-title>
                <v-card-subtitle>Please Add Company Logo, picture</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                  <form>
                    <input
                      ref="bi"
                      type="file"
                      accept="image/*"
                      hidden
                      multiple
                      @change="listBI"
                    />
                    <v-select
                      v-model="imageFiles"
                      :items="imageFiles"
                      chips
                      readonly
                      :prepend-icon="mdiAttachment"
                      multiple
                      item-text="name"
                      return-object
                      label="Click Upload Button to Upload Brand, Items and Company Pictures"
                      @click="$refs.bi.click()"
                      @click:prepend="$refs.bi.click()"
                    >
                      <template #selection="{ attrs, item, select, selected }">
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="removeBI(item)"
                        >
                          {{ item.name }}
                        </v-chip>
                      </template>
                    </v-select>
                  </form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-btn color="#d5242c" class="continue-btn" @click="changeStep"> Continue</v-btn>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="4" class="px-0">
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
  import { mdiEye, mdiEyeOff, mdiAttachment } from '@mdi/js';
  import { vendorRegister2 } from '~/mixins/vendorSignup/vendorRegister2';

  export default {
    mixins: [vendorRegister2],
    data: () => ({
      mdiEye,
      mdiEyeOff,
      mdiAttachment,
      show1: false,
    }),
    async mounted() {},
  };
</script>
<style lang="scss">
  .vendor-register {
    padding-top: 50px;
    padding-bottom: 50px;

    .v-stepper__step--active span {
      background-color: #30bc8f !important;
    }

    #tokenform {
      input {
        width: 100% !important;
        height: 40px !important;
      }
    }
    .vendor-btn a{
      color: #30bc8f;
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
