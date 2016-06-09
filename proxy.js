var http = require('http'),
    httpProxy = require('http-proxy');

var options = 
{
    	target:'http://127.0.0.1:1810',
	ignorePath:false	
}

var proxyServer = httpProxy.createServer(options);
proxyServer.listen(1811);

proxyServer.on('error', function (err, req, res) 
{
  	res.writeHead(500, 
	{
    		'Content-Type': 'text/plain'
  	});

  	res.end(err+"<br>"+req+"<br>"+res+'Something went wrong. And we are reporting a custom error message.');
});

