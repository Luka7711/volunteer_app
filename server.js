const express 			= require('express');
const app 				= express();
const bodyParser 		= require('body-parser');
const methodOverride 	= require('method-override');
const session			= require('express-session');

require ('./db/db')



app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(session({
	secret: 'keepitsafe',
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


app.listen(3000, () => {
	console.log('server is cool')
})