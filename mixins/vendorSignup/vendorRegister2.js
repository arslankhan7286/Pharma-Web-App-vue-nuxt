export const vendorRegister2 = {
  data: () => ({
    stepNumber: '1',
    menu: false,
    menu2: false,
    pDate: new Date().toISOString().substr(0, 10),
    admin: {
      username: '',
      email: '',
      phone: '',
      password: '',
      name: '',
      position: '',
      office_number: '',
      street: '',
      city: '',
    },
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
    },
    emailRules: [
      v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    companyName: '',
    companyNameAr: '',
    country: '',
    citiesList: [],
    city: '',
    block: '',
    street: '',
    avenue: '',
    building: '',
    floor: '',
    officeNumber: '',
    directions: '',
    companyEmail: '',
    companyPhone: '',
    workingHours: {
      Monday: { from: '', to: '' },
      Tuesday: { from: '', to: '' },
      Wednesday: { from: '', to: '' },
      Thursday: { from: '', to: '' },
      Friday: { from: '', to: '' },
      Saturday: { from: '', to: '' },
      Sunday: { from: '', to: '' },
    },
    bankDetails: {
      bank_name: '',
      iban_number: '',
      account_number: '',
    },
    TermAndConditions: false,
    PrivacyPolicy: false,
    validSecondStep: false,
    plans: ['Basic Free Plan'],
    selectedPlan: 'Basic Free Plan',
    subscription: {
      date: new Date().toISOString().substr(0, 10),
      company: '',
      position: '',
      civil: '',
      address: '',
      email: '',
      license_number: '',
    },
    file: null,
    imageFiles: [],
    MOH: [],
    tradeLicense: [],
    authorizedSignatory: [],
    digitalLogo: [],
    disableConfirm: false,
    loading: false,
    showCitiesLoading: false,
  }),
  methods: {
    listTradeLicense() {
      for (let i = 0; i < this.$refs.trade.files.length; i++) {
        if (!this.tradeLicense.includes(this.$refs.trade.files[i])) {
          this.tradeLicense.push(this.$refs.trade.files[i]);
        } else {
          this.$toast.info('File already Selected');
        }

      }
    },
    removeFile(item) {
      const index = this.tradeLicense.indexOf(item);
      if (index > -1) {
        this.tradeLicense.splice(index, 1);
      }
    },
    listAuthSignatory() {
      for (let i = 0; i < this.$refs.authSig.files.length; i++) {
        if (!this.authorizedSignatory.includes(this.$refs.authSig.files[i])) {
          this.authorizedSignatory.push(this.$refs.authSig.files[i]);
        } else {
          this.$toast.info('File already Selected');
        }
      }
    },
    removeAuthSignatory(item){
      const index = this.authorizedSignatory.indexOf(item);
      if (index > -1) {
        this.authorizedSignatory.splice(index, 1);
      }
    },
    listDigLogo() {
      for (let i = 0; i < this.$refs.digLogo.files.length; i++){
        if (!this.digitalLogo.includes(this.$refs.digLogo.files[i])) {
          this.digitalLogo.push(this.$refs.digLogo.files[i]);
        } else {
          this.$toast.info('File already Selected')
        }
      }
    },
    removeDigLogo(item){
      const index = this.digitalLogo.indexOf(item);
      if (index > -1) {
        this.digitalLogo.splice(index, 1);
      }
    },
    listMOH() {
      for (let i = 0; i < this.$refs.moh.files.length; i++){
        if (!this.MOH.includes(this.$refs.moh.files[i])) {
          this.MOH.push(this.$refs.moh.files[i]);
        } else {
          this.$toast.info('File already Selected')
        }
      }
    },
    removeMOH(item) {
      const index = this.MOH.indexOf(item);
      if (index > -1) {
        this.MOH.splice(index, 1);
      }
    },
    listBI() {
      for (let i = 0; i < this.$refs.bi.files.length; i++) {
        if (!this.imageFiles.includes(this.$refs.bi.files[i])) {
          this.imageFiles.push(this.$refs.bi.files[i]);
        } else {
          this.$toast.info('File already Selected')
        }
      }
    },
    removeBI(item){
      const index = this.imageFiles.indexOf(item);
      if (index > -1) {
        this.imageFiles.splice(index, 1);
      }
    },
    validateSecondStep(){
      const arr = [
        this.companyName,
        this.companyNameAr,
        this.officeNumber,
        this.street,
        this.companyEmail,
        this.companyPhone,
        this.bankDetails.bank_name,
        this.bankDetails.account_number,
        this.bankDetails.iban_number,
        this.admin.name,
        this.admin.email,
        this.admin.password,
        this.admin.position,
        this.TermAndConditions,
        this.PrivacyPolicy
      ];
      if (arr.some(el => !el)) {
        return false;
      }
      if (!this.tradeLicense.length || !this.authorizedSignatory.length || !this.digitalLogo.length) {
        this.$toast.info('Trade License, Authorized Signatory and Digital Log are required');
        return false;
      }
      return true;
    },
    async confirm() {
      this.loading = true;
      try {
        await this.uploadTradeLicense();
        await this.uploadFile();
        await this.uploadMOH();
        await this.uploadImages();
        await this.uploadInventory();
        this.disableConfirm = true;
        this.$toast.success('Submitted Successfully');
        this.$toast.success('We have emailed you your Proposal and Subscription');
      } catch (e) {
        console.log(e)
        this.$toast.error('error setting up Vendor');
        this.disableConfirm = false
      }
      this.loading = false
    },
    async uploadInventory() {
      this.subscription.company = this.company;
      const res = await this.$axios.post(
        'automations/vendor/register/',
        {
          company_name: this.companyName,
          company_name_ar: this.companyNameAr,
          office_number: this.officeNumber,
          street: this.street,
          city: this.city,
          company_email: this.companyEmail,
          company_phone: this.companyPhone,
          working_hours: this.workingHours,
          proposal: {
            name: this.pName,
            email: this.pEmail,
            company: this.company,
            date: this.pDate
          },
          subscription: this.subscription,
          admin: this.admin,
          bank_details: this.bankDetails,
          tnc: this.TermAndConditions,
          pp: this.PrivacyPolicy,
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
    async uploadFile(){
      const data = new FormData()
      data.append('company_name', this.companyName)
      data.append('file', this.file);
      const res = await this.$axios.post(
        'automations/file/',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(res)
    },
    async uploadTradeLicense(){
      const data = new FormData()
      data.append('company_name', this.companyName)
      this.tradeLicense.map(file => data.append('list_media', file))
      this.authorizedSignatory.map(file => data.append('list_media', file))
      this.digitalLogo.map(file => data.append('list_media', file))
      const res = await this.$axios.post(
        'automations/trade-license/',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(res)
    },
    async uploadMOH(){
      const data = new FormData()
      data.append('company_name', this.companyName)
      this.MOH.map(file => data.append('list_media', file))
      const res = await this.$axios.post(
        'automations/moh/',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(res)
    },
    async uploadImages(){
      if (!this.imageFiles.length) return;
      const data = new FormData()
      data.append('company_name', this.companyName)
      this.imageFiles.map(file => data.append('list_media', file))
      const res = await this.$axios.post(
        'automations/images/',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(res)
    },
    changeStep() {
      // this.stepNumber = `${parseInt(this.stepNumber) + 1}`;
      if (this.stepNumber === '1') {
        const validateEmail = () => {
          return String(this.pEmail)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
        if (validateEmail()) this.stepNumber = '2';
        else this.$toast.error('Email is not valid')
      } else if (this.stepNumber === '2') {
        if (this.validateSecondStep()) {
          this.stepNumber = '3';
        }
        else {this.$toast.error("Please fill out required fields")}
      } else if (this.stepNumber === '3') {
        this.stepNumber = '4';
      } else if (this.stepNumber === '4') {
        this.stepNumber = '5'
      } else if (this.stepNumber === '5') {
        this.stepNumber = '6'
      }
    },
  }
};
