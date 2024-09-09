const router = require('express').Router();
const path = require('path');
const { createUser, getUser,dropUser } = require('./controllers/userController');
const { userValidationRules } = require('./validators/userValidator');


router.get("/users", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, 'views/users.html'));
})
router.post('/users/v1', userValidationRules(), createUser);
router.get('/users/v2:nombre', getUser);
router.get('/users/v3:nombre', dropUser);


module.exports = router;