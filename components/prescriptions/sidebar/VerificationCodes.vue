<i18n lang="json5">
{
    en: {
    '1': 'THANK YOU',
    '2': 'Thank you for confirming your email.',
    '3': 'Go Back to Home',
    },
    ar: {
        '1': 'شكرًا لك',
        '2': 'شكرا لتأكيد بريدك الإلكتروني',
        '3': 'ارجع إلى الصفحة الرئيسية',
    },
}
</i18n>
<template>
    <div class="main-sidebar">
        <Sidebar />
        <div class="right-sidebar">
            <div class="verification-codes">
                <!-- show codes-list -->
                <div class="codes-list">
                    <v-card v-if="codes">
                        <div class="input-sec">
                            <v-row class="search-fields">
                                <!-- filter input field -->
                                <v-col cols="12" md="6">
                                    <v-text-field
                                    ref="Code"
                                    outlined
                                    color="#30BC8F"
                                    label="Code"
                                    dense
                                    v-model="search"
                                    @keyup="searchedData"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select
                                    :items="optionIsUsed"
                                    v-model="selectedIsUsed"
                                    label="Is Used"
                                    outlined
                                    dense
                                    clearable
                                    @change="searchedIsUsed"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <div class="add-verifi">
                                <nuxt-link :to="localePath('/er/dashboard/generate-verification-code')">
                                    <v-btn>
                                        <span class="plus-icon" > + </span> Add Verification
                                    </v-btn>
                                </nuxt-link>
                            </div>
                        </div>
                        <v-divider></v-divider>
                        <v-card>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Users</th>
                                        <th>Added By</th>
                                        <th>Codes</th>
                                        <th>Is Used</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="code in codes" :key="code.id">
                                        <td>{{ code.user_name }}</td>
                                        <td>{{ code.added_by_name }}</td>
                                        <td class="td" @click="openDialog(code); dialog1 = false">{{ code.code }}</td>
                                        <td>{{ code.is_used }}</td>
                                        <td>{{ formatDate(code.created_at) }}</td>
                                        <td>
                                            <v-btn @click="openDialog(code); dialog1 = false"><v-icon>{{ mdiEye }}</v-icon></v-btn>
                                            <v-btn class="del-item" @click="openDialog(code); dialog = false">X</v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </v-card>
                        <!-- paginaton -->
                        <v-divider></v-divider>
                        <div v-if="codes" class="pagination">
                            <v-container>
                            <v-row justify="center">
                                <v-col cols="8">
                                <v-container class="max-width">
                                    <v-pagination
                                    v-model="pageNum"
                                    class="my-4"
                                    :length="totalPage"
                                    @input="handlePageChange"
                                    ></v-pagination>
                                </v-container>
                                </v-col>
                            </v-row>
                            </v-container>
                        </div>
                    </v-card>
                    <div v-else class="loader">
                        <v-progress-circular
                        :size="100"
                        :width="10"
                        color="#26b675"
                        indeterminate
                        ></v-progress-circular>
                    </div>
                    <!-- open dialog for code detail -->
                    <v-dialog v-model="dialog">
                        <v-card v-if="userCode" class="card-dialog">
                            <h3 class="code-title">User Code Detail</h3>
                            <v-divider></v-divider>
                            <v-card>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Added By</th>
                                            <th>Code</th>
                                            <th>Phone</th>
                                            <th>Booked At</th>
                                            <th>Is Booked</th>
                                            <th>Is Used</th>
                                            <th>Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ userCode.user_name }}</td>
                                            <td>{{ userCode.added_by_name }}</td>
                                            <td>{{ userCode.code }}</td>
                                            <td>{{ userCode.phone }}</td>
                                            <td>{{ userCode.booked_at }}</td>
                                            <td>{{ userCode.is_booked }}</td>
                                            <td>{{ userCode.is_used }}</td>
                                            <td>{{ formatDate(userCode.created_at) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </v-card>
                            <!-- close select code detail dialog  -->
                            <v-card-actions>
                                <v-btn class="cancel-btn mod-btn" @click="dialog = false"> X </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- open dialog for delete code -->
                    <v-dialog v-model="dialog1" width="300">
                        <v-card class="card-dialog delete-dialog">
                            <h3>Do you really want to delete?</h3>
                            <v-row class="pb-4 ma-0 flex-grow-1" justify="center" justify-md="space-between" align="end">
                                <v-col class="code-btn">
                                    <v-btn class="mod-btn" @click="dialog1 = false"> No </v-btn>
                                    <v-btn class="mod-btn" @click="deleteCode"> Yes </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { mdiEye } from '@mdi/js';
import Sidebar from './Sidebar.vue';
export default {
    components: { Sidebar },
    data: () => ({
        mdiEye,
        checkbox: false,
        codes: null,
        pageNum: 1,
        perPage: 10,
        totalPage: 0,
        filterNextCode: null,
        getToken: localStorage.getItem('token'),
        optionIsUsed: ['true', 'false'],
        selectedIsUsed: null,
        search: '',
        dialog: false,
        dialog1: false,
        userCode: null,
        openGenCodeDialog: false,
    }),
    async created() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            // getVerificationCodes
            try {
                const response = await this.$http.$get('/common/list-verification-codes/', {
                    headers: {
                        'Authorization': `Bearer ${this.getToken}`,
                    },
                });
                this.codes = response.results;
                this.totalPage = Math.ceil(response.count / 10);
            } catch (error) {
                this.$nuxt.context.error(error);
            }
        },
        // open search code
        async searchedData(code) {
            try {
                const response = await this.$http.$get(`/common/list-verification-codes/?code=${code.target.value}`, {
                    headers: {
                        'Authorization': `Bearer ${this.getToken}`,
                    },
                });
                this.codes = response.results;
                if(code.target.value === ''){
                    this.fetchData();
                }
            } catch (error) {
                this.$nuxt.context.error(error);
            }
        },
        // search isUsed value
        async searchedIsUsed(isUsed) {
            try {
                const response = await this.$http.$get(`/common/list-verification-codes/?is_used=${isUsed}`, {
                    headers: {
                        'Authorization': `Bearer ${this.getToken}`,
                    },
                });
                this.codes = response.results;
                if(isUsed === '' || isUsed === null){
                    this.fetchData();
                }
            } catch (error) {
                this.$nuxt.context.error(error);
            }
        },

        // open dialog
        openDialog(code) {
            this.dialog = true;
            this.dialog1 = true;
            this.userCode = code;
        },
        // delete code
        async deleteCode() {
            try {
                await this.$http.$delete(
                `/common/verification-codes/${this.userCode.code}/`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.getToken}`,
                    },
                });
                this.$toast.success('deleted successfully');
                this.fetchData();
                this.dialog1 = false;
            } catch (error) {
                this.$nuxt.context.error(error);
            }
        },

        handlePageChange() {
            this.filterNextVerificCodes(this.pageNum);
        },

        async filterNextVerificCodes(pageNo) {
            if (pageNo !== '') {
            this.filterNextCode = pageNo;
            } else {
            this.filterNextCode = this.filterNextCode + 1;
            }
            // get NextLink orders
            try {
                const response = await this.$http.$get(
                `common/list-verification-codes/?page=${this.filterNextCode}&per_page=${this.perPage}`,
                {
                    headers: {
                            'Authorization': `Bearer ${this.getToken}`,
                        },
                });
                this.codes = response.results;
            } catch (error) {
            this.$nuxt.context.error(error);
            }
        },
        // format date created_at
        formatDate(createdAt) {
            return moment(createdAt).format('YYYY-MM-DD hh:mm:ss');
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
.right-sidebar {
    width: 80%;
    height: 100vh;
    overflow: scroll;
}
.right-sidebar .v-card {
    border: none;
    border-radius: 0;
    box-shadow: none !important;
}
.codes-list {
    padding-top: 35px;
}
.v-card {
    border: none;
    border-radius: 0;
    box-shadow: none !important;
}
table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 96%;
    margin: 0 20px;
}

table td, table th {
    padding: 8px;
    height: 60px;
    border: none;
}
table td {
    padding: 12px;
    padding-left: 0;
}
table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    padding-left: 0;
    text-transform: uppercase;
}
table thead tr {
    border-bottom: 4px solid #000;
}
table tbody tr:nth-child(odd){
    border-bottom: 1px solid #ccc;
}
table tbody tr:nth-child(even){
    border-bottom: 1px solid #000;
}
table tbody tr:last-child {
    border: none;
}
table thead tr th:last-child {
    padding-left: 24px;
}
table tbody tr td .v-btn {
    background: transparent !important;
    box-shadow: none;
    color: #2fba8f;
    cursor: pointer;
    padding: 0;
    font-weight: 600;
}
table tbody tr .td {
    cursor: pointer;
    text-decoration: underline;
}
table tbody tr .td:hover {
    color: #2fba8f;
}
table tbody tr td .del-item {
    color: red;
}
::v-deep table .v-input__control {
    margin-right: 50px;
}
::v-deep table .v-input__control .v-input__slot {
    width: 20px;
}
.loader {
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
}
.input-sec {
    display: flex;
}
.input-sec .search-fields {
    margin: 0 20px;
    width: 75%;
}
.input-sec .add-verifi {
    display: flex;
    justify-content: right;
    margin-right: 20px;
}
.input-sec .add-verifi button {
    height: 42px;
    background: #2fba8f;
    color: #fff;
    box-shadow: none;
    border-radius: 5px;
}
.input-sec .add-verifi a {
    text-decoration: none;
    color: unset;
}
.input-sec .add-verifi .plus-icon {
    margin-right: 10px;
    font-weight: 600;
}
.search-fields .col-sm-6.col-md-6.col-12 {
    padding: 0;
}
.col-sm-6.col-md-4.col-12 {
    padding: 0 !important;
}
::v-deep .v-input__control {
    margin-right: 12px;
}
::v-deep .v-input__control .v-input__slot fieldset {
    height: 50px;
}
::v-deep .v-input__control .v-input__slot .v-text-field__slot {
    height: 45px;
}
::v-deep .v-input__control .v-input__slot label {
    top: 12px;
}
::v-deep .v-input__control .v-input__slot {
    width: 220px;
}
::v-deep .v-input__control .v-input__append-inner {
    margin-top: 10px;
}
::v-deep .v-input__control .v-input__append-inner .v-input__icon--clear button {
    right: 5px;
    top: 12px;
    position: absolute;
    z-index: 9999;
    background: #fff;
}
::v-deep .v-input__control .v-input__append-inner .v-input__icon--clear button .v-icon__svg {
    height: 16px;
    width: 16px;
}
.card-dialog {
    position: relative;
}
.delete-dialog {
    padding: 24px;
}
.delete-dialog .row {
    padding: 0 !important;
}
.card-dialog h3 {
    margin-bottom: 40px;
}
.card-dialog .code-title {
    background-color: #30bc8f;
    color: #fff;
    padding: 24px;
    border-radius: 4px !important;
}
.card-dialog .code-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
}
.card-dialog .code-btn button{
    width: 80px;
    background-color: #30bc8f !important;
    color: #fff;
}
.v-sheet .v-card__actions {
    position: absolute;
    top: 10px;
    right: 10px;
}
.cancel-btn {
    color: #30bc8f;
    border: 1px solid #30bc8f;
    width: auto;
    font-weight: 600;
}
.add-gen-codes {
    position: relative;
}
.add-gen-codes .v-card__actions {
    position: absolute;
    right: 15px;
    top: 10px;
}

@media only screen and (max-width: 992px) {
    .input-sec {
        display: block;
    }
    .input-sec .add-verifi {
        display: flex;
        justify-content: left;
        margin: 0 0 20px 30px;
    }
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }
  
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
  
    tr {
      border-radius: 6px;
      box-shadow: 0px 0px 50px -3px rgb(0 0 0 / 10%);
      margin-bottom: 10px;
      padding-bottom: 20px;
    }
  
    td {
      border: none;
      border-bottom: 1px solid #ccc;
      position: relative;
      padding-left: 45% !important;
    }
  
    td:before {
      position: absolute;
      top: 12px;
      left: 12px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      font-weight: 600;
    }
  
    td:nth-of-type(1):before {
      content: "Users:";
    }
  
    td:nth-of-type(2):before {
      content: "Added By:";
    }
  
    td:nth-of-type(3):before {
      content: "Codes:";
    }
  
    td:nth-of-type(4):before {
      content: "Is Used:";
    }
  
    td:nth-of-type(5):before {
        content: "Created At:";
    }
  
    td:nth-of-type(6):before {
      content: "Actions:";
    }
    .card-dialog td:nth-of-type(3):before {
        content: "Code:";
    }
    .card-dialog td:nth-of-type(4):before {
        content: "Phone:";
    }
    .card-dialog   td:nth-of-type(5):before {
        content: "Booked At:";
    }
    .card-dialog   td:nth-of-type(6):before {
        content: "Is Booked:";
    }
    .card-dialog   td:nth-of-type(7):before {
        content: "Is Used:";
    }
    .card-dialog   td:nth-of-type(8):before {
        content: "Created At:";
    }
    table tbody tr:last-child {
        border: unset;
    }
    table tbody tr:nth-child(odd){
        border-bottom: unset;
    }
    table tbody tr:nth-child(even){
        border-bottom: unset;
    }
}
@media only screen and (max-width: 630px) {
    table {
        margin: 0 8px;
    }
}
@media only screen and (max-width: 510px) {
    .right-sidebar {
        width: 350px;
    }
    table {
        margin-top: 20px;
    }
    tr {
        padding-bottom: 50px;
    }
    td:before {
        font-size: 12px;
        top: 15px;
        left: 12px;
    }
}
</style>
