const { ClinicModel, DoctorModel } = require('../models/UserModel')
/**
 * ClinicController.js
 *
 * @description :: Server-side logic for managing Clinics.
 */
module.exports = {

  /**
   * ClinicController.list()
   */
  list: async (req, res) => {
    try {
      const clinics = await ClinicModel.find(req.query.where, req.query.fields, req.query.sort).select('-salt -hash')
      return res.json(clinics)
    } catch (error) {
      return res.status(500).json({
        message: error && error.message ? error.message : 'Error when getting Clinics.'
      })
    }
  },

  /**
   * ClinicController.show()
   */
  show: async (req, res) => {
    try {
      const id = req.query.id || req.user.__userType !== 'Admin' ? req.user._id : null
      const Clinic = await ClinicModel.findOne({_id: id}).select('-salt -hash')
      if (!Clinic) {
        return res.status(404).json({
          message: 'No such Clinic'
        });
      }
      return res.json(Clinic);
    } catch (error) {
      return res.status(500).json({
        message: error && error.message ? error.message : 'Error when getting Clinic.'
      });
    }
  },

  /**
   * ClinicController.update()
   */
  update: async (req, res) => {
    try {
      const id = req.query.id || req.user.__userType !== 'Admin' ? req.user._id : null
      const Clinic = await ClinicModel.findOne({_id: id}).select('-salt -hash')
        if (!Clinic) {
          return res.status(404).json({
            message: 'No such Clinic'
          });
        }
        Clinic.name = req.body.name ? req.body.name : Clinic.name;
        Clinic.email = req.body.email ? req.body.email : Clinic.email;
        Clinic.age = req.body.age ? req.body.age : Clinic.age;
        Clinic.dob = req.body.dob ? req.body.dob : Clinic.dob;
        Clinic.details = req.body.details ? req.body.details : Clinic.details;
        Clinic.website = req.body.website ? req.body.website : Clinic.website;
        
        await Clinic.save()
        return res.json(Clinic)
    } catch (error) {
      return res.status( error.status || 500).send({ message: error.message ? error.message : 'Something went wrong' });
    }
  },

  /**
   * ClinicController.remove()
   */
  remove: async (req, res) => {
    try {
      const id = req.query.id || req.user.__userType !== 'Admin' ? req.user._id : null
      const Clinic = await ClinicModel.findByIdAndRemove(id)
      if( !Clinic ) throw Error('Error when deleting the Clinic.')
      await DoctorModel.deleteMany({
        _id: {
          $in: Clinic.doctors
        }
      })
      return res.status(204).json();
    } catch (error) {
      return res.status(500).send({ message: error.message ? error.message : 'Something went wrong' });
    }
  }
};
