let express =require('express');
let loginConroller = require('../controller/loginController.js');

let myRouter =express.Router();
myRouter.route('/accountLogin').post(loginConroller.accountLogin);//账号登入
myRouter.route('/phoneLogin').post(loginConroller.phoneLogin);//手机号码登入
myRouter.route('/changeUserInfo').post(loginConroller.changeUserInfo);//手机号码登入
module.exports=myRouter;