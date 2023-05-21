export const vendorRegister = {
  data: () => ({
    stepNumber: '1',
    menu: false,
    menu2: false,
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    company: '',
    date: new Date().toISOString().substr(0, 10),
    emailRules: [
      v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
    },
    privacyPolicyModal: false,
    acceptPrivacypolicy: false,
    termsModal: false,
    plans: ['Basic Free Plan'],
    selectedPlan: 'Basic Free Plan',
    position: '',
    civil: '',
    country: '',
    city: '',
    citiesList: [],
    block: '',
    street: '',
    avenue: '',
    building: '',
    floor: '',
    officeNumber: '',
    directions: '',
    license_number: '',
    disableConfirm: false,
    loading: false,
    showCitiesLoading: false,
    licenceRule: [
      v => !!v || 'License Number is required',
      v => /[^a-zA-Z]/.test(v) || 'License number should be non alphabetic',
    ]
  }),
  methods: {
    isCheckedRule(value) {
      return value === true ? true : '29';
    },
    async sendPropSubs() {
      const res = await this.$axios.post(
        'automations/vendor/pns/',
        {
          proposal: {
            name: `${this.firstName} ${this.middleName} ${this.lastName}`.replace(/|s+/g, ''),
            email: this.email,
            company: this.company,
            date: this.date,
          },
          subscription: {
            date: this.date,
            company: this.company,
            position: this.position,
            civil: this.civil,
            address: `${this.country}, ${this.city}, ${this.block}, ${this.street}, ${this.avenue}, ${this.building}, ${this.floor}, ${this.officeNumber}, ${this.directions}`,
            email: this.email,
            license_number: this.license_number,
          },
          PPnTC: this.account_number,
          plan: this.selectedPlan,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      console.log(res)
    },
    async confirm() {
      this.loading = true;
      try {
        await this.sendPropSubs();
        this.disableConfirm = true;
        this.$toast.success('Submitted Successfully');
        this.$toast.success('We have emailed you your Proposal and Subscription');
      } catch (e) {
        console.log(e);
        this.$toast.error('error setting up Vendor');
        this.disableConfirm = false
      }
      this.loading = false
    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    changeStep() {
      if (this.stepNumber === '1') {
        if (this.validateEmail(this.email)) this.stepNumber = '2';
        else this.$toast.error('Email is not valid');
      } else if (this.stepNumber === '2') {
        this.stepNumber = '3';
      }
    },
    async getCities() {
      try {
        this.showCitiesLoading = true;
        this.citiesList = await this.$http.$get('/locations/city/', {
          headers: {
            hash: process.env.HASH,
          },
        });
        this.showCitiesLoading = false;
      } catch (error) {
        this.showCitiesLoading = false;
        this.$toast.error('error fetching cities');
      }
    },
  }
};
