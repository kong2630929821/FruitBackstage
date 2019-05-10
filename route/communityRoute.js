let express =require('express');
let communityController = require('../controller/communityController.js');

let myRouter =express.Router();
myRouter.route('/release').post(communityController.release);//发布话题
myRouter.route('/getAllTopics').post(communityController.getAllTopics);//获取全部话题
myRouter.route('/getTheTopic').post(communityController.getTheTopic);//获取当前话题
myRouter.route('/discuss').post(communityController.discuss);//发布评论
myRouter.route('/getAllComments').post(communityController.getAllComments);//获取所有评论
myRouter.route('/answer').post(communityController.answer);//回复评论人
myRouter.route('/answered').post(communityController.answered);//回复回复人
myRouter.route('/getAllReplies').post(communityController.getAllReplies);//获取所有回复
myRouter.route('/removeDiscuss').post(communityController.removeDiscuss);//删除当前的评论
myRouter.route('/removeReply').post(communityController.removeReply);//删除当前的回复
myRouter.route('/removeReplyed').post(communityController.removeReplyed);//删除当前的回复的回复
myRouter.route('/like').post(communityController.like);//点赞
myRouter.route('/collect').post(communityController.collect);//点赞
myRouter.route('/findLike').post(communityController.findLike);//获取当前用户是否点赞
myRouter.route('/findCollect').post(communityController.findCollect);//获取当前用户是否收藏
myRouter.route('/deleteTopic').post(communityController.deleteTopic);//获取当前话题
module.exports=myRouter;