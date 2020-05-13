// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const path = require('path');
const fs = require('fs');
// const {Notification} = requre('electron')

window.addEventListener('DOMContentLoaded', () => {
  function base64_encode(file) {
    // read binary data
    var file = fs.readFileSync(file);
    // convert binary data to base64 encoded string

    return new Buffer.from(file).toString('base64');
  }

  let wallet;

  try {
    wallet = base64_encode(path.join(__dirname, 'localfiles/atomexwallet.bin'));
  } catch (e) {
    console.warn(e);
  }

  if (wallet) {
    console.log(wallet);
    localStorage.setItem('wallet', JSON.stringify(wallet));
  }

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
