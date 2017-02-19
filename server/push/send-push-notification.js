var serverKey = 'AAAA9Ox3NIQ:APA91bHy8IWmLJ-KTWdHO2KvsozbWDhPygNw5av9ukQWj8SomTAbOEOLD73BetiQlFQpF6nbhgBn9fNVex-_9rYZ5vhrLxiJtt8BgivtI9S0mEeW-BpmVVvGJ_PU6-tfvT-Ka9rvzf3Xmjxpk9CIauyljMYs2sebOg'

exports.sendFCMNotification = function (clientToken) {
  console.log("Send push notification");
  const request = require('request');
  const jsonHeader = {
    "Authorization" : "key=" + serverKey,
    "Content-Type" : "application/json"
  };

  const jsonBody = {
    "notification": {
    "title": "Portugal vs. Denmark",
    "body": "Sent from absolute!",
    "icon": "firebase-icon.png",
    "click_action": "http://localhost:8081"
    },
    "to": clientToken
    //"to": "fr2TvLfLHhI:APA91bG9lTP5o2xPRJ9ZK4iV7S2Nnd1scFuEjp8CtDw3gKgrAOJAb8MYhvFoKn9lHNqpf0vZdVPKPp5CjWZT13b7uAEljdJbRrbGS4CYrfIM4JVb0iJJayZoBIz4bhmaxo_iE8ke0zh4"
  };

  request({
    url : 'https://fcm.googleapis.com/fcm/send',
    method : "POST",
    json : true,
    headers : jsonHeader,
    body : jsonBody
  }, function (error, response, body){
    //console.log(response);
  });
};
