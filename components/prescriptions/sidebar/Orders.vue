<template>
<div>
    <div class="main-sidebar">
        <Sidebar />
        <div class="right-sidebar">
            <v-card v-if="orders">
                <v-card>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Created At</th>
                            <th>Order Id(Uuid)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.id">
                            <td>{{ order.from_user.first_name }}</td>
                            <td>{{ order.from_user.last_name }}</td>
                            <td>{{ order.from_user.email }}</td>
                            <td>{{ order.from_user.phone }}</td>
                            <td>{{ formatDate(order.created_at) }}</td>
                            <td>
                                <nuxt-link :to="localePath(`/er/${order.uuid}`)">
                                    {{ order.uuid }}
                                </nuxt-link>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </v-card>
                <!-- paginaton -->
                <v-divider></v-divider>
                <div v-if="orders.length" class="pagination">
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
        </div>
    </div>
</div>
</template>
<script>
import moment from 'moment';
import Sidebar from './Sidebar.vue';
export default {
    components: { Sidebar },
    data: () => ({
        orders: null,
        pageNum: 1,
        perPage: 10,
        totalPage: 0,
        filterNextPro: null,
    }),
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
                // getOrder
            try {
                const response = await this.$http.$get('/orders/', {
                    headers: {
                        hash: process.env.HASH,
                    },
                });
                this.orders = response.results;
                this.totalPage = Math.ceil(response.count / 10);
            } catch (error) {
                this.$nuxt.context.error(error);
            }
        },
        handlePageChange() {
            this.filterNextOrders(this.pageNum);
        },
        async filterNextOrders(pageNo) {
            if (pageNo !== '') {
            this.filterNextPro = pageNo;
            } else {
            this.filterNextPro = this.filterNextPro + 1;
            }
            // get NextLink orders
            try {
            const response = await this.$http.$get(
                `/orders/?page=${this.filterNextPro}&per_page=${this.perPage}`,
                {
                headers: {
                    hash: process.env.HASH,
                },
                },
            );
            this.orders = response.results;
            } catch (error) {
            this.$nuxt.context.error(error);
            }
        },
         // format date created_at
         formatDate(createdAt) {
            return moment(createdAt).format('YYYY-MM-DD hh:mm:ss');
        }
    }
}
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
table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 96%;
    margin: 0 20px;
    margin-top: 35px;
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
table tbody tr td a {
    color: unset;
}
table tbody tr td a:hover {
    color: #2fba8f;
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
table tbody tr td:last-child {
    text-decoration: underline;
    cursor: pointer;
}
.loader {
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
}

@media only screen and (max-width: 992px) {
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
      content: "First Name:";
    }
  
    td:nth-of-type(2):before {
      content: "Last Name:";
    }
  
    td:nth-of-type(3):before {
      content: "Email:";
    }
  
    td:nth-of-type(4):before {
      content: "Phone Number:";
    }
  
    td:nth-of-type(5):before {
        content: "Created At:";
    }
  
    td:nth-of-type(6):before {
      content: "Order Id(Uuid):";
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