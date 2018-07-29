function memoize(fn) {
  const cachedRequest = {};
  return function memoized(...args) {
    const req = JSON.stringify(args);
    if (!cachedRequest[req]) {
      cachedRequest[req] = fn(...args);
    }
    return cachedRequest[req];
  };
}

module.exports = memoize;
