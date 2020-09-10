// start here 
//console.log("start");
//window.onload = firstRequest;
window.onunload = closeScripts();

var userLocation = null;
var userRequestFrequency = null;
var reloadSite = null;

function firstRequest() {
  
	// alert message to user
	if (getCookie("timeRequest") == "") alert("Hallo " + document.getElementById("userName").innerHTML +", for a better experience, please, open your GPS!\nThank you!");

	// this function check the time from the last request
	checkTimeForRequest();

	// userShapeMenu.js
  lockMyShapesFromList();
	check("appShapes");
}

// check if user have 15minute to send a request
function checkTimeForRequest() {
	// lastRequest*15minute is equals with the time right now
	if (getCookie("timeRequest") == "" || getCookie("timeRequest") <= new Date().toUTCString()) {
    autoRequest();
    //console.log("esteila update");
  } else {
    var restoreTime = Date.parse(getCookie("timeRequest")) - new Date();
    setTimeout(setCurrentPosition, restoreTime);
    reloadSite = setTimeout(checkTimeForRequest, restoreTime);

    //console.log("kanw reload::"+restoreTime);
  }
}

// getCookie withi this name return the value
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


// ajax request delivery data form
function autoRequest() {

  var time = 1000;
  if (myGeolocation == '' || myGeolocation == null) {
  	// cookie save the localTime + 5sec
    // setUserLocation every 4sec:8nanosec
    time = 1000;
    //console.log("try again in 5 second!");
  } else if (getCookie("firstTimeHere") == '') {
  	$.ajax({
    	url:'/online_users/create',
    	type:'post',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      },
    	data:{myGeolocation}
  	});
  	// cookie save the localTime + 15minutes
    // setUserLocation every 14min:30sec
    time = 900000;
    createCookieEntity("firstTimeHere", '1');
    //console.log("create OnlineUser!");
  } else {
    $.ajax({
      url:'/online_users/update',
      type:'post',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      },
      data:{myGeolocation}
    });
    // cookie save the localTime + 15minutes
    // setUserLocation every 14min:30sec
    time = 900000;
    createCookieEntity("firstTimeHere", '1');
    //console.log("update my location!");
  }
  registerCookieTime(time);
}

function registerCookieTime(time) {
	// cookie save the localTime + time
  var d = new Date();
  d.setTime(d.getTime() + time);

  createCookieEntity("timeRequest", d.toUTCString());

  //document.cookie = "timeRequest=" + d.toUTCString() + "; expires=Thu, 18 Dec 3000 12:00:00 UTC; path=/";

  // setUserLocation every time * 96%
  userLocation = setTimeout(setCurrentPosition, time*0.96);
  userRequestFrequency = setTimeout(checkTimeForRequest, time);
  reloadSite = null;
}

//function registerCookieFlagFirstTime() {
  //createCookieEntity("firstTimeHere", '1');
  //document.cookie = "firstTimeHere=" + '1' + "; expires=Thu, 18 Dec 3000 12:00:00 UTC; path=/";
//}

// cookies expires in 1.hour 
function createCookieEntity(name, value) {
  var d = new Date();
  d.setTime(d.getTime() + 3600000);
  document.cookie = name + "=" + value + "; expires= " + d.toUTCString() + " UTC; path=/";
}

function closeScripts() {
  userLocation = null;
  userRequestFrequency = null;
  reloadSite = null;
}