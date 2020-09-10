function check(value) {
  if (value == "myShapes" && document.getElementById("userName").innerText == "Guest") {
    alert("You need signed in for this method.\nThank you!");
    return;
  }
  var checkBox = document.getElementById(value);
  if (!checkBox.checked) checkBox.checked = true;
  sendRequestLoadShape(value);
}

function lockMyShapesFromList() {
  if (document.getElementById("userName").innerText == "Guest") document.getElementById("myShapes").disabled = true;
  else document.getElementById("myShapes").disabled = false;
}

function sendRequestLoadShape(value) {
  $.ajax({
    url:'/shape_of_interests/printShapes',
    type:'post',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
    },
    data: {value}
  });
}