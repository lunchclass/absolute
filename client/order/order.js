(function (global, factory) {
  'use strict';	
  /*eslint-disable */
  global.ordering = new factory(global, global.document)();
  /*eslint-enable */
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var ordering = function () {
	var self = this;
    console.log("debug: order-api");
	
	function initInfo() {
		var content = {
            data: "",
			contentType: ""		
        };
		
		var itemList = [{
            name: "",
            count: "",
            amount: "",
        }];
		
		var info = {
            userId: "",
            items: itemList,
            totalAmount: "",
            image: content,
            orderDate: "",
            options: "",
        }		
		
		return info;
	}
	
	function readContent(dataUrl, done) {
		var reader  = new FileReader();
		reader.readAsDataURL(dataUrl);
		
		reader.onload = function(e) {
            var content = e.target.result;
			//FIXME:
		    var contentType = "image/jpeg";
            console.log(content);
			done(content, contentType);
        };
	}
	
	function o(data, contentType)
	
    function sendOrder(dataUrl) {
        readData(dataUrl, );
		
	    var json = JSON.stringify(orderInfo);
	    var host = document.location.hostname;
		var port = document.location.port;
		var apiUrl="/api/order";
		var targetUrl = "//" + host + ":" + port + apiUrl;
		console.log(targetUrl);
        var xhr = new XMLHttpRequest();
	    xhr.open('post', targetUrl);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(json);
		 
		xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == XMLHttpRequest.DONE) {
			    if (xhr.status == 400) {
                    console.log("debug: wtf");
			    } else if (xhr.status == 200) {
					console.log("debug: 200 ok");
				}
			}	
		}	
    }
	
    self.order = function (json) {
      console.log('debug. called this func');
      sendOrder(dataUrl);
    };
	
  };
  return ordering;
}));
