const waitForTimeout = (ms) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, ms);
});

export default waitForTimeout;
