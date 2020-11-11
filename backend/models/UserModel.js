const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
	name : String,
	age : Number,
	dob : Date,
	email: String,
	hash: String,
	salt: String,
	details : String,
},{
	discriminatorKey: '__userType',
	timestamps: true
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    _id: this._id,
    type: this.__userType,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    type: this.__userType,
    token: this.generateJWT(),
  };
};

const User = mongoose.model('User', UserSchema);

const ClientSchema = new mongoose.Schema({
	pets : Array
})
const DoctorSchema = new mongoose.Schema({
	spaciality: String,
	clinic : {
		type: Schema.Types.ObjectId,
		ref: 'Clinic'
   }
})

const ClinicSchema = new mongoose.Schema({
	doctors: Array,
	website: String
})

const AdminSchema = new mongoose.Schema({
	setting: String
})


const ClientModel = User.discriminator('Client', ClientSchema)
const DoctorModel = User.discriminator('Doctor', DoctorSchema)
const ClinicModel = User.discriminator('Clinic', ClinicSchema)
const AdminModel = User.discriminator('Admin', AdminSchema )
  
module.exports = { ClientModel, DoctorModel, ClinicModel, AdminModel }
