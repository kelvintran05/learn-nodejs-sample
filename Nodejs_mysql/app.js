var express = require('express');
var app = express();

var mysql=require('mysql');

// require mongoose
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/addressbook');

// set a var for schema (the structure of a document)
var Schema = mongoose.Schema;

// create a new person schema
var personSchema = new Schema({
	firstname: String,
	lastname: String,
	address: String
});

// now we can generate a constuctor
var Person = mongoose.model('Person', personSchema);

// and then create new instances or new versions of this type of object, following the structure
var john = Person({
  firstname: 'John',
  lastname: 'Doe',
  address: '555 Main St.'
});

// save the user to MongoDB
john.save(function(err) {
  if (err) throw err;

  console.log('person saved!');
});

var jane = Person({
  firstname: 'Jane',
  lastname: 'Doe',
  address: '555 Main St.'
});

// save the user
jane.save(function(err) {
  if (err) throw err;

  console.log('person saved!');
});

var apiController= require('./controllers/apiController');
var htmlController= require('./controllers/htmlController');

// set port
var port = process.env.PORT||3000;

// set the template engine
app.set('view engine', 'ejs');

// middleware to sever static files
app.use('/assets',express.static(__dirname + 'public'));

// our own middleware
app.use('/',function(req,res,next){
    console.log('Request Url: '+ req.url);
    // var con = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "addressbook"
    // });
    // con.query('Select people.id, firstname, lastname, address from people inner join personaddresses on people.id = personaddresses.personid inner join address on personaddresses.addressid = address.id',function(err,rows){
    //     if(err) throw err;
    //     console.log(rows);
    // });
    // get all the users
	Person.find({}, function(err, users) {
		if (err) throw err;
		
		// object of all the users
        console.log(users);
    });
    next();
});

// post form with json data
// app.post('/personjson', jsonParser, function(req, res) {
//     res.send('Thank  for the json data');
//     console.log(req.body.firstname);
//     console.log(req.body.lastname);
// });

apiController(app);
htmlController(app);
// listen for connections
app.listen(port);