(function (window) {
  var orderFrame = document.createElement('iframe');
  var iImg = document.createElement('img');
  var iSend = document.createElement('button');
  var iText = document.createElement('input');

  /**
   * API to control order UI.
   */
  var orderPage = {
    /**
     * Initialization of order page.
     * @param String Text to be displayed on order page.
     */
    pageLoad(welcomeText) {
      orderFrame.onload = function () {
        var doc = orderFrame.contentDocument || orderFrame.contentWindow.document;
        var iCenter = document.createElement('center');
        var iCancle = document.createElement('button');
        var iBrImg = document.createElement('br');
        var iBrText = document.createElement('br');

        orderFrame.style.position = 'fixed';
        orderFrame.style.width = '0px';
        orderFrame.style.height = '0px';
        orderFrame.style.top = '0px';
        orderFrame.style.left = '0px';
        orderFrame.style.zIndex = -1;

        iImg.style.width = '250px';

        iText.style.width = '250px';
        iText.setAttribute('type', 'text');
        iText.style.margin = '10px 0px 10px 0px';
        iText.value = welcomeText;
        iText.onfocus = function () {
          iText.value = null;
        };

        iSend.innerHTML = 'Send';
        iSend.style.borderRadius = '4px';
        iSend.style.color = 'white';
        iSend.style.backgroundColor = '#F06D00';
        iSend.style.margin = '0px 10px 0px 0px';
        iSend.style.border = '0px';

        iCancle.innerHTML = 'Cancle';
        iCancle.style.borderRadius = '4px';
        iCancle.style.color = 'white';
        iCancle.style.backgroundColor = '#F06D00';
        iCancle.style.border = '0px';
        iCancle.onclick = function () {
          orderFrame.style.zIndex = -1;
          orderFrame.style.width = '0px';
          orderFrame.style.height = '0px';
        };

        iCenter.appendChild(iImg);
        iCenter.appendChild(iBrImg);
        iCenter.appendChild(iText);
        iCenter.appendChild(iBrText);
        iCenter.appendChild(iSend);
        iCenter.appendChild(iCancle);
        doc.body.appendChild(iCenter);
      };

      document.getElementsByTagName('body')[0].appendChild(orderFrame);
    },
    /**
     * Api to display the order page.
     * @param canvas Image to be displayed on the page.
     * @param callback Function The function to be called
     *        when the Send button is pressed.
     */
    show(canvas, callback) {
      iSend.onclick = callback;
      iImg.src = canvas.toDataURL();
      orderFrame.style.zIndex = 1000;
      orderFrame.style.width = '100%';
      orderFrame.style.height = '100%';
    },
    /**
     * Api to hide the order page.
     */
    hide() {
      orderFrame.style.zIndex = -1;
      orderFrame.style.width = '0px';
      orderFrame.style.height = '0px';
    },
    /**
     * Get user message.
     * @return String Text from user.
     */
    getMessage() {
      return iText.value;
    },
  };

  window.orderPage = orderPage;
}(window));
