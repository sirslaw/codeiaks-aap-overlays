function addZeroes(value) {

  let new_value = (value * 1) + '';
  pos = new_value.indexOf('.');

  if (pos == -1) {
    new_value = new_value + '.00';
  } else {

    let integer = new_value.substring(0, pos);
    let decimals = new_value.substring(pos + 1);

    while (decimals.length < 2) decimals = decimals + '0';

    new_value = integer + '.' + decimals;

  };

  return new_value;

};

let key = document.querySelector('#houses-script').getAttribute('token');
let loc = document.querySelector('#houses-script').getAttribute('loc');

let viewerName, amountString, userMessage;

if (loc === 'sl') {

  viewerName = 'sirslaw'//document.querySelector('#name').textContent;
  amountString = document.querySelector('#amount').textContent;
  userMessage = document.querySelector('#alert-user-message').textContent;

} else if (loc === 'se') {

};

let amount = amountString.replace('$', '');
amount = '$' + addZeroes((amount));

fetch('https://codeiaks-houses-api.herokuapp.com/grizzly/overlays/get/viewer?token=' + key + '&name=' + viewerName, {
  method: "GET",
  json: true,
  headers: { 'Content-Type': 'application/json' }
}).then(async (data) => {
  if (data.type === 'cors') {

    let response = (await data.json());
    let payload = response.data;

    if (response.ok) {

      let houseName = payload.name;
      let houseHTMLString = "";
      let viewerNameHTMLString = "";
      let amountHTMLString = "";
      let houseBanner = payload.image;

      let alertImage, alertMessage, alertUserMessage;

      houseHTMLString += "<span style='color:" + payload.color + ";'>";
      amountHTMLString += "<span style='color:" + payload.color + ";'>";
      viewerNameHTMLString += "<span style='color:" + payload.color + ";'>";

      for (let i = 0; i < amount.length; i++) {
        amountHTMLString += "<span class='animated-letter wiggle'>" + amount[i] + "</span>";
      };

      for (let i = 0; i < viewerName.length; i++) {
        if (viewerName[i] === " ") viewerNameHTMLString += "<span>&nbsp;</span>";
        viewerNameHTMLString += "<span class='animated-letter wiggle'>" + viewerName[i] + "</span>";
      };

      for (let i = 0; i < houseName.length; i++) {
        if (houseName[i] === " ") houseHTMLString += "<span>&nbsp;</span>";
        houseHTMLString += "<span class='animated-letter wiggle'>" + houseName[i] + "</span>";
      };

      houseHTMLString += "</span>";
      viewerNameHTMLString += "</span>";
      amountHTMLString += "</span>";

      let alertMessageHTMLString = viewerNameHTMLString + " tipped " + amountHTMLString + " for <br>" + houseHTMLString + "!";

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
