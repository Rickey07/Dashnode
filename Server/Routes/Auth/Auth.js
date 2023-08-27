const expresss = require('express');
const AuthController = require('../../Controllers/Auth/Auth');

const router = expresss.Router();



// Sign Up Route
router.post('/register',AuthController.signUp)


module.exports = router