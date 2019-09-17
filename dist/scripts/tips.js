var initTipAlert = function () {

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

  if (!viewerName || !amountString || !userMessage) var viewerName, amountString, userMessage;

  if (loc === 'sl') {

    viewerName = document.querySelector('#name').textContent;
    amountString = document.querySelector('#amount').textContent;
    userMessage = document.querySelector('#alert-user-message').textContent;

  } else if (loc === 'se') {

    viewerName = document.querySelector('#name').textContent;
    amountString = document.querySelector('#amount').textContent;
    userMessage = document.querySelector('#message').textContent;

  };

  var amount = amountString.replace('$', '');
  amount = addZeroes((amount));

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

        houseHTMLString += "<span style='color:" + payload.color + " !important;'>";
        amountHTMLString += "<span style='color:" + payload.color + " !important;'>";
        viewerNameHTMLString += "<span style='color:" + payload.color + " !important;'>";

        for (var i = 0; i < amount.length; i++) {
          if (loc === 'sl') amountHTMLString += "<span class='animated-varter wiggle'>" + amount[i] + "</span>";
          if (loc === 'se') amountHTMLString += "<span class='animated-letter wobble'>" + amount[i] + "</span>";
        };

        for (var i = 0; i < viewerName.length; i++) {
          if (viewerName[i] === " ") viewerNameHTMLString += "<span>&nbsp;</span>";
          if (loc === 'sl') viewerNameHTMLString += "<span class='animated-varter wiggle'>" + viewerName[i] + "</span>";
          if (loc === 'se') viewerNameHTMLString += "<span class='animated-letter wobble'>" + viewerName[i] + "</span>";
        };

        for (var i = 0; i < houseName.length; i++) {
          if (houseName[i] === " ") houseHTMLString += "<span>&nbsp;</span>";
          if (loc === 'sl') houseHTMLString += "<span class='animated-varter wiggle'>" + houseName[i] + "</span>";
          if (loc === 'se') houseHTMLString += "<span class='animated-letter wobble'>" + houseName[i] + "</span>";
        };

        houseHTMLString += "</span>";
        viewerNameHTMLString += "</span>";
        amountHTMLString += "</span>";

        var alertMessageHTMLString = viewerNameHTMLString + " tipped " + amountHTMLString + " for <br>" + houseHTMLString + "!";

        if (loc === 'sl') {

          document.querySelector('#alert-image').innerHTML = '<img src="' + houseBanner + '" alt="" style="height: 250px;margin-top:115px !important;" />';
          document.querySelector('#alert-message').innerHTML = alertMessageHTMLString;
          document.querySelector('#alert-user-message').innerHTML = document.querySelector('#alert-user-message-child').innerHTML;

        } else if (loc === 'se') {

          document.querySelector('#image-container').innerHTML = '<img src="' + houseBanner + '" alt="" style="height: 250px;margin-top:115px !important;" />';
          document.querySelector('#text-container').innerHTML = alertMessageHTMLString;
          document.querySelector('#message-container').innerHTML = userMessage;

        };

      } else {

        if (loc === 'sl') {

          document.querySelector('#alert-message').innerHTML = document.querySelector('#alert-message-child').innerHTML;
          document.querySelector('#alert-user-message').innerHTML = document.querySelector('#alert-user-child').innerHTML;

        } else if (loc === 'se') {

          document.querySelector('#text-container').innerHTML = viewerName + " tipped " + amountString + "!";
          document.querySelector('#message-container').innerHTML = userMessage;

        };

      };

    };
  });

};

initTipAlert();
