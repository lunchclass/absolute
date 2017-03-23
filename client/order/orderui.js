(function (window) {
  var orderFrame = document.createElement("iframe");
  var iImg = document.createElement("img");
  var iSend = document.createElement("button");
  var iText = document.createElement("input");

  /**
   * API for control order ui
   */
  var orderPage = {
    /**
     * Initialization of rrder page.
     * @param String Text to be displayed on order page.
     */
    pageLoad(welcomeText) {
      orderFrame.onload = function() {
        var doc = orderFrame.contentDocument || orderFrame.contentWindow.document;
        var iCenter = document.createElement("center");
        var iCancle = document.createElement("button");
        var iP = document.createElement("p");
        var br1 = document.createElement("br");
        var br2 = document.createElement("br");
        var br3 = document.createElement("br");

        orderFrame.style.position="absolute";
        orderFrame.style.width="0px";
        orderFrame.style.height="0px";
        orderFrame.style.top="0px";
        orderFrame.style.left="0px";
        orderFrame.style.zIndex=-1;

        iP.innerHTML=welcomeText;
        iImg.style.width="100%"
        iText.style.width="100%";
        iText.setAttribute("type", "text");
        iSend.innerHTML="Send";
        iCancle.innerHTML="Cancle";
        iCancle.onclick = function() {
          orderFrame.style.zIndex=-1;
          orderFrame.style.width="0px";
          orderFrame.style.height="0px";
        }

        iCenter.appendChild(iImg);
        iCenter.appendChild(br1);
        iCenter.appendChild(iP);
        iCenter.appendChild(br2);
        iCenter.appendChild(iText);
        iCenter.appendChild(br3);
        iCenter.appendChild(iSend);
        iCenter.appendChild(iCancle);
        doc.body.appendChild(iCenter);
      };

      document.getElementsByTagName("body")[0].appendChild(orderFrame);
    },
    /**
     * Hide the order page.
     * @param canvas Image to be displayed on the page.
     * @param callback Function The function to be called
     *        when the Send button is pressed.
     */
    show(canvas, callback) {
      iSend.onclick = callback;
      iImg.src = canvas.toDataURL();
      orderFrame.style.zIndex=10;
      orderFrame.style.width="100%";
      orderFrame.style.height="100%";
    },
    /**
     * Hide the order page.
     */
    hide() {
      orderFrame.style.zIndex=-1;
      orderFrame.style.width="0px";
      orderFrame.style.height="0px";
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
