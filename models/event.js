const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	title: {type: String, required: true},
	location: {type: String, required: true},
	numberOfPeople: {type: Number, required: true},
	description: {type: String, required: true},
	img: String,
	date: {type: Date, required: true},
	
	///the ID of user who created event
	organizer: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	
	//an array of user IDs of users who are attending the event
	attending: [{
		type: mongoose.Schema.Types.ObjectId,
		ref:'User'
	}]
})


const Event = mongoose.model('Event', eventSchema)
module.exports = Event





