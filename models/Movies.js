const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'title is required']
	},
	director: {
		type: String,
		required: [true, 'director is required']
	},
	year: {
		type: Number,
		required: [true, 'year is required']
	},
	description: {
		type: String,
		required: [true, 'description is required']
	},
	genre: {
		type: String,
		required: [true, 'genre is required']
	},
	comments: [
		{
			userId: {
				type: String
			},
			comment: {
				type: String
			}
		}
	]
});

module.exports = mongoose.model('Movie', movieSchema);