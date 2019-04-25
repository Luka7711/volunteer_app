const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const User = require('../models/user')


//Create new event
router.get('/new', (req, res) => {
	res.render('events/new.ejs')
})

/// event create route
router.post('/', async (req, res) => { console.log(req.body);
	try {
		const foundUser = await User.findById(req.session.userDbId)
		console.log(foundUser);
		/// fill out the event fields
		// const createdEvent = await Event.create(req.body)

		const createdEvent = new Event(req.body)

		createdEvent.organizer = foundUser
		await createdEvent.save()


		console.log("\n Here is the created event");
		console.log(createdEvent);
		
		res.redirect('/events')
	} catch (err){
		res.send(err)
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