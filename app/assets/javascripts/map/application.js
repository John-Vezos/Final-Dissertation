function printNoticeMessage(message) {
	document.getElementById("notice").innerHTML = message;
	// call freeNotice to delete the message from html
	setTimeout(freeNotice, 5000);
}

// Notice message delete after 5seconds
function freeNotice() {
	document.getElementById("notice").innerHTML = null;
}