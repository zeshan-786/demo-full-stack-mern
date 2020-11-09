const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/DoctorController.js');

const { signup } = require('../controllers/AuthController');

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
router.get('/', verifyToken, HasRole(['Admin', 'Clinic']),  (req, res) => {
  DoctorController.list(req, res);
});

/*
 * GET
 */
router.get('/me', verifyToken, HasRole(['Admin', 'Clinic', 'Doctor']), (req, res) => {
  DoctorController.show(req, res);
});

/*
 * POST
 */
router.post('/', verifyToken, HasRole(['Admin', 'Clinic']), (req, res) => {
  signup(req, res)
});

/*
 * PUT
 */
router.put('/', verifyToken, HasRole(['Admin', 'Clinic', 'Doctor']), (req, res) => {
  DoctorController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/', verifyToken, HasRole(['Admin', 'Clinic', 'Doctor']), (req, res) => {
  DoctorController.remove(req, res);
});

module.exports = router;
