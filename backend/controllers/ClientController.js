const { ClientModel } = require("../models/UserModel");
const PetModel = require("../models/PetModel");
/**
 * ClientController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
  /**
   * ClientController.list()
   */
  list: async (req, res) => {
    try {
      const users = await ClientModel.find(
        req.query.where,
        req.query.fields,
        req.query.sort
      )
        .select("-salt -hash")
        .populate('pets','_id name', 'Pet')
        .lean()
      return res.json(users);
    } catch (error) {
      return res.status(500).json({
        message:
          error && error.message ? error.message : "Error when getting Users.",
      });
    }
  },

  /**
   * ClientController.show()
   */
  show: async (req, res) => {
    try {
      const id =
        req.query.id || req.user.__userType !== "Admin" ? req.user._id : null;
      const User = await ClientModel.findOne({ _id: id })
        .select("-salt -hash")
        .lean();
      if (!User) {
        return res.status(404).json({
          message: "No such User",
        });
      }
      return res.json(User);
    } catch (error) {
      return res.status(500).json({
        message:
          error && error.message ? error.message : "Error when getting User.",
      });
    }
  },

  /**
   * ClientController.update()
   */
  update: async (req, res) => {
    try {
      const id =
        req.query.id || req.user.__userType !== "Admin" ? req.user._id : null;
      const User = await ClientModel.findOne({ _id: id }).select("-salt -hash");
      if (!User) {
        return res.status(404).json({
          message: "No such User",
        });
      }

      User.name = req.body.name ? req.body.name : User.name;
      User.email = req.body.email ? req.body.email : User.email;
      User.age = req.body.age ? req.body.age : User.age;
      User.dob = req.body.dob ? req.body.dob : User.dob;
      User.details = req.body.details ? req.body.details : User.details;

      await User.save();
      return res.json(User);
    } catch (error) {
      return res
        .status(error.status || 500)
        .send({
          message: error.message ? error.message : "Something went wrong",
        });
    }
  },

  /**
   * ClientController.remove()
   */
  remove: async (req, res) => {
    try {
      const id =
        req.query.id || req.user.__userType !== "Admin" ? req.user._id : null;
      const client = await ClientModel.findByIdAndRemove(id);
      if (!client) throw Error("Error when deleting the User.");
      await PetModel.deleteMany({
        _id: {
          $in: client.pets,
        },
      });
      return res.status(204).json();
    } catch (error) {
      return res
        .status(500)
        .send({
          message: error.message ? error.message : "Something went wrong",
        });
    }
  },
};
