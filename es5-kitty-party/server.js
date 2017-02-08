var express = require('express')
    var path = require('path');
    var app = express()
	app.use(express.static('dist'))
    app.get('/', function (req, res) {	    
	    res.sendFile(path.join(__dirname, 'dist/index.html'))
	  	})
	app.get('/kitty/*', function(req, res){
		res.sendFile(path.join(__dirname, './assets/cat1.gif'));
	    })
	app.get('/catnames', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(['Puche', 'zorro']));
	    })

    app.listen(3000, function () {
	    console.log('Example app listening on port 3000!')
	})