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
    changeUserInfo:(userInfo,fn)=>{
        const sql='UPDATE USER SET u_name="'+userInfo.name+'",u_account="'+userInfo.account+'",u_pass="'+userInfo.pass+'",u_phone="'+userInfo.phone+'",u_mail="'+userInfo.mail+'",u_sex="'+userInfo.sex+'" WHERE u_id='+userInfo.id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    }
};

module.exports = loginModel;