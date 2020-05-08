var express = require('express');
var router = express.Router();
var fs = require('fs');
const multer = require('multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

function format(i){
    if(i<10){
        return "0"+i;
    }
    return i;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../public/images/')
        },
        filename: function (req, file, cb) {

            cb(null, file.originalname)
        }
    });
var upload = multer({ storage: storage })

	
	
router.use(express.static(__dirname + '/public'));

router.get('/', function (req, res) {
    res.render('home.ejs', {});
});

router.get('/streaming', function (req, res) {
    res.render('streaming.ejs', {});
});

router.get('/logs', function (req, res) {
    res.render('logs.ejs', {});
});

router.get('/repertoire', function (req, res) {
    res.render('repertoire.ejs', {});
});


router.get('/contact', function (req, res) {
    res.render('contact.ejs', {});
});

router.get('/add', function (req, res) {
    res.render('add.ejs', {query : req.query});
});

router.post('/add', upload.single('photo'), function (req, res) {
    console.log(req.body.person_name);
    res.redirect('/repertoire');
});

router.post('/', upload.single('photo'), (req, res) => {
    res.redirect('/');
	var oldPath = __dirname + '/../public/images/'+req.file.filename
    let ts = Date.now(); 
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let mins = date_ob.getMinutes();
	
	var newPath = __dirname + '/../public/images/test/'
	console.log(newPath);
	fs.access(newPath, function(err) {
		if (err && err.code === 'ENOENT') {
		fs.mkdir(newPath, (err) => { 
		if (err)console.log(err); 
		} ); //Create dir in case not found
		}
		else if(err) console.log(err);
		});
	
	newPath = newPath +format(date) + "-" + format(month) + "-" + year + "_" + hours + "h" + mins +  "_" + req.file.filename;
	fs.rename(oldPath, newPath, function (err) {
	if (err) console.log("moving of image failed");
	})
});


module.exports = router;
