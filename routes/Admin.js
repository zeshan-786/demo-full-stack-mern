const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

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
router.get('/', verifyToken, HasRole(['Admin']), (req, res) => {
  AdminController.list(req, res);
});

/*
 * GET
 */
router.get('/me', verifyToken, HasRole(['Admin']), (req, res) => {
  AdminController.show(req, res);
});

/*
 * POST
 */
router.post('/', verifyToken, HasRole(['Admin']), (req, res) => {
  signup(req, res);
});

/*
 * PUT
 */
router.put('/', verifyToken, HasRole(['Admin']), (req, res) => {
  AdminController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/', verifyToken, HasRole(['Admin']), (req, res) => {
  AdminController.remove(req, res);
});

module.exports = router;
