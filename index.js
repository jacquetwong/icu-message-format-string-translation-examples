'use strict';

const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Conditionally require the Intl.js Polyfill if it doesn't already exist in the runtime.
// As of Node <= 0.10, this polyfill will be required.
const IntlMessageFormat = require('intl-messageformat');

const translations = glob.sync('./resources/*.json')
    .map((filename) => [
        path.basename(filename, '.json'),
        fs.readFileSync(filename, 'utf8'),
    ])
    .map(([locale, file]) => [locale, JSON.parse(file)])
    .reduce((collection, [locale, messages]) => {
        collection[locale] = messages;
        return collection;
    }, {});

const enUsLocale = 'en-US';
const zhHantHkLocale = 'zh-Hant-HK';

// Substitution example
const helloEnglish = new IntlMessageFormat(translations[enUsLocale].app.hello, enUsLocale);
const helloChinese = new IntlMessageFormat(translations[zhHantHkLocale].app.hello, zhHantHkLocale);
console.log(helloEnglish.format({name: "Peter"}));
console.log(helloChinese.format({name: "Peter"}));

// Plural example
const bookEnglish = new IntlMessageFormat(translations[enUsLocale].app.book, enUsLocale);
const bookChinese = new IntlMessageFormat(translations[zhHantHkLocale].app.book, zhHantHkLocale);
console.log(bookEnglish.format({count: 0}));
console.log(bookEnglish.format({count: 1}));
console.log(bookChinese.format({count: 7000}));

// Gender with plural and substitution example
const sheepEnglish = new IntlMessageFormat(translations[enUsLocale].app.sheep, enUsLocale);
console.log(sheepEnglish.format({gender: "female", name: "Mary", count: 1234}));
console.log(sheepEnglish.format({gender: "male", name: "Peter", count: 0}));

// Date example
const dateEnglish = new IntlMessageFormat(translations[enUsLocale].app.date, enUsLocale);
const dateChinese = new IntlMessageFormat(translations[zhHantHkLocale].app.date, zhHantHkLocale);
console.log(dateEnglish.format({date: new Date()}));
console.log(dateChinese.format({date: new Date()}));

// Number example
const numberEnglish = new IntlMessageFormat(translations[enUsLocale].app.number, enUsLocale);
console.log(numberEnglish.format({count: 1000000}));
