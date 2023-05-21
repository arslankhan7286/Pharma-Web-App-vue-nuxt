export default function (context) {
  // onLanguageSwitched called right after a new locale has been set
  context.app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    // change layout if locale is 'ar
    if (newLocale === 'ar') {
      context.$vuetify.rtl = true;
    } else {
      context.$vuetify.rtl = false;
    }
  };
}
