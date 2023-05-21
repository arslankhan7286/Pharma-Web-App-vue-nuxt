<i18n lang="json5">
  {
    en: {
      '1': 'Add Item',
      '2': 'Search Products',
    },
    ar: {
      '1': 'ضيف المنتجات',
      '2': 'يبحث المنتجات',
    },
  }
  </i18n>

  <template>
    <div class="text-center">
      <v-dialog v-model="dialog" width="820">
        <template #activator="{ on, attrs }">
          <v-btn class="add-item prod-btn" color="#0E6998" v-bind="attrs" v-on="on">
            {{ $t('1') }}
          </v-btn>
        </template>

      <v-card class="v_card">
        <v-card-title class="text-h5 item-title">
          {{ $t('2') }}
        </v-card-title>
        <v-col col="12">
          <!-- filterProduct input field -->
          <v-text-field
            :ref="$t('2')"
            :prepend-inner-icon="mdiMagnify"
            outlined
            color="#0E6998"
            :label="$t('2')"
            class="input-with-icon"
            @keyup="filterProducts"
          ></v-text-field>
        </v-col>

        <v-divider></v-divider>
        <!-- if product not search yet -->
        <div>
          <div v-if="!searchValue" class="no-record-found">
            <v-card class="no-record">
              <img :src="require('static/images/icons/search.png')" alt="" />
              <h4>Enter one or more keywords to search for products</h4>
            </v-card>
          </div>
          <!-- if prducts not found -->
          <div v-else-if="products.length === 0" class="no-record-found">
            <v-card class="no-record">
              <img :src="require('static/images/icons/search.png')" alt="" />
              <h4>No products found</h4>
            </v-card>
          </div>
          <!-- dialog for select product -->
          <div v-else class="products">
            <v-card
              v-for="product in products"
              :key="product.id"
              class="filterItem"
              @click="getSelectProduct(product)"
            >
              <div>
                <img :src="product.image" alt="" />
                <h4>{{ product.name }}</h4>
                <p class="description">{{ product.description }}</p>
                <span class="inventory_name"> {{ product.inventory_name }} </span>
              </div>
            </v-card>
          </div>
        </div>


        <!-- close select product dialoge  -->
        <v-card-actions>
          <v-btn class="cancel-btn mod-btn" @click="dialog = false"> X </v-btn>
        </v-card-actions>

        <!-- paginaton -->
        <div v-if="products.length" class="pagination">
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
    </v-dialog>

    <!-- dialog for select product -->
    <v-dialog v-model="dialog2" width="400">
      <v-card class="v_card">
        <v-card v-if="getProductOrder" class="order-item">
          <v-card-title class="text-h5 item-title">
            {{ getProductOrder.name }}
          </v-card-title>
          <img :src="getProductOrder.image" alt="" />
          <div class="dialog-desc">
            <label> Description </label>
            <p>{{ getProductOrder.description }}</p>
          </div>
          <v-divider></v-divider>
          <div class="direction">
            <v-container fluid>
              <v-textarea
                autocomplete="direction"
                label="Direction"
                v-model="directionText"
                auto-grow
                outlined
                rows="3"
                row-height="25"
              ></v-textarea>
            </v-container>
          </div>
          <div class="piece-quantity">
            <div class="piece">
              <label for="unit">Unit</label>
              <v-btn class="mod-btn"> Piece </v-btn>
            </div>
            <div class="quantity">
              <label for="quantity"> Quantity </label>
              <div class="quantity-counter">
                <button class="counter-btn" @click="decrease">-</button>
                <input :class="{ 'mod-btn': true, 'error': showError}" v-model="inputValue" @input="handleInput">
                <!-- <div v-if="showError" class="error-message">Quantity should be a positive number like 2.</div> -->
                <!-- <v-btn class="mod-btn"> {{ counter }} </v-btn> -->
                <button class="counter-btn" @click="increase">+</button>
              </div>
            </div>
          </div>
          <v-row class="pb-4 ma-0 flex-grow-1" justify="center" justify-md="space-between" align="end">
            <v-col class="quantity-btn">
              <v-btn class="mod-btn" @click="dialog2 = false"> Cancel </v-btn>
              <v-btn class="mod-btn" @click="updateOrder"> Add </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

  <script>
  import { mdiMagnify } from '@mdi/js';
  export default {
    components: {},
    data: () => ({
      dialog: false,
      dialog2: false,
      products: [],
      pageNum: 1,
      perPage: 10,
      getUuid: null,
      getOrder: null,
      productData: [],
      filterNextPro: null,
      searchValue: '',
      totalPage: 0,
      getProductOrder: null,
      inputValue: 1,
      directionText: '',
      mdiMagnify,
      showError: false,
    }),

    computed: {
      showNoResultsMessage() {
        return this.products.length === 0;
      },
      counter() {
        return parseInt(this.inputValue);
      },
    },

    methods: {
      handlePageChange() {
        this.filterNextProducts(this.pageNum);
      },

      // get products
      async filterProducts(med) {
        if (this.pageNum === this.filterNextPro) {
          this.pageNum = 1;
        }
        try {
          const response = await this.$http.$get(
            `/inventory/product/?search=${med.target.value}&page=${this.pageNum}&per_page=${this.perPage}&brand=&section=&categories=&product_ids=`,
            {
              headers: {
                hash: process.env.HASH,
              },
            },
          );
          this.products = response.results;
          this.filterNextPro = response.current_page;
          this.searchValue = med.target.value;
          this.totalPage = Math.ceil(response.count / 10);
        } catch (error) {
          this.$nuxt.context.error(error);
        }
      },

      // getSelectProduct and open dialog2
      getSelectProduct(order) {
        this.dialog2 = true;
        this.getProductOrder = order;
      },

      async filterNextProducts(pageNo) {
        if (pageNo !== '') {
          this.filterNextPro = pageNo;
        } else {
          this.filterNextPro = this.filterNextPro + 1;
        }

        // get filteredNext products
        try {
          const response = await this.$http.$get(
            `/inventory/product/?search=${this.searchValue}&page=${this.filterNextPro}&per_page=${this.perPage}&brand=&section=&categories=&product_ids=`,
            {
              headers: {
                hash: process.env.HASH,
              },
            },
          );
          this.products = response.results;
        } catch (error) {
          this.$nuxt.context.error(error);
        }
      },

      // quantity counter
      increase() {
      this.inputValue++;
      this.showError = false;
      },

      decrease() {
        this.inputValue--;
        if(this.inputValue <= 0) {
          this.showError = true;
        } else {
          this.showError = false;
        }
      },

      handleInput() {
        const inputValue = parseInt(this.inputValue);
          if (isNaN(inputValue) || inputValue <= 0) {
            this.showError = true;
          } else {
            this.showError = false;
          }
      },

      async updateOrder(value) {
        this.getUuid = this.$route.params.id;

        // getOrder
        try {
          if(this.productData){
            this.productData = [];
          }
          const response = await this.$http.$get(`/orders/${this.getUuid}/`, {
            headers: {
              hash: process.env.HASH,
            },
          });
          response.order_products.map((item) => {
            this.productData.push({
              quantity: item.quantity,
              direction: item.direction,
              product: item.product.id
            })
            return item
          });
          this.getOrder = response;
          const updateProductQuantity = this.productData.filter( item => item.product === this.getProductOrder.id);
          if(updateProductQuantity.length !== 0) {
            for(let i = 0; i<this.productData.length; i++){
              if(this.productData[i].product === this.getProductOrder.id){
                // const quantity = this.productData[i].quantity ?? 0;
                this.productData[i].quantity = this.counter;
                this.productData[i].direction = this.directionText;
              }
            }
          }
          else {
           this.productData.push({
            quantity: this.counter,
            direction: this.directionText,
            product: this.getProductOrder.id
          });
          }
        } catch (error) {
          this.$nuxt.context.error(error);
        }

        // Update Order
        try {
          const response = await this.$http.$put(`/orders/${this.getUuid}/`, {
            from_user: this.getOrder.from_user.id,
            to_user: this.getOrder.to_user.id,
            order_products: this.productData,
          },
          {
            headers: {
              hash: process.env.HASH,
            },
          });
          this.getOrder = response.order_products;
          this.dialog = false;
          this.dialog2 = false;
          this.$toast.success('Product added successfully');
          if(response) {
            this.inputValue = 1;
            this.directionText = '';
          }
          this.$emit('updateDrugsCard', (value))
        } catch (error) {
          this.$nuxt.context.error(error);
        }
      },
    },
  };
  </script>
  <style scoped>
  .v-application .text-h5 {
    font-size: 1rem !important;
    font-weight: 700;
  }
  ::v-deep .v-label {
    font-size: 14px;
  }
  .v-sheet {
    position: relative;
  }
  .v-sheet .v-card__actions {
    position: absolute;
    top: 3px;
    right: 0;
  }
  .add-item {
    width: 100%;
  }
  .item-title {
    background-color: #0e6998;
    color: #fff;
  }
  .prod-btn {
    color: #fff;
  }
  .cancel-btn {
    color: #0e6998;
    border: 1px solid #0e6998;
  }
  .v-card__actions {
    justify-content: space-between;
  }
  .v-card__actions button {
    width: 32px;
    font-weight: 600;
  }
  .filterItem {
    width: 250px;
    height: auto;
    padding: 10px;
    cursor: pointer;
    margin: 10px;
    flex: 0 0 calc(33.33% - 20px);
    text-align: center;
  }
  .no-record-found {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .no-record {
    width: 250px;
    height: auto;
    padding: 10px;
    cursor: pointer;
    text-align: center;
  }
  .no-record-found .no-record img {
    width: 100%;
  }
  img {
    width: 100%;
    height: auto;
  }
  .description {
    font-size: 14px;
    color: #a9a2a2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 22px;
  }
  .filterItem .inventory_name {
    color: #000;
    font-size: 12px;
  }
  h4 {
    font-size: 12px;
    height: 40px;
  }
  .products {
    display: flex;
    flex-wrap: wrap;
  }
  .pagination {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    text-align: center;
  }
  .order-item {
    width: 100%;
    height: auto;
    cursor: pointer;
    float: left;
    text-align: center;
    padding-bottom: 20px;
  }
  .order-item img {
    width: 200px;
    height: auto;
  }
  .order-item .description {
    text-align: initial;
    margin-left: 58px;
    height: 50px;
    color: #000;
  }
  .order-item .description p {
    font-size: 14px;
    color: #a9a2a2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 22px;
  }
  .dialog-desc {
    text-align: initial;
    margin-left: 54px;
    margin-right: 20px;
    color: #000;
    height: auto;
  }
  .dialog-desc p {
    font-size: 14px;
    color: #a9a2a2;
    height: auto ;
  }
  .order-item .item-title {
    font-size: 1em !important;
  }
  .direction {
    margin-top: 5px;
  }
  .direction .container {
    max-width: 310px;
  }
  ::v-deep .direction .v-text-field__slot {
    height: 75px;
  }
  ::v-deep .direction .v-text-field__slot .v-label {
    font-weight: bold;
    top: 6px !important;
  }
  ::v-deep .direction .v-text-field__slot .v-label--active {
    top: 18px !important;
  }
  .order-item .piece-quantity {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 20px 15px;
    margin-top: 0px;
  }
  .order-item .piece-quantity .piece{
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin-left: 8px;
  }
  .order-item .piece-quantity .quantity{
    display: flex;
    flex-direction: column;
    margin-left: 40px;
  }
  .order-item .piece-quantity label{
    padding-bottom: 10px;
  }
  .order-item .piece-quantity button{
    text-transform: initial;
  }
  .order-item .piece-quantity .quantity .quantity-counter .mod-btn {
    width: 60px;
    height: 35px;
    border: 2px solid #0e6998;
    text-align: center;
    border-radius: 4px;
    outline: none;
  }
  .order-item .piece-quantity .quantity .quantity-counter .error {
    background-color: transparent !important;
  }
  .order-item .quantity-btn {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0;
  }
  .order-item .quantity-btn button{
    width: 120px;
    background-color: #0e6998;
    color: #fff;
  }
  .order-item .quantity-counter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .order-item .quantity-counter .mod-btn {
    margin: 0 10px;
  }
  .order-item .counter-btn{
    border: 2px solid #0e6998;
    border-radius: 50%;
    color: #0e6998;
    width: 25px;
    height: 25px;
    font-weight: 700;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-with-icon .v-label {
    top: -8px;
    left: 16px;
    font-size: 14px;
  }
  ::v-deep .v-input__prepend-inner {
    margin-top: 16px !important;
  }
  ::v-deep .v-input__icon .v-icon__svg {
    height: 20px;
    width: 20px;
    color: #0e6998;
  }
  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    position: absolute;
    top: 30px;
    width: 150px;
    left: -25px;
  }

@media (max-width: 768px) {
  .products {
    justify-content: center;
  }
  .filterItem{
    flex: 0 0 calc(49.33% - 20px);
  }
}
@media (max-width: 525px) {
  .filterItem{
    flex: 0 0 calc(65% - 20px);
  }
}
@media (max-width: 400px) {
  .dialog-desc {
    max-width: 245px;
    margin: 0 auto;
  }
  .direction .container {
    max-width: 280px;
  }
}
  </style>
