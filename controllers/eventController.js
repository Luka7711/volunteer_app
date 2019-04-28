const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const User = require('../models/user')


//Create new event
router.get('/new', (req, res) => {
	if(req.session.logged){
	res.render('events/new.ejs')
}else{
	req.session.message = 'Organize an event? Sign in or Sign up'
	res.redirect('/users/login')
}
})

/// when user creates own event, create route
router.post('/', async (req, res, next) => { 
	try {

		console.log("\nreq.session.userDbId: in event create route:")
		console.log(req.session.usersDbId)
		//find this user and add data into
		const foundUser = await User.findById(req.session.userDbId)
		console.log('\nhere is foundUser:')
		console.log(foundUser);
		/// fill out the event fields
		// const createdEvent = await Event.create(req.body)

		const createdEvent = new Event(req.body)

		createdEvent.organizer = foundUser
		await createdEvent.save()
		console.log('this is created event')
		console.log(createdEvent)

		// TODO:
		// push event into eventsOwned array on foundUser
		// save foundUser
		
		const foundEvent = await Event.findById(createdEvent._id)
		console.log('this is event:')
		console.log(foundEvent)
		console.log('this is user')
		console.log(foundUser)
		foundUser.eventsOwned.push(foundEvent)
		
		await foundUser.save()
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

//edit owning event

router.delete('/:id', (req, res) => {
	Event.findByIdAndRemove(req.params.id, (err, deletedEvent) => {
		console.log('deleted event is:')
		console.log(deletedEvent)
		User.findOne({'eventsOwned':req.params.id}, (err, foundUser) =>{
			if(err){
				res.send(err)
			}else{
				foundUser.eventsOwned.remove(req.params.id)
				foundUser.save((err, updatedUser) => {
					res.redirect('/users/' + req.session.userDbId)
				})
			}
		})
	})
})






module.exports = router;
