(function (window) {
  const deeplink = {
    createBrowser() {
      const intentURI = [
        'intent://nadongguri.com/wedding#Intent',
        'scheme=https',
        'S.browser_fallback_url=http://nadongguri.com/wedding',
        'end',
      ].join(';');

      window.location.href = intentURI;
    },
  };
  window.deeplink = deeplink;
}(window));
