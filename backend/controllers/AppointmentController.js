const AppointmentModel = require('../models/AppointmentModel.js');

/**
 * AppointmentController.js
 *
 * @description :: Server-side logic for managing Appointments.
 */
module.exports = {

  /**
   * AppointmentController.list()
   */
  list: (req, res) => {
    AppointmentModel.find(req.query.where, req.query.fields, req.query.sort, (err, Appointments) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Appointment.',
          error: err
        });
      }
      return res.json(Appointments);
    });
  },

  /**
   * AppointmentController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    AppointmentModel.findOne({_id: id}, (err, Appointment) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Appointment.',
          error: err
        });
      }
      if (!Appointment) {
        return res.status(404).json({
          message: 'No such Appointment'
        });
      }
      return res.json(Appointment);
    });
  },

  /**
   * AppointmentController.create()
   */
  create: (req, res) => {
    let Appointment = new AppointmentModel({			appointmentTime : req.body.appointmentTime,			doctor : req.body.doctor,			pet : req.body.pet,			details : req.body.details
    });

    Appointment.save((err, Appointment) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Appointment',
          error: err
        });
      }
      return res.status(201).json(Appointment);
    });
  },

  /**
   * AppointmentController.update()
   */
  update: (req, res) => {
    let id = req.params.id;
    AppointmentModel.findOne({_id: id}, (err, Appointment) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Appointment',
          error: err
        });
      }
      if (!Appointment) {
        return res.status(404).json({
          message: 'No such Appointment'
        });
      }

      Appointment.appointmentTime = req.body.appointmentTime ? req.body.appointmentTime : Appointment.appointmentTime;			Appointment.doctor = req.body.doctor ? req.body.doctor : Appointment.doctor;			Appointment.pet = req.body.pet ? req.body.pet : Appointment.pet;			Appointment.details = req.body.details ? req.body.details : Appointment.details;			
      Appointment.save( (err, Appointment) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Appointment.',
            error: err
          });
        }

        return res.json(Appointment);
      });
    });
  },

  /**
   * AppointmentController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id;
    AppointmentModel.findByIdAndRemove(id, (err, Appointment) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Appointment.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
