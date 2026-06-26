const {Router} = require('express');
const {register, login} = require('../controllers/auth.controller')
const {authenticate} = require('../middlewares/auth.middleware')
const {validate} = require('../middlewares/validate.middleware')
const {registerValidator , loginValidator} = require('../validators/auth.validator')

const router = Router();

router.post('/register', registerValidator , validate, register);
router.post('/login', loginValidator , validate , login);

module.exports = router;