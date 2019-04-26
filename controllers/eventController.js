const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const User = require('../models/user')


//Create new event
router.get('/new', (req, res) => {
	res.render('events/new.ejs')
})

/// when user creates own event, create route
router.post('/', async (req, res, next) => { 
	try {
		console.log("\nreq.session.userDbId: in event create route:")
		console.log(req.session.userDbId)
		//find this user and add data into
		const foundUser = await User.findById(req.session.userDbId)
		console.log('\nhere is foundUser:')
		console.log(foundUser);
		/// fill out the event fields
		// const createdEvent = await Event.create(req.body)

		const createdEvent = new Event(req.body)

		createdEvent.organizer = foundUser
		await createdEvent.save()

		// TODO:
		// push event into eventsOwned array on foundUser
		// save foundUser
		const foundEvent = await Event.findById(createdEvent._id)

		foundUser.eventsOwned = foundEvent
		await foundEvent.save()

		console.log("\n Here is the created event");
		console.log(createdEvent);
		console.log("this is :", foundUser)
		
		res.redirect('/events')
	} catch (err){
		next(err)
	}
})

//Index route

router.get('/', async (req, res) => {
	try {
		const foundEvents = await Event.find({})
		res.render('events/index.ejs', {
			event:foundEvents
		})
	} catch(err){
		res.send(err)
	}
	
})




module.exports = router;