const mongoose = require('mongoose');
const Event = require('./event');


const userSchema = new mongoose.Schema({
	username:{type:String, require:true},
	password:{type:String, require:true},
	img:String,
	dateOfBirth:{type:Date, require:true},

	events:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Event'
	}]
})

const User = mongoose.model('User', userSchema);

module.exports = User
