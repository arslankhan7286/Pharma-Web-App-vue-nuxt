export const state = () => ({
  firstName: null,
  lastName: null,
  emailAddress: null,
  streetAddress: null,
  province: null,
  city: null,
  phone: null,
  zipOrPostalCode: null,
});

export const mutations = {
  updateFirstName(state, payload) {
    state.firstName = payload;
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
  updatePhone(state, payload) {
    state.phone = payload;
  },
  updateZipOrPostalCode(state, payload) {
    state.zipOrPostalCode = payload;
  },
};

export const actions = {};

export const getters = {};
