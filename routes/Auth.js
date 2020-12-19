const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

const { verifyToken, HasRole } = require('../middlewares/Auth')

/*
 * POST
 */
router.post('/signup', (req, res) => {
  AuthController.signup(req, res);
});

/*
 * POST
 */
router.post('/signin', (req, res) => {
    AuthController.signin(req, res);
});

/*
 * POST
 */
router.post('/setPassword', verifyToken, HasRole(['Admin', 'Clinic', 'Client', 'Doctor']), (req, res) => {
    AuthController.setPassword(req, res);
});


module.exports = router;
