(function (global, factory) {
  /*eslint-disable */
  console.log("debug: order-api");
  global.ordering = new factory(global, global.document)();
  /*eslint-enable */
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var ordering = function () {
    var self = this;
    const HOST = self.location.hostname;
    const PORT = self.location.port;
    const API_URL = '/api/order';
    const TARGET_URL = `//${HOST}:${PORT}${API_URL}`;
    const ORDER_ERROR = {
      NONE: 0,
      GENERAL: 1,
    };
    var sendOrder = function (orderData) {
      return new Promise(function (resolve, reject) {
        var json = JSON.stringify(orderData);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', TARGET_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(json);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 400) {
              reject(ORDER_ERROR.GENERAL);
            } else if (xhr.status === 200) {
              resolve(ORDER_ERROR.NONE);
            }
          }
        };
      });
    };
    var sendImage = function (orderInfo) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        const queryUrl = `${TARGET_URL}/img?userId=${orderInfo.userId}`;
        formData.append('file', orderInfo.blob);
        xhr.open('POST', queryUrl, true);
        xhr.send(formData);
        xhr.onreadystatechange = function () {
          var result;
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 400) {
              console.log('400 Error');
              reject(ORDER_ERROR.GENERAL);
            } else {
              result = JSON.parse(xhr.responseText);
              resolve(`/order/gallery/${orderInfo.userId}/${result.path}/${result.file}`);
            }
          }
        };
      });
    };

    var getMyOrder = function (userId) {
      return new Promise(function (resolve, reject) {
        var uuid = (userId === undefined ? '' : userId);
        var xhr = new XMLHttpRequest();
        var img = [];
        var result;
        var i;
        const QUERY_URL = `${TARGET_URL}?userId=${uuid}`;
        xhr.open('GET', QUERY_URL, true);
        xhr.send();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 400) {
              reject(ORDER_ERROR.GENERAL);
            } else {
              result = JSON.parse(xhr.responseText);
              console.log(result.length);
              for (i = (result.length - 1); i >= 0; i -= 1) {
                console.log(`//${HOST}:${PORT}${result[i].items[0].name}`);
                img.push(`//${HOST}:${PORT}${result[i].items[0].name}`);
              }
              resolve(img);
            }
          }
        };
      });
    };
    function Content(data, contentType) {
      this.data = data;
      this.contentType = contentType;
    }

    function Info() {
      this.userId = '';
      /*eslint-disable */
      this.items;
      /*eslint-enable */
      this.blob = '';
      this.option = '';
    }

    function Item() {
      this.name = '';
      this.count = 0;
      this.amount = 0;
    }

    function OrderData() {
      this.userId = '';
      this.items = [];
      this.totalAmount = 0;
      this.image = new Content('', '');
      this.orderDate = new Date();
      this.options = '';
    }

    OrderData.prototype.init = function (userId, item, option) {
      var index = 0;
      this.userId = userId;

      if (item instanceof Array) {
        this.items = item;
      } else if (item instanceof Item) {
        this.items.push(item);
      } else {
        throw new Error(200, 'Ivalid Type OrderInfo.items');
      }

      if (this.items.length > 0) {
        for (index = 0; index < this.items.length; index += 1) {
          if (this.items[index] instanceof Item) {
            this.totalAmount += this.items[index].amount;
          } else {
            throw new Error(200, 'Ivalid Type OrderInfo.items');
          }
        }
      }

      if (option !== 'undefined' || option !== null) {
        console.log(option);
        this.options = option;
      }
    };

    function loadBlob(orderData, blob) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onload = function (e) {
          var data = e.target.result;
          var contentType = blob.type;
          orderData.image.data = data;
          orderData.image.contentType = contentType;
          resolve(orderData);
        };

        reader.onerror = function (e) {
          var error = e.target.error;
          reject(error);
        };
      });
    }

    // PUBLIC OBJ
    self.OrderInfo = Info;
    self.OrderItem = Item;

    // PUBLIC API
    self.order = function (OrderInfo) {
      return new Promise(function (resolve, reject) {
        var orderData = new OrderData();
        orderData.init(OrderInfo.userId, OrderInfo.items, OrderInfo.option);

        if (OrderInfo.blob instanceof Blob) {
          // loadBlob(orderData, OrderInfo.blob).then(function (data) { return sendOrder(data); })
          //                         .then(function (e) { resolve(e); });
          sendImage(OrderInfo).then(function (path) {
            console.log(path);
            orderData.items[0].name = path;
            return sendOrder(orderData);
          }).then(function (e) { resolve(e); });
        } else {
          sendOrder(orderData).then(function (e) { resolve(e); }, function (e) { reject(e); });
        }
      });
    };

    self.orderList = function (userId) {
      return new Promise(function (resolve, reject) {
        getMyOrder(userId).then(function (img) {
          resolve(img);
        }, function (e) {
          reject(e);
        });
      });
    };
  };
  return ordering;
}));
