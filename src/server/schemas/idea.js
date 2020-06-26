const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
	name: {
		unique: true,
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	team: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'member',
			autopopulate: true
		}
	]

}, {timestamps: true});

ideaSchema.plugin(require('mongoose-autopopulate'));

// const handleE11000 = function(error, res, next) {
// 	if (error.name === 'MongoError' && error.code === 11000) {
// 		next(new Error('There was a duplicate key error'));
// 	} else {
// 		next();
// 	}
// };

// ideaSchema.pre('save', function(next) {
// 	next(new Error('Something went wrong. We couldn\'t create a document'));
// });
//
// ideaSchema.post('save', handleE11000);
// ideaSchema.post('update', handleE11000);
// ideaSchema.post('findByIdAndUpdate', handleE11000);

module.exports = 	ideaSchema;