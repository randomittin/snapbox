var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var engines = require('consolidate');
var multer = require('multer');
var fs = require('fs');
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/'));
// app.set('view engine', 'pug');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
var newPic = "";
var fName = "";
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
    var fName = Date.now() + file.originalname;
    // console.log("form the naldfme"+fName);
    newPic = '<a href="./uploads/'+fName+'">\n\t<figure>\n\t\t<img src="./uploads/'+fName+'" alt="">\n\t</figure>\n</a>\n';
    cb(null, fName)
    }
});
var upload = multer({storage: storage});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    // console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.route('/')
	.get(function(req, res) {
	// res.render('../mailTrain.html');
	// console.log("Randomiakm");
var I = "";
var II = "";
var III = "";
fs.readFile('./views/I.txt', 'utf8', function (err,data1) {
  if (err) {
    return console.log(err);
  }
  I = data1;
  // console.log("first file done." + I);
fs.readFile('./views/II.txt', 'utf8', function (err,data2) {
  if (err) {
    return console.log(err);
  }
  II = data2;
fs.readFile('./views/III.txt', 'utf8', function (err,data3) {
  if (err) {
    return console.log(err);
  }
  III = data3;
// console.log(I+II+III);
fs.writeFile('./views/index.html', I+II+III, function (err) {
  if (err) return console.log(err);
  console.log("New HTML created. Let's see.");
});
});
});
});
    res.render('index.html');   
    // res.render('index', { title: 'Hey', message: 'Hello there!' })
	});
router.route('/upload')
	.post(upload.single('image'),function(req, res){
	console.log("File uploaded");
    fs.appendFile('./views/II.txt', newPic , (err) => {  
        if (err) throw err;
        console.log('The Photos were updated!');
    });
    res.redirect('/');
	});
app.use('/', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

