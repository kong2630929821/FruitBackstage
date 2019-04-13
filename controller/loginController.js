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
    }
};

module.exports = loginController;