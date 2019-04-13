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
    }
};

module.exports = loginModel;