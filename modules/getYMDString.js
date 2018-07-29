const leftPadZero = require('./leftPadZero');

function getYMDString(d) {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();

  return `${year}${leftPadZero(month + '')}${leftPadZero(date + '')}`;
}

module.exports = getYMDString;
