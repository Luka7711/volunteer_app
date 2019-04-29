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
	const events = await Event.find({})
	// console.log('this is all events in DB')
	// console.log(events)
	res.render('home.ejs', {
		loggedIn: req.session.logged,
		user: foundUser,
		allEvents: events
	})
	}catch(err){
	next(err)
}
})


router.get('/login', (req, res) => {
	res.render('users/login.ejs', {
		message:req.session.message
	})
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

//populating multiple events in user database
router.get('/:id', (req, res) => {
	if(req.session.logged){
	User.findById(req.params.id)
	.populate('eventsOwned')
	.populate('eventsAttending')
	.exec((err, foundUser) => {
		res.render('users/userevents.ejs', {
			allEventsOwn: foundUser.eventsOwned,
			allEventsAtt:foundUser.eventsAttending,
			user:foundUser
		})
		console.log(foundUser)
	})
}
})

//participate in someones event
router.get('/attend/:id', async(req, res, next) => {
	//find current user
	//add id to addendin event
	try{
	const currentUser = await User.findById(req.session.userDbId)
	const attendEvent = await Event.findById(req.params.id)
	console.log('this is current event')
	console.log(attendEvent)
	currentUser.eventsAttending.push(attendEvent)
	await currentUser.save()
	console.log(currentUser)
	res.redirect('/users/' + req.session.userDbId)
}catch(err){
	next(err)
}
})







module.exports = router;