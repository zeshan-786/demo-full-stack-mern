const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const fields = {
	'name' : String,
	'dob' : Date,
	'breed' : String,
	'type' : String,
	'appointments' : Array,
	'owner' : {
		type: Schema.Types.ObjectId,
		ref: 'Client'
   }
}

let PetSchema = new Schema(fields, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);
