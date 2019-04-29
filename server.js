const express 			= require('express');
const app 				= express();
const bodyParser 		= require('body-parser');
const methodOverride 	= require('method-override');
const session			= require('express-session');

require ('./db/db')
const eventController = require('./controllers/eventController.js')
const userController = require('./controllers/userController.js')



app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(session({
	secret: 'keepitsafe',
	resave: false,
	saveUninitialized: false
}));
app.use('/events', eventController);
app.use('/users', userController);





app.listen(3000, () => {
	console.log('server is cool')
})