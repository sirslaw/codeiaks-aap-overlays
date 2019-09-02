function addZeroes(value) {

  var new_value = (value * 1) + '';
  pos = new_value.indexOf('.');

  if (pos == -1) {
    new_value = new_value + '.00';
  } else {

    var integer = new_value.substring(0, pos);
    var decimals = new_value.substring(pos + 1);

    while (decimals.length < 2) decimals = decimals + '0';

    new_value = integer + '.' + decimals;

  };

  return new_value;

};

var key = document.querySelector('#houses-script').getAttribute('token');
var loc = document.querySelector('#houses-script').getAttribute('loc');

var viewerName, amountString, userMessage;

if (loc === 'sl') {

  viewerName = document.querySelector('#name').textContent;
  amountString = document.querySelector('#amount').textContent;
  userMessage = document.querySelector('#alert-user-message').textContent;

} else if (loc === 'se') {

};

var amount = amountString.replace('$', '');
var amountPoints = addZeroes((amount)).replace('.', '');

fetch('https://codeiaks-houses-api.herokuapp.com/grizzly/overlays/get/viewer?token=' + key + '&name=' + viewerName, {
  method: "GET",
  json: true,
  headers: { 'Content-Type': 'application/json' }
}).then(async (data) => {
  if (data.type === 'cors') {

    var response = (await data.json());
    var payload = response.data;

    if (response.ok) {

      var houseName = payload.name;
      var houseHTMLString = "";
      var viewerNameHTMLString = "";
      var amountHTMLString = "";
      var houseBanner = payload.image;

      var alertImage, alertMessage, alertUserMessage;

      houseHTMLString += "<span style='color:" + payload.color + ";'>";
      amountHTMLString += "<span style='color:" + payload.color + ";'>";
      viewerNameHTMLString += "<span style='color:" + payload.color + ";'>";

      for (var i = 0; i < amount.length; i++) {
        amountHTMLString += "<span class='animated-letter wiggle'>" + amount[i] + "</span>";
      };

      for (var i = 0; i < viewerName.length; i++) {
        if (viewerName[i] === " ") viewerNameHTMLString += "<span>&nbsp;</span>";
        viewerNameHTMLString += "<span class='animated-letter wiggle'>" + viewerName[i] + "</span>";
      };

      for (var i = 0; i < houseName.length; i++) {
        if (houseName[i] === " ") houseHTMLString += "<span>&nbsp;</span>";
        houseHTMLString += "<span class='animated-letter wiggle'>" + houseName[i] + "</span>";
      };

      houseHTMLString += "</span>";
      viewerNameHTMLString += "</span>";
      amountHTMLString += "</span>";

      var alertMessageHTMLString = viewerNameHTMLString + " cheered " + amountHTMLString + " for <br>" + houseHTMLString + "!";

      if (loc === 'sl') {

        alertImage = document.querySelector('#alert-image').innerHTML;
        alertMessage = document.querySelector('#alert-message').innerHTML;
        alertUserMessage = document.querySelector('#alert-user-message').innerHTML;
        alertUserMessageChild = document.querySelector('#alert-user-message-child').innerHTML;

        alertImage = '<img src="' + houseBanner + '" alt="" style="height: 250px;margin-top:115px !important;" />';
        alertMessage = alertMessageHTMLString;
        alertUserMessage = alertUserMessageChild;

      } else if (loc === 'se') {

      };

    } else {

      if (loc === 'sl') {

        document.querySelector('#alert-message').innerHTML = document.querySelector('#alert-message-child').innerHTML;
        document.querySelector('#alert-user-message').innerHTML = document.querySelector('#alert-user-child').innerHTML;

      } else if (loc === 'se') {

      };

    };

  };
});