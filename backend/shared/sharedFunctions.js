const {
  ClientModel,
  ClinicModel,
  DoctorModel,
  AdminModel,
} = require("../models/UserModel");

const getSchema = (User, body) => {
  if (!User) return false;
  return new User({
    name: body.name,
    email: body.email,
    age: body.age,
    dob: body.dob,
    details: body.details,
  });
};

const getUser = async (userType, filter) => {
  const User = getInstance(userType);
  if (!User) return false;
  return await User.findOne(filter);
};

const getInstance = (userType) => {
  switch (userType) {
    case "Admin":
      return AdminModel;
    case "Client":
      return ClientModel;
    case "Clinic":
      return ClinicModel;
    case "Doctor":
      return DoctorModel;
    default:
      return false;
  }
};

module.exports = {
  getSchema,
  getUser,
  getInstance,
};
