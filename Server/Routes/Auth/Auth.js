const expresss = require('express');
const AuthController = require('../../Controllers/Auth/Auth');

const router = expresss.Router();



// Sign Up Route
router.post('/register',AuthController.signUp)
router.post('/register/verify',AuthController.verifyRegisteredUser)
router.post('/login',AuthController.loginUser)


module.exports = router