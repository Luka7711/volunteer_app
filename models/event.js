const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	organized: {
		title: {type: String, required: true},
		description: {type: String, required: true},
		numberOfPeople: {type: Number, required: true},
		date: {type: Date, required: true},
		img: String
	},
	attending: {
		title: {type: String, required: true},
		description: {type: String, required: true},
		numberOfPeople: {type: Number, required: true},
		date: {type: Date, required: true},
		img: String
	}
})


const Event = mongoose.model('Event', eventSchema)
module.exports = Event





