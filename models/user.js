const mongoose = require('mongoose');
const Event = require('./event');


const userSchema = new mongoose.Schema({
	username: {type:String, required: true},
	password: {type:String, required: true},
	img: String,
	dateOfBirth: {type: Date, required: true},

	// this allows us to see what events a user has created
	eventsOwned: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
	}],

	// this allows us to easily show what events a user has volunteered for
	eventsAttending: [{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Event'
	}]
})





const User = mongoose.model('User', userSchema);

module.exports = User
