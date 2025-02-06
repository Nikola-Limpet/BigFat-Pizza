const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const { registerSchema, loginSchema } = require('../validation/authValidation');

router.post(
  '/register',
  validateRequest.validateBody(registerSchema),
  authController.register
);
router.post(
  '/login',
  validateRequest.validateBody(loginSchema),
  authController.login
);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
