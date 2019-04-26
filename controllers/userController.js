const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const Event = require('../models/event')
const User = require('../models/user')

router.get('/', async(req, res, next)=>{
	//find one User
	//access user profile from home page
	try{
	const foundUser = await User.findById(req.session.userDbId)
	console.log('this is the user we lookin for:')
	console.log(foundUser)
	res.render('home.ejs', {
		loggedIn: req.session.logged,
		user: foundUser
	})
	}catch(err){
	next(err)
}
})




router.get('/login', (req, res) => {
	res.render('users/login.ejs')
})


router.get('/register', (req, res) => {

res.render('users/register.ejs')

})



//Create Register Route
router.post('/register', async (req, res, next) => {
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	console.log(passwordHash);
	
	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash;
	userDbEntry.dateOfBirth = req.body.dateOfBirth;
	userDbEntry.img = req.body.img;

  try {

      const createdUser = await User.create(userDbEntry)
      req.session.logged = true 
      req.session.userDbId = createdUser._id;
      // console.log("Made user, now redirect: ")
      console.log('this is req. session when you registering')
      console.log(req.session)
      res.redirect('/users')

  } catch(err) {
  	console.log("ERROR: ", err)
    next(err)
  }

})

//Login Route

router.post('/login', async (req, res, next) => {
	try{
		const foundUser = await User.findOne({'username': req.body.username});
		console.log(foundUser)
		if(foundUser){
			if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
				req.session.logged = true;
				req.session.userDbId = foundUser._id;
				console.log(req.session, 'login successful');
				console.log('id', foundUser._id)

				res.redirect('/users')

			}else{
				req.session.message = "Username or password incorrect"
				res.redirect('/users/login')
			}
		}else {
			req.session.message = "Username or password incorrect"
			res.redirect('/users/login')
		}

	}catch(err) {
		next(err)
	}
})


router.get('/login', (req, res) => {
	res.render('users/login.ejs', {
		message: req.session.message
	})
})



router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err){
			res.send(err);
			console.log(err);
		}else {
			res.redirect('/users/login')
		}
	})
	
})


router.get('/:id', async(req, res, next) => {
	//find all events
	//render events on userevents.ejs
	try {
		//Lana when you wake up populate event bitch to user
		const foundUser = await User.findById(req.session.userDbId)
		console.log('This is your found user');
		console.log(foundUser)
		const foundEvents = foundUser.eventsOwned
		console.log('this is your event');
		console.log(foundEvents);
		res.render('users/userevents.ejs', {
			events: foundEvents

		})
		event: foundUser

	} catch(err) {
		next(err)
	}
})








module.exports = router;