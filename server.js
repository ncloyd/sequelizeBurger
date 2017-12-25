var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/*+json' }));
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

app.use(methodOverride('_method'));

// Set Handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});