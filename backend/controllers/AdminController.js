const { AdminModel } = require("../models/UserModel");

/**
 * AdminController.js
 *
 * @description :: Server-side logic for managing Admins.
 */
module.exports = {
  /**
   * AdminController.list()
   */

  list: (req, res) => {
    let filter = req.query.where;
    AdminModel.find(filter, req.query.fields, req.query.sort, (err, Admins) => {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Admins.",
          error: err,
        });
      }
      return res.json(Admins);
    });
  },

  /**
   * AdminController.show()
   */
  show: async (req, res) => {
    try {
      const id = req.user._id 
      const Admin = await AdminModel.findOne({_id: id}).select('-salt -hash').lean()
      if (!Admin) {
        return res.status(404).json({
          message: 'No such Admin'
        });
      }
      return res.json(Admin);
    } catch (error) {
      return res.status(500).json({
        message: error && error.message ? error.message : 'Error when getting Admin.'
      });
    }
  },

  /**
   * AdminController.update()
   */
  update: (req, res) => {
    const id = req.query.id || req.user._id
    AdminModel.findOne({ _id: id }, (err, Admin) => {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Admin",
          error: err,
        });
      }
      if (!Admin) {
        return res.status(404).json({
          message: "No such Admin",
        });
      }

      Admin.name = req.body.name ? req.body.name : Admin.name;
      Admin.email = req.body.email ? req.body.email : Admin.email;
      Admin.age = req.body.age ? req.body.age : Admin.age;
      Admin.dob = req.body.dob ? req.body.dob : Admin.dob;
      Admin.details = req.body.details ? req.body.details : Admin.details;

      Admin.save((err, Admin) => {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Admin.",
            error: err,
          });
        }
        return res.json(Admin);
      });
    });
  },

  /**
   * AdminController.remove()
   */
  remove: (req, res) => {
    const id = req.query.id || req.user._id
    AdminModel.findByIdAndRemove(id, (err, Admin) => {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Admin.",
          error: err,
        });
      }
      if (!Admin) return res.status(404).json({ message: "Admin not found" });
      return res.status(204).json();
    });
  },
};
