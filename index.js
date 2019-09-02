function addZeroes(value) {
    var new_value = value * 1;
    new_value = new_value + '';
    pos = new_value.indexOf('.');
    if (pos == -1) new_value = new_value + '.00';
    else {
        var integer = new_value.substring(0, pos);
        var decimals = new_value.substring(pos + 1);
        while (decimals.length < 2) decimals = decimals + '0';
        new_value = integer + '.' + decimals;
    };
    return new_value;
};

var key = 'A50C460E-055A-4EFD-864B-4D68F94199F6';
var viewerName = document.querySelector('#name').textContent;
var amountString = document.querySelector('#amount').textContent;
var userMessage = document.querySelector('#alert-user-message').textContent;
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

      document.querySelector('#alert-image').innerHTML = '<img src="' + houseBanner + '" alt="" style="height: 250px;margin-top:115px !important;" />';

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

      document.querySelector('#alert-message').innerHTML = alertMessageHTMLString;
      document.querySelector('#alert-user-message').innerHTML = document.querySelector('#alert-user-message-child').innerHTML;

    } else {

      document.querySelector('#alert-message').innerHTML = document.querySelector('#alert-message-child').innerHTML;
      document.querySelector('#alert-user-message').innerHTML = document.querySelector('#alert-user-child').innerHTML;

    };

  };
});
