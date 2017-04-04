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
        var iCancel = document.createElement('button');
        var br = document.createElement('br');

        orderFrame.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        orderFrame.style.position = 'fixed';
        orderFrame.style.width = '0px';
        orderFrame.style.height = '0px';
        orderFrame.style.top = '0px';
        orderFrame.style.left = '0px';
        orderFrame.style.zIndex = -1;

        iImg.style.width = '250px';

        iText.style.width = '250px';
        iText.style.margin = '10px 0px 10px 0px';
        iText.setAttribute('type', 'text');
        iText.setAttribute('placeholder', welcomeText);

        iSend.innerHTML = 'SEND';
        iSend.style.borderRadius = '4px';
        iSend.style.color = 'white';
        iSend.style.fontSize = '16px';
        iSend.style.backgroundColor = '#FF8400';
        iSend.style.margin = '0px 10px 0px 0px';
        iSend.style.width = '120px';
        iSend.style.height = '40px';
        iSend.style.border = '0px';

        iCancel.innerHTML = 'CANCEL';
        iCancel.style.borderRadius = '4px';
        iCancel.style.color = 'white';
        iCancel.style.fontSize = '16px';
        iCancel.style.backgroundColor = '#FF8400';
        iCancel.style.width = '120px';
        iCancel.style.height = '40px';
        iCancel.style.border = '0px';
        iCancel.onclick = function () {
          orderFrame.style.zIndex = -1;
          orderFrame.style.width = '0px';
          orderFrame.style.height = '0px';
        };

        iCenter.appendChild(br.cloneNode());
        iCenter.appendChild(br.cloneNode());
        iCenter.appendChild(iImg);
        iCenter.appendChild(br.cloneNode());
        iCenter.appendChild(iText);
        iCenter.appendChild(br.cloneNode());
        iCenter.appendChild(iSend);
        iCenter.appendChild(iCancel);
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
