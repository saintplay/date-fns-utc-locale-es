var buildFormattingTokensRegExp = require('./_lib/build_formatting_tokens_reg_exp.js');

function buildFormatLocale() {
  var months3char = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var monthsFull = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var weekdays2char = ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sa'];
  var weekdays3char = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  var weekdaysFull = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var meridiemUppercase = ['AM', 'PM'];
  var meridiemLowercase = ['am', 'pm'];
  var meridiemFull = ['a.m.', 'p.m.'];

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return months3char[date.getUTCMonth()];
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return monthsFull[date.getUTCMonth()];
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return weekdays2char[date.getUTCDay()];
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return weekdays3char[date.getUTCDay()];
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return weekdaysFull[date.getUTCDay()];
    },

    // AM, PM
    'A': function (date) {
      return (date.getUTCHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0];
    },

    // am, pm
    'a': function (date) {
      return (date.getUTCHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0];
    },

    // a.m., p.m.
    'aa': function (date) {
      return (date.getUTCHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0];
    }
  };

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W'];

  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date));
    };
  });

  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  };
}

function ordinal(number) {
  return number + 'º';
}

module.exports = buildFormatLocale;
