const { DoctorModel, ClinicModel } = require('../models/UserModel')
/**
 * DoctorController.js
 *
 * @description :: Server-side logic for managing Doctors
 */
module.exports = {

  /**
   * DoctorController.list()
   */
  list: async (req, res) => {
    try {
      let filter = req.query.where
      clinic = req.user.__userType !== 'Admin' ? req.user._id : null
      filter = clinic ? {clinic: clinic} : filter
      const doctors = await DoctorModel.find(filter, req.query.fields, req.query.sort).select('-salt -hash')
      return res.json(doctors)
    } catch (error) {
      return res.status(500).json({
        message: error && error.message ? error.message : 'Error when getting Doctors.'
      })
    }
  },

  /**
   * DoctorController.show()
   */
  show: async (req, res) => {
    try {
      const id = req.query.id || !['Admin', 'Clinic'].includes(req.user.__userType) ? req.user._id : null
      const Doctor = await DoctorModel.findOne({_id: id}).select('-salt -hash')
      if (!Doctor) {
        return res.status(404).json({
          message: 'No such Doctor'
        });
      }
      return res.json(Doctor);
    } catch (error) {
      return res.status(500).json({
        message: error && error.message ? error.message : 'Error when getting Doctor.'
      });
    }
  },

  /**
   * DoctorController.update()
   */
  update: async (req, res) => {
    try {
      console.log(req.user);
      console.log(!['Admin', 'Clinic'].includes(req.user.__userType));
      const id = req.query.id || !['Admin', 'Clinic'].includes(req.user.__userType) ? req.user._id : null
      console.log("ID: ", id);
      const Doctor = await DoctorModel.findOne({_id: id}).select('-salt -hash')
        if (!Doctor) {
          return res.status(404).json({
            message: 'No such Doctor'
          });
        }
        Doctor.name = req.body.name ? req.body.name : Doctor.name;
        Doctor.email = req.body.email ? req.body.email : Doctor.email;
        Doctor.age = req.body.age ? req.body.age : Doctor.age;
        Doctor.dob = req.body.dob ? req.body.dob : Doctor.dob;
        Doctor.details = req.body.details ? req.body.details : Doctor.details;
        Doctor.speciality = req.body.speciality ? req.body.speciality : Doctor.speciality;
        if (req.body.clinic && !Doctor.clinic) {
          Doctor.clinic = req.body.clinic
          await ClinicModel.findOneAndUpdate({ _id: Doctor.clinic }, { $push: { doctors: [req.body.clinic] } })
        }

        await Doctor.save()
        return res.json(Doctor)
    } catch (error) {
      return res.status( error.status || 500).send({ message: error.message ? error.message : 'Something went wrong' });
    }
  },

  /**
   * DoctorController.remove()
   */
  remove: async (req, res) => {
    const id = req.query.id || !['Admin', 'Clinic'].includes(req.user.__userType) ? req.user._id : null
    DoctorModel.findByIdAndRemove(id, (err, Doctor) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Doctor.',
          error: err
        });
      }
      if(!Doctor) return res.status(404).json({ message: 'Doctor not found' });
        ClinicModel.findOneAndUpdate({ _id: Doctor.clinic }, { $pull: { doctors: Doctor._id } }, function(error, obj) {
          if (error) {
            console.log("Error while updating clinic: ",error);
          }
          console.log("Updated Clinic: ",obj);
        });
      return res.status(204).json();
    });
  }
};
