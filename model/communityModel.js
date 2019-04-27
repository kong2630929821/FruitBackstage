
let mysql=require('mysql');
let db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'fruit'
});
var communityModel={
    release:(id,content,date,fn)=>{
        let sql='INSERT INTO push(p_content,u_id,p_time) VALUES("'+content+'",'+id+',"'+date+'");';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    postImage:(id,src,fn)=>{
        src.forEach(v=>{
            let sql='INSERT INTO postImage(p_id,pi_src) VALUES('+id+',"http://localhost:1086/images/push/'+v+'");';
            db.query(sql,(err,data)=>{
                fn(err,data);
            })
        });
    },
    loadpush:function f(fn) {
        var sql='SELECT * FROM push';
        db.query(sql, (err,data)=> {
            fn(err,data)
        })
    },
    loadpushimg:function f(fn) {
        var sql='SELECT * FROM postImage;';
        db.query(sql,(err,data1)=> {
            fn(err,data1)
        })

    },
    getTheTopic:(id,fn)=>{
        const sql='SELECT * FROM push WHERE p_id='+id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    getTheTopicImg:(id,fn)=>{
        const sql='SELECT pi_src FROM postimage WHERE p_id='+id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    getTheTopicUser:(id,fn)=>{
        const sql='SELECT * FROM USER WHERE u_id='+id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    discuss:(p_id,u_id,d_content,d_time,fn)=>{
        const sql='INSERT INTO discuss VALUES(NULL,'+p_id+','+u_id+',"'+d_content+'","'+d_time+'");';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    }
};
module.exports=communityModel;