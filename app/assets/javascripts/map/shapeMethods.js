var count = 0, lastShape = null, rectangles = [], newShapeId = -1, lastShapePos = null;

function initializerShape(event) {
  if (lastShape != null) lastShape.setMap(null);

  clearMarks();
  clearShapes();
  removeDeleteBtn();

  var bounds = {
    north: event.latLng.lat() - 0.00010,
    south: event.latLng.lat() + 0.00010,
    east: event.latLng.lng() + 0.00010,
    west: event.latLng.lng() - 0.00010
  };

  var rectangle = createShape(bounds);
  paintShape(rectangle, "black");
  dragEditableShape(rectangle, true);
  oneClick(rectangle);
  doubleClick(rectangle);
  rectangle.setMap(map);
  count++;
  lastShape = rectangle;
  lastShapePos = {
    lat: rectangle.getBounds().getNorthEast().lat(),
    lng: rectangle.getBounds().getNorthEast().lng()
  };
}

function createShape(bounds) {
  var rectangle = new google.maps.Rectangle({
    bounds: bounds,
    id: newShapeId
  });
  
  // Add an event listener on the rectangle.
  google.maps.event.addListener(rectangle, 'bounds_changed', function() {

    var tempElement = document.getElementById("shape_of_interest_shape");
    if (tempElement == null) return;

    lastShapePos = {
      lat: rectangle.getBounds().getNorthEast().lat(),
      lng: rectangle.getBounds().getNorthEast().lng()
    };

    tempElement.value = 'POLYGON ((' 
                      + rectangle.getBounds().getNorthEast().lat() + ' ' + rectangle.getBounds().getNorthEast().lng() + ', '
                      + rectangle.getBounds().getSouthWest().lat() + ' ' + rectangle.getBounds().getNorthEast().lng() + ', ' 
                      + rectangle.getBounds().getSouthWest().lat() + ' ' + rectangle.getBounds().getSouthWest().lng() + ', '
                      + rectangle.getBounds().getNorthEast().lat() + ' ' + rectangle.getBounds().getSouthWest().lng() + ', '
                      + rectangle.getBounds().getNorthEast().lat() + ' ' + rectangle.getBounds().getNorthEast().lng()
                      + '))';
  });
  return rectangle;  
}

function doubleClick(rectangle) {
  google.maps.event.addListener(rectangle, 'dblclick', function() {
    if (lastShape != null && lastShape != rectangle) dropShape();
    else if (lastShape == rectangle) {

      paintShape(rectangle, "blue");
      dragEditableShape(rectangle, false);
      
      requestShapeForm();

      addShape(rectangle);
      //console.log("save");

      // default this will be changed from Controller respone
      rectangle.id = 300000;
      lastShape = null;
    }
  });
}

function oneClick(rectangle) {
  var localCount = count;
  google.maps.event.addListener(rectangle, 'click', function() {
    // unsaved rectangle
    if (lastShape != null) {
      // oneClick on exist rectangle then drop the unsaved
      if (lastShape != rectangle) dropShape();
      // oneClick on unsaved rectangle don't do anything
      else return;
    }
    paintShape(rectangle, "red");
    
    clearShapes();
    rectangle.setMap(map);
    var shapeOfInterestId = rectangle.id;

    requestClickedShape(shapeOfInterestId);
    createDeleteButton(shapeOfInterestId);
  });
}

function paintShape(rectangle, color) {
  rectangle.setOptions({strokeColor: color, // edge color
                        strokeOpacity: 0.8, // entono of edge
                        strokeWeight: 2,
                        fillColor: color,
                        fillOpacity: 0.35
                      });
}
function dragEditableShape(rectangle, boolean) {
  rectangle.setOptions({editable: boolean,
                        draggable: boolean
                      });
}

function dropShape() {
  lastShape.setMap(null);
  lastShape = null;
}

function requestShapeForm() {
  $.ajax({
    url:'/shape_of_interests/create',
    type:'post',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
    },
    data:$('#ShapeOfInterestform').serialize()
  });
}

function requestClickedShape(shapeOfInterestId) {
  $.ajax({
    url:'/online_users/printUsers',
    type:'post',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
    },
    data:{shapeOfInterestId}
  });
}

function createShapes(shapeList) {
  for (var i = 0; i < shapeList.length; i=i+5) {
   
    var bounds = {
      north: shapeList[i+1],
      south: shapeList[i+2],
      east: shapeList[i+3],
      west: shapeList[i+4]
    };

    newShapeId = shapeList[i];
    var rectangle = createShape(bounds);
    addShape(rectangle);
    paintShape(rectangle, "blue");
    dragEditableShape(rectangle, false);
    oneClick(rectangle);
    rectangle.setMap(map);
  }
}

function addShape(localRectangle) {
  rectangles[rectangles.length] = localRectangle;
}

function clearShapes() {
  if (rectangles.length > 0) {
    for (var i = 0; i < rectangles.length; i++) rectangles[i].setMap(null);
  }
}

function clearRectangles() {
  rectangles = [];
}

function updateShapeId(value) {
  rectangles[rectangles.length-1].id = value;
}

function createDeleteButton(shapeOfInterestId) {

  removeDeleteBtn();

  if (document.getElementById("userName").innerHTML != "Admin" && document.getElementById("userName").innerHTML != "Administrator") {
    var x = document.createElement("INPUT");
    x.setAttribute("id", "password", "type", "text");
    x.placeholder = "Give the shape's password here.."; 
    document.getElementById("hiddenDiv").appendChild(x);
  }
  
  var btn = document.createElement("BUTTON");
  var t = document.createTextNode("DELETE");
  btn.appendChild(t);
  document.getElementById("hiddenDiv").appendChild(btn);
  
  var password = null;
  btn.addEventListener ("click", function() {
    if (document.getElementById("password") != null) {
      password = document.getElementById("password").value; 
    }
    requestDeleteRectangle(shapeOfInterestId, password);
  });
}

function removeDeleteBtn() {
  //document.getElementById("deleteShapeOfInterestButton").innerHTML = null;
  document.getElementById("hiddenDiv").innerHTML = null;
}

function requestDeleteRectangle(shapeOfInterestId, password) {
  $.ajax({
    url:'/shape_of_interests/delete',
    type:'post',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
    },
    data:{"shapeOfInterestId": +shapeOfInterestId,
          "password":password}
  });
}