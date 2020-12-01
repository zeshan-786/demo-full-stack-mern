const AppointmentModel = require("../models/AppointmentModel.js");

/**
 * AppointmentController.js
 *
 * @description :: Server-side logic for managing Appointments.
 */
module.exports = {
  /**
   * AppointmentController.list()
   */
  list: async (req, res) => {
    try {
      let filter = {};
      let petOps = { path: "pet", select: "_id name owner", model: "Pet" };
      let doctorOps = {
        path: "doctor",
        select: "_id name email clinic",
        model: "Doctor",
      };
      if (req.user.__userType === "Doctor") {
        filter = { doctor: req.user._id };
      }

      if (req.user.__userType === "Client") {
        // filter = { "pet.owner": req.user._id }
        petOps.match = { owner: req.user._id }
      }

      if (req.user.__userType === "Clinic") {
        // filter = { "doctor.clinic": req.user._id }
        doctorOps.match = { clinic: req.user._id }
      }

      let Appointments = await AppointmentModel.find(filter)
        .populate(petOps)
        .populate(doctorOps)
        .lean();
      if (!Appointments) {
        return res.status(404).json({
          message: "No Appointments found",
        });
      }
      return res.json(Appointments);
    } catch (error) {
      console.log("Error in Fetching Appointments: ", error);
      return res.json({
        message: error.message ? error.message : "Something went wrong",
      });
    }
  },

  /**
   * AppointmentController.show()
   */
  show: async (req, res) => {
    try {
      let id = req.params.id;
      let Appointment = await AppointmentModel.findOne({ _id: id })
        .populate("pet", "_id name")
        .populate("doctor", "_id name email")
        .lean();
      if (!Appointment) {
        return res.status(404).json({
          message: "No such Appointment",
        });
      }
      return res.json(Appointment);
    } catch (error) {
      console.log("Error in Fetching Appointment: ", error);
      return res.json({
        message: error.message ? error.message : "Something went wrong",
      });
    }
  },

  /**
   * AppointmentController.create()
   */
  create: (req, res) => {
    let Appointment = new AppointmentModel({
      appointmentTime: req.body.appointmentTime,
      doctor: req.body.doctor,
      pet: req.body.pet,
      details: req.body.details,
    });

    Appointment.save((err, Appointment) => {
      if (err) {
        return res.status(500).json({
          message: "Error when creating Appointment",
          error: err,
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
    AppointmentModel.findOne({ _id: id }, (err, Appointment) => {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Appointment",
          error: err,
        });
      }
      if (!Appointment) {
        return res.status(404).json({
          message: "No such Appointment",
        });
      }

      Appointment.appointmentTime = req.body.appointmentTime
        ? req.body.appointmentTime
        : Appointment.appointmentTime;
      Appointment.details = req.body.details
        ? req.body.details
        : Appointment.details;

      Appointment.save((err, Appointment) => {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Appointment.",
            error: err,
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
          message: "Error when deleting the Appointment.",
          error: err,
        });
      } 
      if (!Appointment) {
        res.status(404).json({ message: "Appointment not found." });
      }
      return res.status(204).json();
    });
  },
};
