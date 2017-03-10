(function (window) {
  function sendDeepLink() {
    const intentURI = [
      'intent://nadongguri.com/wedding#Intent',
      'scheme=https',
      'S.browser_fallback_url=http://nadongguri.com/wedding',
      'end',
    ].join(';');

    window.location.href = intentURI;
  }
  function isLatestWebView() {
    return /Version\/[.0-9]* Chrome\/[.0-9]*/.test(navigator.userAgent);
  }
  function isAndroidDevice() {
    return /Android/.test(navigator.userAgent);
  }
  function isSamsungBrowser() {
    return /SamsungBrowser/.test(navigator.userAgent);
  }
  function isChrome() {
    return /Chrome/.test(navigator.userAgent);
  }
  function goToWeddingSite() {
    window.location.href = 'http://nadongguri.com/wedding';
  }

  const deeplink = {
    createBrowser() {
      if (isAndroidDevice()) {
        if (isLatestWebView() || (!isSamsungBrowser() && !isChrome())) {
          sendDeepLink();
        } else {
          goToWeddingSite();
        }
      } else {
        goToWeddingSite();
      }
    },
  };
  window.deeplink = deeplink;
}(window));
