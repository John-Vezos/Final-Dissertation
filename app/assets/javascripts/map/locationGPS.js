var myMark = [];
var myGeolocation = null;
function geolocation() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition (
      successCallback,
      handleLocationError,
      {enableHighAccuracy: true, maximumAge:600000, timeout:20000}
    );
  }
}

function setCurrentPosition() {
  navigator.geolocation.getCurrentPosition (function(position) {
    successCallback(position);
  });
}

function successCallback(position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  if (myMark.length > 0) myMark[0].setMap(null);
  else {
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
  }
  addMarkerWithTimeout(pos);

  
  // insert user location to the form location field
  //var tempElement = document.getElementById("online_user_location");
  //if (tempElement != null) tempElement.value = 'POINT(' + pos.lat + ' ' + pos.lng +')';
  myGeolocation = 'POINT(' + pos.lat + ' ' + pos.lng +')';
}

function addMarkerWithTimeout(pos) {
  myMark.push(new google.maps.Marker({
    position: pos,
    map: map,
    animation: google.maps.Animation.DROP
  }));
}
      

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  if (infoWindow == null) {
    if (browserHasGeolocation) alert("Error: The Geolocation service failed.");
    else alert("Error: Your browser doesn\'t support geolocation.");
  } else {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
}//AIzaSyDP7EgHWuE5jO46V8M0zejk3YGCZLs3LtM new API-KEY