const expresss = require('express');
const AuthController = require('../../Controllers/Auth/Auth');
// const upload = require('../../Middlewares/Miscellaneous/uploadFile')
// const uploadImage = require('../../Utils/uploadImage')
const router = expresss.Router();



// Sign Up Route
router.post('/register',AuthController.signUp)
router.post('/register/verify',AuthController.verifyRegisteredUser)
router.post('/login',AuthController.loginUser)

// router.post('/sampleCheck',upload.single('file'), async (req,res) => {
//     const result = await uploadImage(req.file)
//     console.log(result)
// })


module.exports = router