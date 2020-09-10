function splitter(temp) {
	var tokens = [];
	if (temp != null ) {
		for (var i = 0; i < temp.length; i++) {
			tokens[i] = temp[i].split(" ");
		}

		for (var i = 0; i < temp.length; i++) {
			for (var y = 0; y < tokens[i].length; y++) {
				tokens[i][y] = tokens[i][y].replace(/[(]/g, "");
				tokens[i][y] = tokens[i][y].replace(/[)]/g, "");
				tokens[i][y] = tokens[i][y].replace(/[,]/g, "");
			}
		}
		for (var i = 0; i < temp.length; i++) {
			for (var y = 0; y < tokens[i].length; y++) {
				console.log(tokens[i][y]);
			}
		}
	}
	return tokens;
}