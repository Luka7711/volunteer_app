const mongoose = require('mongoose');
const Event = require('./event');


const userSchema = new mongoose.Schema({
	username: {type:String, required: true},
	password: {type:String, required: true},
	img: String,
	dateOfBirth: {type: Date, required: true},

	eventsOwned:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Event'
	}],

	eventsAttending: [{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Event'
	}]
})





const User = mongoose.model('User', userSchema);

module.exports = User
