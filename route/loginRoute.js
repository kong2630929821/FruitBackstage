let express =require('express');
let loginConroller = require('../controller/loginController.js');

let myRouter =express.Router();
myRouter.route('/accountLogin').post(loginConroller.accountLogin);//账号登入
module.exports=myRouter;