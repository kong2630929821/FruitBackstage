let mysql=require('mysql');
let db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'fruit'
});
let loginModel = {
    //注册
    register:(phone,account,pass,fn)=>{
        let sql='INSERT INTO user(u_account,u_pass,u_phone) VALUES("'+account+'","'+pass+'","'+phone+'");';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    //手机验证码登入
    phoneLogin:(phone,fn)=>{
        let sql='SELECT * FROM USER WHERE u_phone="'+phone+'";';
        db.query(sql,(err,data)=>{
            fn(err,data)
        })
    },
    //账号登入
    accountLogin:(account,pass,fn)=>{
        let sql='SELECT * FROM USER WHERE u_account="'+account+'" AND u_pass="'+pass+'";';
        db.query(sql,(err,data)=>{
            fn(err,data)
        })
    },
    //头像上传
    uploads:(id,img,fn)=>{
        let sql='UPDATE user SET u_img="'+img+'" WHERE u_id='+id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    //修改个人资料
    changeUserInfo:(userInfo,pass,fn)=>{
        const sql='UPDATE USER SET u_name="'+userInfo.u_name+'",u_account="'+userInfo.u_account+'",u_pass="'+pass+'",u_phone="'+userInfo.u_phone+'",u_mail="'+userInfo.u_mail+'",u_sex="'+userInfo.u_sex+'" WHERE u_id='+userInfo.u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    }
};

module.exports = loginModel;