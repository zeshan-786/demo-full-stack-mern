const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const fields = {	'appointmentTime' : Date,	'doctor' : {	 	type: Schema.Types.ObjectId,	 	ref: 'Doctor'	},	'pet' : {	 	type: Schema.Types.ObjectId,	 	ref: 'Pet'	},	'details' : String}

let AppointmentSchema = new Schema(fields);

module.exports = mongoose.model('Appointment', AppointmentSchema);
