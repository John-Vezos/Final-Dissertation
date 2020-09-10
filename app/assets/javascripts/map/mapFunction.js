// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6,
    minZoom: 5,
    maxZoom: 20,
    gestureHandling: 'greedy'
  });
  infoWindow = new google.maps.InfoWindow;

  // custon Button
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);


  var centerControlDiv1 = document.createElement('div1');
  var centerControl1 = new CenterControl1(centerControlDiv1, map);

  centerControlDiv1.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv1);

  // locationGPS.js
  geolocation();

  // ---------- > Start myJob with Javascripts <----------------------
  setTimeout(firstRequest, 110);

  google.maps.event.addListener(map, 'dblclick', function(event) {
    // shapeMethods.js
    initializerShape(event);
  });
}
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '1px solid #fff';
  controlUI.style.borderRadius = '30px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'My Location';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to yourLocation.
  controlUI.addEventListener('click', function() {
    if (myMark.length > 0) map.setCenter(myMark[0].position);
  });

}

function CenterControl1(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '1px solid #fff';
  controlUI.style.borderRadius = '30px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Shape';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to yourLocation.
  controlUI.addEventListener('click', function() {
    if (lastShape != null) map.setCenter(lastShapePos);
  });

}