let loginModel = require('../model/loginModel.js');

let loginController={
    //账号登入
    accountLogin:(req,res)=>{
        loginModel.accountLogin(req.body.account,req.body.pass,(err,data)=>{
            if(err){
                console.log('账号登入数据库错误');
            }else{
                if(data.length){
                    res.send({error:1,data:data});
                }else{
                    res.send({error:0});
                }
            }
        })
    },
    phoneLogin:(req,res)=>{
        loginModel.phoneLogin(req.body.phone,(err,data)=>{
            if(err){
                console.log('账号登入数据库错误');
            }else{
                if(data.length){
                    res.send({error:1,data:data});
                }else{
                    res.send({error:0});
                }
            }
        })
    },
    changeUserInfo:(req,res)=>{
        loginModel.changeUserInfo(req.body.userInfo,req.body.pass,(err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.send({error:1});
            }
        })
    }
};

module.exports = loginController;