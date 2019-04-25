const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	organizer: {
		///the ID of user who created event
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	attending: [{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
		//an array of user IDs of users who are attending the event
	}]
})


const Event = mongoose.model('Event', eventSchema)
module.exports = Event





