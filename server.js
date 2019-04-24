const express 			= require('express');
const app 				= express();
const bodyParser 		= require('body-parser');
const methodOverride 	= require('method-override');
const session			= require('express-session');

const eventController = require('./controllers/eventController.js')
const userController = require('./controllers/userController.js')

require ('./db/db')


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use('/events', eventController);
app.use('/users', userController);


app.use(session({
	secret:'keepitsafe',
	resave:false,
	saveUninitialized:false
}));



app.listen(3000, () => {
	console.log('server is cool')
})