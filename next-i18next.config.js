const path = require('path');
const i18n = require('next-i18next');

const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
  },
  localePath: path.resolve('./public/locales'),
};

module.exports = i18nConfig;
