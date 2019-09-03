var initGiftSubAlert = function () {

  var key = document.querySelector('#houses-script').getAttribute('token');
  var loc = document.querySelector('#houses-script').getAttribute('loc');

  if (!viewerName || !amountString || !userMessage || !receiverName) var viewerName, amountString, userMessage, receiverName;

  if (loc === 'sl') {

    viewerName = document.querySelector('#gifter').textContent;
    receiverName = document.querySelector('#name').textContent;
    amountString = document.querySelector('#amount').textContent;
    userMessage = document.querySelector('#alert-user-message').textContent;

  } else if (loc === 'se') {

  };

  var amount = amountString.replace('$', '');

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
        var alertMessageHTMLString = "";
        var houseBanner = payload.image;

        var alertImage, alertMessage, alertUserMessage;

        houseHTMLString += "<span style='color:" + payload.color + ";'>";
        amountHTMLString += "<span style='color:" + payload.color + ";'>";
        viewerNameHTMLString += "<span style='color:" + payload.color + ";'>";

        for (var i = 0; i < amount.length; i++) {
          amountHTMLString += "<span class='animated-varter wiggle'>" + amount[i] + "</span>";
        };

        for (var i = 0; i < viewerName.length; i++) {
          if (viewerName[i] === " ") viewerNameHTMLString += "<span>&nbsp;</span>";
          viewerNameHTMLString += "<span class='animated-varter wiggle'>" + viewerName[i] + "</span>";
        };

        for (var i = 0; i < houseName.length; i++) {
          if (houseName[i] === " ") houseHTMLString += "<span>&nbsp;</span>";
          houseHTMLString += "<span class='animated-varter wiggle'>" + houseName[i] + "</span>";
        };

        houseHTMLString += "</span>";
        viewerNameHTMLString += "</span>";
        amountHTMLString += "</span>";

        if (Math.abs(amount) <= 1 || amount === null || amount === undefined || amount === 'null' || amount === 'undefined') {

            alertMessageHTMLString = viewerNameHTMLString + ", of " + houseHTMLString + ", <br>has gifted one sub to " + receiverName + "!";

        } else {

            alertMessageHTMLString = viewerNameHTMLString + " has gifted " + amountHTMLString + " subs to <br>" + houseHTMLString + "!";

        };

        if (loc === 'sl') {

          document.querySelector('#alert-image').innerHTML = '<img src="' + houseBanner + '" alt="" style="height: 250px;margin-top:115px !important;" />';
          document.querySelector('#alert-message').innerHTML = alertMessageHTMLString;
          document.querySelector('#alert-user-message').innerHTML = document.querySelector('#alert-user-message-child').innerHTML;

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

};

initGiftSubAlert();
