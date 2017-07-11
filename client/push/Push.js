export default class Push {
  constructor() {
    /* Token to use for push notification */
    this._token = 0;
  }

  addPushToServer(token) {
    this._token = token;
  }

  getPushFromServer() {
  }

  createNotification(title, options) {
  }

  closeNotification() {
  }
}
