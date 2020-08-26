var express = require('express');
var router = express.Router();
var fs = require('fs');
const { readdirSync } = require('fs')
const multer = require('multer');

function format(i){
    if(i<10){
        return "0"+i;
    }
    return i;
}


function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
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
    try {
        var data = fs.readFileSync('bdd.csv', 'utf8');
    } catch(e) {
        console.log('Error:', e.stack);
    }
    
    var json = [];
    data = data.replace(/;/g, ',').replace(/\r/g, '');
    var csvArray = data.split("\n");
    console.log("Replaced data : ", data);
    var csvColumns = ["date", "heure", "nom", "confiance_modele", "id_photo"]
    
    csvArray.forEach(function(csvRowString) {
 
        var csvRow = csvRowString.split(",");

        // Here we work on a single row.
        // Create an object with all of the csvColumns as keys.
        var jsonRow = [];
        
        for ( var colNum = 0; colNum < csvRow.length; colNum++) {
            // Remove beginning and ending quotes since stringify will add them.
            var colData = csvRow[colNum].replace(/^['"]|['"]$/g, "");
            jsonRow[csvColumns[colNum]] = colData;
        }
        json.push(jsonRow);
    });
    res.render('logs.ejs', {json: json});
});

router.get('/repertoire', function (req, res) {
	var path = __dirname + '/../public/images/'
	var peopleArray = getDirectories(path)
    res.render('repertoire.ejs', {query : req.query, peopleArr : peopleArray});
});

router.post('/repertoire', function (req, res) {


	var newPath = __dirname + '/../public/images/'+req.body.person_surname+" "+req.body.person_name+"/";
	fs.access(newPath, function(err) {
	if (err && err.code === 'ENOENT') {
		fs.mkdir(newPath, function(err) { 
			if (err) console.log(err + "");
			else {	
			}
		});
		}
	});
	res.redirect('/repertoire?success=2');
});

router.get('/contact', function (req, res) {
    res.render('contact.ejs', {});
});

router.get('/add', function (req, res) {
	var path = __dirname + '/../public/images/'
	var peopleArray = getDirectories(path)
    res.render('add.ejs', {query : req.query, peopleArr : peopleArray});
});

router.post('/add', upload.single('photo'), (req, res) => {
    res.redirect('/repertoire?success=1');
	var oldPath = __dirname + '/../public/images/'+req.file.filename
    let ts = Date.now(); 
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let mins = date_ob.getMinutes();
	
	var newPath = __dirname + '/../public/images/'+req.body.person_name+"/"

	fs.access(newPath, function(err) {
		if (err && err.code === 'ENOENT') {
			fs.mkdir(newPath, function(err) { 
				if (err) console.log(err + "");
				else {
					newPath2 = newPath +format(date) + "-" + format(month) + "-" + year + "_" + hours + "h" + mins +  "_" + req.file.filename;
					fs.rename(oldPath, newPath2, function (err) {
						if (err) console.log(err+ "   moving of image failed");
					});
					fs.rename(oldPath, newPath2, function (err) {
						if (err) console.log(err+ "   moving of image failed");
					});		
				}
			});
		}
		else {
			newPath2 = newPath +format(date) + "-" + format(month) + "-" + year + "_" + hours + "h" + mins +  "_" + req.file.filename;
			fs.rename(oldPath, newPath2, function (err) {
				if (err) console.log(err+ "   moving of image failed");
			});
			fs.rename(oldPath, newPath2, function (err) {
				if (err) console.log(err+ "   moving of image failed");
			});				
		}
	});
	

});

module.exports = router