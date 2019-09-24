var initSubAlert = function () {

  var key = document.querySelector('#houses-script').getAttribute('token');
  var loc = document.querySelector('#houses-script').getAttribute('loc');

  if (!viewerName || !amountString || !userMessage) var viewerName, amountString, userMessage;

  if (loc === 'sl') {

    // auxiliary alerts are hosted with streamelements because they support having multiple alert overlays at once

  } else if (loc === 'se') {

    viewerName = document.querySelector('#name').textContent;
    amountString = document.querySelector('#amount').textContent;
    userMessage = document.querySelector('#message').textContent;
    tier = document.querySelector('#tier').textContent;

  };

  var amount = tier * 500;
  amount = amount + '';

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
        var amountHTMLString = "";
        var alertMessageHTMLString = '';
        var houseBanner = payload.image;

        amountHTMLString += "<span style='color:" + payload.color + " !important;'>";

        for (var i = 0; i < amount.length; i++) {
          if (loc === 'sl') amountHTMLString += "<span class='animated-varter wiggle'>" + amount[i] + "</span>";
          if (loc === 'se') amountHTMLString += "<span class='animated-letter wobble'>" + amount[i] + "</span>";
        };

        amountHTMLString += "</span>";

        var alertMessageHTMLString = "<span style='font-size:80px !important;'>+ " + amountHTMLString + " points</span>";

        if (loc === 'sl') {

          // auxiliary alerts are hosted with streamelements because they support having multiple alert overlays at once

        } else if (loc === 'se') {

          document.querySelector('#image-container').innerHTML = '<img src="' + houseBanner + '" alt="" style="position:absolute;height: 150px;margin-top:10px !important;left:0px !important;" />';
          document.querySelector('#text-container').innerHTML = alertMessageHTMLString;
          document.querySelector('#message-container').innerHTML = '';

        };

      } else {

        if (loc === 'sl') {

          // auxiliary alerts are hosted with streamelements because they support having multiple alert overlays at once

        } else if (loc === 'se') {

          document.querySelector('#text-container').innerHTML = '+ ' + amount + ' points';

        };

      };

    };
  });

};

initSubAlert();
