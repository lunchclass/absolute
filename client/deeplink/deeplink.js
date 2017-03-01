(function () {
  const deeplink = {
    createBrowser(appPackage) {
      const intentURI = [
        'intent://www.nadongguri.com#Intent',
        'scheme=https',
        `package=${appPackage}`,
        'S.browser_fallback_url=https://www.nadongguri.com',
        'end',
      ].join(';');

      window.location.href = intentURI;
    },
  };
}());
