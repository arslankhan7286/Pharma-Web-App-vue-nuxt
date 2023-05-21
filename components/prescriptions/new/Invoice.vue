<i18n lang="json5">
{
  en: {
    '1': 'Erxa General Trading Company',
    '2': 'Sharq, Block 2, Abdullah Al Ahmad street,',
    '3': 'Invoice No :',
    '4': 'Date:',
    '5': 'Sender :',
    '6': 'Customer :',
    '7': 'No.',
    '8': 'Items',
    '9': 'Quantity',
    '10': 'Unit Price	',
    '11': 'Total KD',
    '12': 'Payment method :',
    '13': 'Status :',
    '14': 'Paid',
    '15': 'KNET',
    '16': 'Tel :',
    '17': 'Save',
    '18': 'Building 3S, Floor 2, Office 8',
    '19': 'Cash',
    '20': 'Unpaid',
    '21': 'Credit Card',
    '22': 'Address: ',
    '23': 'Additional Directions: ',
    '24': 'Code',
    '25': 'Vendor',
    '26': 'Pickup:',
    '27': 'Pickup Location: ',
    '28': 'Description',
    '29': 'Web',
    '30': 'Email',
    '31': 'Phone',
    '32': 'Total',
    '33': 'KD',
    '34': 'Occupation: ',
    '35': 'Organisation: ',
    '36': 'Directions: ',
  },
  ar: {
    '1': 'شركة اركسا للتجارة العامة ذ.م.م',
    '2': 'شرق، قطعه ٢، شارع عبدالله الاحمد',
    '3': ' رقم الفاتورة :',
    '4': 'التاريخ:',
    '5': 'المرسل :',
    '6': 'العميل :',
    '7': 'رقم',
    '8': 'المنتجات',
    '9': 'الكمية',
    '10': 'سعر الوحدة',
    '11': 'المجموع د.ك',
    '12': 'وسيلة الدفع:',
    '13': 'الحالة :',
    '14': 'مدفوع',
    '15': 'كي نت',
    '16': 'تليفون :',
    '17': 'حفظ',
    '18': 'مبنى 3S, دور ٢، مكتب ٨',
    '19': 'نقداً',
    '20': 'غير مدفوع',
    '21': 'بطاقة ائتمان',
    '22': 'العنوان: ',
    '23': 'معلومات إضافية: ',
    '24': 'الكود ',
    '25': 'بائع ',
    '26': 'يلتقط ',
    '27': 'اتجاه الاستلام: ',
    '28': 'الوصفة',
    '29': 'الويب',
    '30': 'البريد الإلكتروني',
    '31': 'هاتف',
    '32': 'المجموع',
    '33': 'د.ك',
    '34': 'وظيفة: ',
    '35': 'منظمة: ',
    '36': 'معلومات: ',
  },
}
</i18n>

<template>
  <div class="mx-auto invoice-page">
    <div class="header-content">
      <div class="date-info-sec">
        <div class="date-info-right">
          <p><b>{{ $t('3') }}</b> <span>{{ invoice.id }}</span> </p>
        </div>
        <div class="date-info-left">
          <p><b>{{ $t('4') }}</b> <span>{{ orderDate }}</span></p>
        </div>
      </div>
      <div class="head-sec">
        <div class="head-right">
          <a class="logo" href="https://www.erxa.io/"
            ><img src="https://erxa-files.s3.amazonaws.com/assets/erxa_one-no-slogan.png" alt=""
          /></a>
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <div class="clear"></div>
    <br /><br />
    <div :class="className">
      <div class="sender-right">
        <p>
          <b>{{ $t('5') }}</b><br />
          <span>{{ invoice.expert.name }}</span>
        </p>
        <p>
          <b>{{ $t('34') }}</b><br />
          <span>{{ invoice.expert.job }}</span>
        </p>
        <p>
          <b>{{ $t('35') }}</b><br />
          <span>{{ invoice.expert.organization }}</span>
        </p>
      </div>
      <div class="sender-left">
        <div >
          <p>
            <b>{{ $t('6') }}</b><br />
            <span>{{ invoice.customer.name }}</span>
          </p>
          <p>
            <span>
              <b v-if="option === 'pickup'">{{ $t('27') }}</b>
              <b v-else>{{ $t('22') }}</b><br />
            </span>
            <span v-if="option === 'pickup'"> {{ $t('2') }} {{ $t('18') }} </span>
            <span v-else> {{ invoice.customer.address }} </span>
          </p>
          <p v-if="option === 'pickup'">
            <a target="_blank" href="https://maps.app.goo.gl/jLJxbw9K8JYWZ8zG6">
              <!-- {{ invoice.location.pickupLocation }} -->
              https://maps.app.goo.gl/jLJxbw9K8JYWZ8zG6
            </a>
          </p>
          <p v-else>
            <b>{{ $t('23') }}</b><br />
            <span>{{ invoice.customer.directions }}</span>
          </p>
          <p v-if="option !== 'pickup'">
            <b>{{ $t('31') }}:</b><br /> <span> {{ invoice.customer.phone || '' }} </span>
          </p>

        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div>
      <table class="custom-table">
        <thead>
          <tr>
            <th>{{ $t('7') }}</th>
            <th>{{ $t('24') }}</th>
            <th>{{ $t('25') }}</th>
            <th>{{ $t('8') }}</th>
            <th>{{ $t('9') }}</th>
            <th>{{ $t('10') }}</th>
            <th>{{ $t('11') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, index) in invoice.products" :key="product.name">
            <td>{{ index + 1 }}</td>
            <td>{{ product.code }}</td>
            <td>{{ product.inventory }}</td>
            <td>{{ product.name ? product.name : product.description.substring(0, 100) + (product.description.length > 100 ? '...' : '') }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price_per_unit }}</td>
            <td>{{ product.price }}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="5"></td>
            <td ><b>{{ $t('32') }}</b></td>
            <td style="text-align:left;"><b>{{ invoice.total_price }} {{ $t('33') }}</b></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="payment-sec">
      <p>
        <b>{{ $t('12') }}</b>
        <span v-if="paymentMethod === 'Cash'">{{ $t('19') }}</span>
        <span v-else>
          {{ $store.state.prescription.paymentType === 'KNET' ? $t('15') : $t('21') }}
        </span>
      </p>
      <p><b>{{ $t('13') }}</b>
        <span v-if="paymentMethod === 'Cash'"> {{ $t('20') }} </span>
        <span v-else> {{ $t('14') }} </span>
      </p>
    </div>

    <footer class="no-print my-8 w100 d-flex align-center justify-center flex-column">
      <v-btn color="#30bc8f" class="rounded-lg save-btn" @click="onSave"> {{ $t('17') }} </v-btn>

      <div class="my-4">
        <!-- <v-btn color="green" :href="getWhatsappLink()" icon>
          <v-icon> {{ mdiWhatsapp }} </v-icon>
        </v-btn> -->

        <!-- <v-btn v-if="isMobile()" color="black" icon @click="onShare">
          <v-icon> {{ mdiShareVariantOutline }} </v-icon>
        </v-btn> -->
      </div>
    </footer>

    <div class="footer-sec">
      <p>
        {{ $t('2') }} {{ $t('18') }}
      </p>
    </div>
    <div class="footer-contact-info">
      <p class="web">Web: <a href="https://www.erxa.io/">www.erxa.io</a></p>
      <p class="email">Email: <a href="mailto:admin@erxa.io">admin@erxa.io</a></p>
      <p class="phone">Phone: <a href="tel:22240702">22240702</a></p>
    </div>
    <div class="overlay" v-if="loading">
      <div class="loader"></div>
  </div>
  </div>
</template>

<script>
import moment from 'moment';
import {
  // mdiWhatsapp,
  // mdiShareVariantOutline,
} from '@mdi/js';

export default {
  data: () => ({
    // mdiWhatsapp,
    // mdiShareVariantOutline,
    purchaseId: null,
    loading: false,
  }),
  computed: {
    className() {
      if (this.$i18n.locale === 'ar') {
        return 'inactive rtl';
      } else {
        return 'active';
      }
    },
    invoice() {
      return this.$store.state.prescription.invoice;
    },
    pickupLocation() {
      return this.$store.state.prescription.pickupLocation;
    },
    option() {
      let opt = this.$store.state.prescription.option;
      if (!opt) {
        opt = localStorage.getItem('option');
      }
      return opt;
    },
    orderDate() {
      return this.invoice?.created_at ? new Date(this.invoice.created_at).toLocaleString() : '';
    },
    paymentMethod() {
      return this.$store.state.prescription.paymentMethod === 'cash' ? 'Cash' : 'Card';
    },
  },
  methods: {
    formatDate() {
      return moment().format('YYYY-MM-DD');
    },
    getOrigin() {
      if(window.origin.includes('test.erxa') || window.origin.includes('localhost')) {
        return 'https://stagingapi.erxa.io'
      }

      return 'https://liveapi.erxa.io'
    },
    openEmailApp() {
      window.location.href = "mailto:" + 'admin@erxa.io';
    },
    async onSave() {
      this.purchaseId = this.$store.state.prescription.checkout.billing.purchaseId
      const lang = this.$i18n.locale
      try {
        const response = await this.$axios.get(`${this.getOrigin()}/paymentsystems/${this.purchaseId}/pdf-doc/${lang}/`,
        {
          headers: {
            hash: process.env.HASH,
          },
          responseType: 'blob',
        })
        if(response) {
          this.loading = true;
        }
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `invoice-${this.invoice.id}-${this.formatDate()}`;
        link.click()
      } catch (error) {
        console.log(error);
        if(error){
          return this.$toast.error('Something went wrong while generating invoice. Please try after some time.');
        }
      } finally {
          this.loading = false;
      }
    },
    getWhatsappLink() {
      let href = `https://web.whatsapp.com/send?text= Erxa Invoice: ${this.getPageUrl()}`;
      if (this.isMobile()) href = `whatsapp://send?text= Erxa Invoice: ${this.getPageUrl()}`;

      return href;
    },

    getPageUrl() {
      if (process.client) {
        return window.location.href;
      }
    },
    async onShare() {
      if (navigator.share) {
        await navigator.share({ title: 'Erxa Digital Prescription', url: this.getPageUrl() });
      }
    },
    isMobile() {
      if (
        navigator.share &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.invoice-page {
  width: 768px;
  padding-top: 50px;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head-left {
  float: left;
}
.sender-left {
  max-width: 230px;
  margin-left: auto;
}
.inactive .sender-left {
  max-width: 230px;
  margin-right: auto;
  margin-left: 0;
}
.sender-left a {
  color: #000 !important;
}
.head-left p {
  margin-top: 0;
  color: #7f7f7f;
  margin-bottom: 5px;
  font-size: 14px;
}
p {
  margin-top: 0;
  color: #333;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.3;
}
.sender-left p span {
  display: block;
}
/* .head-right {
  text-align: left;
} */
.logo {
  display: inline-block;
}
.logo img {
  max-width: 100px;
}
.head-sec{
  width: 250px;
}
.head-sec > span {
  display: inline-block;
  margin-top: 30px;
}
.active, .inactive {
  display: flex;
  justify-content: space-between;
}
/* .date-info-sec {
  float: left;
} */
.table-sec {
  margin: 25px 0;
}
.payment-sec {
  padding-top: 20px;
}
.payment-sec p span,
.date-info-sec p span,
.clear {
  clear: both;
}
.table-sec {
  overflow-x: auto;
}
table {
  border-collapse: collapse;
  width: 100%;
}
table thead tr th:first-child {
  width: 60px;
}
/* .date-info-right {
  margin-top: -70px;
} */
.footer-sec {
  border-top: 3px solid #5db792;
  padding-top: 6px;
  text-align: center;
  margin-top: 60px;
}
.payment-sec p span.payment-span {
  width: 120px;
  text-decoration: none;
  display: inline-block;
}

@media only screen and (max-width: 767px) {
  .head-sec {
    display: block;
  }
  /* .date-info-sec,
  .head-left,
  .head-right {
    width: 100%;
    text-align: center;
    margin: 15px 0;
  } */
  .sender-left,
  .date-info-left {
    float: none;
    width: 100%;
  }
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
@media (max-width: 902px) {
  .head-sec {
    width: 330px;
  }
  .sender-left {
    max-width: 300px;
  }
  .inactive .sender-left {
    max-width: 300px;
  }
}
@media (max-width: 576px) {
  .invoice-page {
    zoom: 0.5;
  }
  .date-info-right {
    float: none;
    width: 100%;
  }
  .inactive .sender-left {
    margin-left: 0;
    margin-right: auto;
  }
}

.custom-table {
  width: 100%;
}
.custom-table thead tr th {
  background: #2c6793;
  color: #fff;
  font-size: 14px;
  padding: 12px 10px;
  text-align: left;
}
.custom-table tbody tr td {
  border-bottom: 1px solid #dadada;
  padding: 18px 10px;
  font-size: 12px;
  text-align: left;
}
.custom-table tbody tr:nth-child(even) td {
  background-color: #f1f1f1;
}

.custom-table tfoot tr td {
  background: #2c6793;
  color: #fff;
  font-size: 16px;
  padding: 15px 10px;
  text-align: center;
}

.footer-contact-info {
  margin-top: 30px;
  margin-bottom: 20px;
}
.footer-contact-info a {
  color: #000;
}
.footer-contact-info .web {
  float: left;
  text-align: left;
  width: 33%;
}
.footer-contact-info .email {
  float: left;
  text-align: center;
  width: 34%;
}
.footer-contact-info .phone {
  float: left;
  text-align: right;
  width: 33%;
}
.save-btn {
  background-color: #0e6998 !important;
  color: #fff;
}
</style>
