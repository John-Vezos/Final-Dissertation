var marks = [];
function createMarks(onlineUsersCoordinates) {
	clearMarks();
	for (var i = 0; i < onlineUsersCoordinates.length; i=i+2) {

		var pos = {
	    lat: onlineUsersCoordinates[i],
	    lng: onlineUsersCoordinates[i+1]
	  };
	  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

		marks.push(new google.maps.Marker({
	    position: pos,
	    map: map,
	    icon: iconBase + 'library_maps.png'
	  }));
	}
	updateCountUsers(" " + (onlineUsersCoordinates.length/2).toString() + " ");
}

function clearMarks() {
	if (marks.length > 0) {
    for (var i = 0; i < marks.length; i++) marks[i].setMap(null);
  }
	updateCountUsers(" not shape selected ");
}

function updateCountUsers(value) {
	document.getElementById("xLevel").innerHTML = value;
}