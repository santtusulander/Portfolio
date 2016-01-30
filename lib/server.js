var express = require('express');
var path = require('path');

var port = 8080;

express()

	// Setting dist folder to serve static content
	.use('/dist', express.static(path.join(__dirname, '../dist')))

	.get('*', function(req, res) {
		return res.sendFile(path.join(__dirname, '../index.html'));
	})

	.listen(port, function() {
		console.log("App running on port", port);
	});
