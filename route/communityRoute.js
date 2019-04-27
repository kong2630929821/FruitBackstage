let express =require('express');
let communityController = require('../controller/communityController.js');

let myRouter =express.Router();
myRouter.route('/release').post(communityController.release);//发布话题
myRouter.route('/getAllTopics').post(communityController.getAllTopics);//获取全部话题
myRouter.route('/getTheTopic').post(communityController.getTheTopic);//获取当前话题
myRouter.route('/discuss').post(communityController.discuss);//发布评论
module.exports=myRouter;