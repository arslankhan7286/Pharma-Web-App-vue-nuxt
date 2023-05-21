export const state = () => ({
  mobileNumber: null,
  orders: [],
});

export const mutations = {
  updateMobileNumber(state, payload) {
    state.mobileNumber = payload;
  },
  updateOrders(state, payload) {
    state.orders = payload;
  },
};
