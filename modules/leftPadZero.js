function leftPadZero(str, padCnt = 1) {
  return str.length < 2 ? new Array(padCnt).fill(0) + str : str;
}

module.exports = leftPadZero;
