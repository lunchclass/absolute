(function (window) {
  const deeplink = {
    createBrowser(appPackage) {
      const intentURI = [
        'intent://www.nadongguri.com/wedding#Intent',
        'scheme=https',
        'S.browser_fallback_url=http://www.nadongguri.com/wedding',
        'end',
      ].join(';');

      window.location.href = intentURI;
    },
  };
  window.deeplink = deeplink;
}(window));
