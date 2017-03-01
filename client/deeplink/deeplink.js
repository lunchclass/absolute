(function (window) {
  const deeplink = {
    createBrowser(appPackage) {
      const intentURI = [
        'intent://www.nadongguri.com#Intent',
        'scheme=https',
        `package=${appPackage}`,
        'S.browser_fallback_url=http://www.nadongguri.com/wedding',
        'end',
      ].join(';');

      window.location.href = intentURI;
    },
  };
  window.deeplink = deeplink;
}(window));
