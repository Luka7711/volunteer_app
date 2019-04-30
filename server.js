const express 			= require('express');
const app 				= express();
const bodyParser 		= require('body-parser');
const methodOverride 	= require('method-override');
const session			= require('express-session');
require('dotenv').config()


const PORT = process.env.PORT

require ('./db/db')



app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));


const eventController = require('./controllers/eventController.js')
app.use('/events', eventController);
const userController = require('./controllers/userController.js')
app.use('/users', userController);


app.get('/', (req, res) => {
	res.render('root.ejs')
})


app.listen(PORT, () => {
	console.log('server is cool')
})