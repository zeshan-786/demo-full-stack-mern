const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController.js');

const { verifyToken, HasRole } = require('../middlewares/Auth')

/*
 * MIDDLEWARE
 */
router.use((req, res, next ) => {
let query = {};  

if(req.query.where)
  query.where = JSON.parse(req.query.where);

if(req.query.fields)
  query.fields = JSON.parse(req.query.fields);

if(req.query.sort)
  query.sort = {sort : JSON.parse(req.query.sort)};
else
  query.sort = {};

if(req.query.limit)
  query.sort.limit = parseInt(req.query.limit);

if(req.query.skip)
  query.sort.skip = parseInt(req.query.skip);

req.query = query;

next();
})

/*
 * GET
 */
router.get('/', verifyToken, HasRole(['Admin', 'Clinic', 'Client', 'Doctor']), (req, res) => {
  AppointmentController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', verifyToken, HasRole(['Admin', 'Clinic', 'Client', 'Doctor']), (req, res) => {
  AppointmentController.show(req, res);
});

/*
 * POST
 */
router.post('/',  verifyToken, HasRole(['Admin', 'Clinic']), (req, res) => {
  AppointmentController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', verifyToken, HasRole(['Admin', 'Clinic']), (req, res) => {
  AppointmentController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', verifyToken, HasRole(['Admin', 'Clinic']), (req, res) => {
  AppointmentController.remove(req, res);
});

module.exports = router;
