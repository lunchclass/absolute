function base64UrlToUint8Array(base64UrlData) {
  const padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
  const base64 = (base64UrlData + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const buffer = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i);
  }
  return buffer;
}

function uint8ArrayToBase64Url(uint8Array, start, end) {
  start = start || 0;
  end = end || uint8Array.byteLength;

  const base64 = window.btoa(
    String.fromCharCode.apply(null, uint8Array.subarray(start, end)));
  return base64
    .replace(/\=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function cryptoKeyToUrlBase64(publicKey, privateKey) {
  const promises = [];
  promises.push(
    crypto.subtle.exportKey('jwk', publicKey)
    .then(function(jwk){
      const x = base64UrlToUint8Array(jwk.x);
      const y = base64UrlToUint8Array(jwk.y);

      const publicKey = new Uint8Array(65);
      publicKey.set([0x04], 0);
      publicKey.set(x, 1);
      publicKey.set(y, 33);
      return publicKey;
    })
  );

  promises.push(
    crypto.subtle
      .exportKey('jwk', privateKey)
    .then(function(jwk) {
      return base64UrlToUint8Array(jwk.d);
    })
  );

  return Promise.all(promises)
  .then(function(exportedKeys) {
    return {
      public: uint8ArrayToBase64Url(exportedKeys[0]),
      private: uint8ArrayToBase64Url(exportedKeys[1]),
    };
  });
}

function generateNewKeys() {
  return crypto.subtle.generateKey({name: 'ECDH', namedCurve: 'P-256'},
    true, ['deriveBits'])
  .then(function(keys) {
    return cryptoKeyToUrlBase64(keys.publicKey, keys.privateKey);
  });
}

function updateKeys() {
  var storedKeys = getStoredKeys();
  var promiseChain = Promise.resolve(storedKeys);
  if (!storedKeys) {
    promiseChain = generateNewKeys()
    .then(function(newKeys) {
      storeKeys(newKeys);
      return newKeys;
    });
  }
  return promiseChain.then(function(keys) {
  });
}

function clearKeys() {
  window.localStorage.removeItem('server-keys');
}

function storeKeys(keys) {
  window.localStorage.setItem('server-keys', JSON.stringify(keys));
}

function getStoredKeys() {
  const storage = window.localStorage.getItem('server-keys');
  if (storage) {
  	console.log(JSON.parse(storage));
    return JSON.parse(storage);
  }

  return null;
}

