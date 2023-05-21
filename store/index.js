export const state = () => ({
  cookieTermsAccepted: false,
  globalSnackbar: false,
  globalSnackbarText: null,
  globalSnackbarColor: null,
  globalSnackbarTimeout: null,
  globalSnackbarAction: null,
  globalSnackbarActionText: null,
});

export const mutations = {
  checkCookieTermsStatus(state) {
    const cookieTermsStatus = localStorage.getItem('cookieTermsAccepted');
    if (cookieTermsStatus) {
      state.cookieTermsAccepted = true;
    } else {
      state.cookieTermsAccepted = false;
    }
  },
  updateCookieTermsAccepted(state, payload) {
    if (typeof payload !== 'boolean') {
      throw new TypeError('payload should be boolean');
    }

    localStorage.setItem('cookieTermsAccepted', payload);
    state.cookieTermsAccepted = payload;
  },
  showGlobalSnackbar(state, payload) {
    state.globalSnackbar = true;

    state.globalSnackbarText = payload.text || '';
    state.globalSnackbarTimeout = payload.timeout || 5000;
    state.globalSnackbarAction = payload.action || null;
    state.globalSnackbarActionText = payload.actionText || 'Retry';
    state.globalSnackbarColor = payload.color || 'black';
  },
  hideGlobalSnackbar(state) {
    state.globalSnackbar = false;
  },
};

export const actions = {
  nuxtServerInit({ commit }, context) {},
};

export const getters = {};

export const modules = {};

export const plugins = [];
