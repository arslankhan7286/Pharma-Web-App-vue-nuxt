export const state = () => ({
  firstName: null,
  lastName: null,
  emailAddress: null,
  streetAddress: null,
  province: null,
  city: null,
  block: null,
  phone: null,
  contact_phone: null,
  avenue: null,
  house: null,
  floor: null,
  apartment: null,
  directions: null,
  zipOrPostalCode: null,
  sameBillingAndShipping: false,
  createAccount: false,
  acceptPolicy: true,
  deliveryCharges: 0,
  purchaseId: null,
});

export const mutations = {
  updateAcceptPolicy(state, payload) {
    state.acceptPolicy = !payload;
  },
  updateFirstName(state, payload) {
    state.firstName = payload;
  },
  updateFloor(state, payload) {
    state.floor = payload;
  },
  updateApartment(state, payload) {
    state.apartment = payload;
  },
  updateDirections(state, payload) {
    state.directions = payload;
  },
  updateLastName(state, payload) {
    state.lastName = payload;
  },
  updateEmailAddress(state, payload) {
    state.emailAddress = payload;
  },
  updateStreetAddress(state, payload) {
    state.streetAddress = payload;
  },
  updateProvince(state, payload) {
    state.province = payload;
  },
  updateCity(state, payload) {
    state.city = payload;
  },
  updateDeliveryCharges(state, payload) {
    state.deliveryCharges = payload;
  },
  updateAvenue(state, payload) {
    state.avenue = payload;
  },
  updateHouse(state, payload) {
    state.house = payload;
  },
  updateBlock(state, payload) {
    state.block = payload;
  },
  updatePhone(state, payload) {
    state.phone = payload;
  },
  updateContact(state, payload) {
    state.contact_phone = payload
  },
  updateZipOrPostalCode(state, payload) {
    state.zipOrPostalCode = payload;
  },
  updateSameBillingAndShipping(state, payload) {
    state.sameBillingAndShipping = payload;
  },
  updateCreateAccount(state, payload) {
    state.createAccount = payload;
  },
  updatePurchaseId(state, payload) {
    state.purchaseId = payload;
  },
};

export const actions = {};

export const getters = {};
