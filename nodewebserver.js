const http = require('http'), 
	  fs = require('fs'),
	  path = require('path');
var port = process.env.PORT;	  
http.createServer(function (req, res) {
	var filePath = req.url;
	if (filePath == '/')
	  filePath = '/index.html';
	filePath = __dirname+filePath;
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.pdf':
			contentType = 'application/pdf';
			break;
	}	
	fs.exists(filePath, function(exists) {
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					console.log('Error: ' + filePath);
					res.writeHead(500);
					res.end();
				}
				else {  
					console.log('Serving: ' + filePath);
					res.writeHead(200, { 'Content-Type': contentType  });
					res.end(content, 'utf-8');                  
				}
			});
		}
		else {
			console.log('Not found: ' + filePath);
		}
	});
}).listen(port);
console.log('Listening on port ' + port);