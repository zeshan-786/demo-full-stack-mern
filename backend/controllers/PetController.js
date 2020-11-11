const PetModel = require('../models/PetModel.js');
const { ClientModel } = require('../models/UserModel')

/**
 * PetController.js
 *
 * @description :: Server-side logic for managing Pets.
 */
module.exports = {

  /**
   * PetController.list()
   */

  list: (req, res) => {
    let filter = req.query.where
    owner = req.user.__userType !== 'Admin' ? req.user._id : null
    filter = owner ? {owner: owner} : filter
  
    PetModel.find(filter, req.query.fields, req.query.sort, (err, Pets) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Pets.',
          error: err
        });
      }
      return res.json(Pets);
    });
  },

  /**
   * PetController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    PetModel.findOne({_id: id}, (err, Pet) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Pet.',
          error: err
        });
      }
      if (!Pet) {
        return res.status(404).json({
          message: 'No such Pet'
        });
      }
      return res.json(Pet);
    });
  },

  /**
   * PetController.create()
   */
  create: async (req, res) => {
    const owner = req.body.owner || req.user.__userType !== 'Admin' ? req.user._id : null
    const Pet = new PetModel({
			name : req.body.name,
			dob : req.body.dob,
			breed : req.body.breed,
			type : req.body.type,
      appointments : req.body.appointments,
      owner: owner
    });

    await Pet.save()
    ClientModel.findOneAndUpdate({ _id: owner }, { $push: { pets: [Pet._id] } })
      .then( client => {
        console.log("Client Updated: ", client);
      })
      .catch( err => {
        console.log("Error while Client Update: ", err);
      })
    return res.status(201).json(pet);
  },

  /**
   * PetController.update()
   */
  update: (req, res) => {
    const id = req.params.id;
    PetModel.findOne({_id: id}, (err, Pet) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Pet',
          error: err
        });
      }
      if (!Pet) {
        return res.status(404).json({
          message: 'No such Pet'
        });
      }

      Pet.name = req.body.name ? req.body.name : Pet.name;
			Pet.dob = req.body.dob ? req.body.dob : Pet.dob;
			Pet.breed = req.body.breed ? req.body.breed : Pet.breed;
			Pet.type = req.body.type ? req.body.type : Pet.type;
			
      Pet.save( (err, Pet) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Pet.',
            error: err
          });
        }
        return res.json(Pet);
      });
    });
  },

  /**
   * PetController.remove()
   */
  remove: (req, res) => {
    const id = req.params.id;
    PetModel.findByIdAndRemove(id, (err, Pet) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Pet.',
          error: err
        });
      }
      if(!Pet) return res.status(404).json({ message: 'Pet not found' });
        ClientModel.findOneAndUpdate({ _id: Pet.owner }, { $pull: { pets: Pet._id } }, function(error, obj) {
          if (error) {
            console.log("Error while updating clients: ",error);
          }
          console.log("Updated Client: ",obj);
        });
      return res.status(204).json();
    });
  }
};
