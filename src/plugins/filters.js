import Vue from "vue";

function currencyFormat(
  num,
  options = {
    decimal: 0,
    separator: " ",
    after: "",
    before: ""
  }
) {
  const price = parseFloat(num)
    .toFixed(options.decimal)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${options.separator}`);

  return options.before + price + options.after;
}

function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

function pluralize(_number, one, two, five) {
  const number = parseInt(_number, 10);
  const noun = getNoun(number, one, two, five);

  return `${number} ${noun}`;
}

Vue.filter("currency", currencyFormat);
Vue.filter("pluralize", pluralize);
