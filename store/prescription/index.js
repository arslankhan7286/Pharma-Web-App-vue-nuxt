export const state = () => ({
  // checkout new prescription step state
  step: 1,
  selectedOption: null,
  pickupLocation: null,
  option: null,
  paymentMethod: null,
  user: null,
  expert: null,
  invoice: null,
  orderId: null,
  orderUUID: null,
  paymentType: null,
});

export const mutations = {
  goToNextStep(state, payload) {
    if (payload) {
      state.step = payload;
    } else {
      state.step = state.step + 1;
    }
  },
  goToPreviousStep(state, payload) {
    if (payload) {
      state.step = payload;
    } else if (state.step > 0) {
      state.step = state.step - 1;
    }
  },
  updateUser(state, payload) {
    state.user = payload;
  },
  updateExpert(state, payload) {
    state.expert = payload;
  },
  updateInvoice(state, payload) {
    state.invoice = payload;
  },
  changeSelectedOption(state, payload) {
    state.selectedOption = payload;
  },
  changePickupLocation(state, payload) {
    state.pickupLocation = payload;
  },
  changeOption(state, payload) {
    state.option = payload;
  },
  changeOrderUUID(state, payload) {
    state.orderUUID = payload;
  },
  changePaymentMethod(state, payload) {
    state.paymentMethod = payload;
  },
  updateOrderId(state, payload) {
    state.orderId = payload;
  },
  updatePaymentType(state, payload) {
    state.paymentType = payload;
  },
};

export const actions = {};

export const getters = {};
