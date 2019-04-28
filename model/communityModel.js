
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
    },
    getAllComments:(id,fn)=>{
        const sql='SELECT * FROM discuss WHERE p_id='+id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    getTheAllUser:(id,fn)=>{
        id.forEach(v=>{
            const sql='SELECT u_name,u_img FROM USER WHERE u_id='+v+';';
            db.query(sql,(err,data)=>{
                fn(err,data);
            })
        });
    },
    answer:(req,fn)=>{
        const str=req.body;
        const sql='INSERT INTO reply VALUES(NULL,'+str.p_id+','+str.r_meId+','+str.r_heId+',"'+str.r_time+'","'+str.r_content+'","'+str.r_meName+'","'+str.r_heName+'","'+str.r_meSrc+'",'+str.d_id+',NULL);';
        db.query(sql,(err,data)=>{
            fn(err,data);
        });
    },
    answered:(req,fn)=>{
        const str=req.body;
        const sql='INSERT INTO reply VALUES(NULL,'+str.p_id+','+str.r_meId+','+str.r_heId+',"'+str.r_time+'","'+str.r_content+'","'+str.r_meName+'","'+str.r_heName+'","'+str.r_meSrc+'",'+str.d_id+','+str.rr_id+');';
        db.query(sql,(err,data)=>{
            fn(err,data);
        });
    },
    getAllReplies:(p_id,fn)=>{
        const sql='SELECT * FROM reply WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    changeReplyNum:(p_id,fn)=>{
        const sql='UPDATE push SET p_discuss=p_discuss+1 WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        });
    },
    getDiscussNum:(p_id,fn)=>{
        const sql='SELECT p_discuss FROM push WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    removeDiscuss:(p_id,d_id,fn)=>{
        const sql='DELETE FROM discuss WHERE p_id='+p_id+'&& d_id='+d_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    removeReply:(r_id,d_id,p_id,fn)=>{
        const sql='DELETE FROM reply WHERE d_id='+d_id+' && r_id='+r_id+' && p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    unChangeReplyNum:(p_id,n,fn)=>{
        const sql='UPDATE push SET p_discuss=p_discuss-'+n+' WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        });
    },
    removeReplyed:(p_id,rr_id,r_id,fn)=>{
        const sql='DELETE FROM reply WHERE p_id='+p_id+' && r_id='+r_id+' && rr_id='+rr_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        });
    },
    findUnNum:(p_id,r_id,fn)=>{
        const sql='SELECT * FROM reply WHERE p_id='+p_id+' && rr_id='+r_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    findUnDisNum:(p_id,d_id,fn)=>{
        const sql='SELECT * FROM reply WHERE p_id='+p_id+' && d_id='+d_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    like:(p_id,u_id,fn)=>{
        const sql='INSERT INTO zan VALUES(NULL,'+u_id+','+p_id+');';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    findLikeNum:(p_id,fn)=>{
        const sql='SELECT p_zan FROM push WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    setZan:(p_id,fn)=>{
        const sql='UPDATE push SET p_zan=p_zan+1 WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    findLike:(p_id,u_id,fn)=>{
        const sql='SELECT * FROM zan WHERE p_id='+p_id+' && u_id='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    removeZan:(p_id,u_id,fn)=>{
        const sql='DELETE FROM zan WHERE p_id='+p_id+' && u_id='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    unSetZan:(p_id,fn)=>{
        const sql='UPDATE push SET p_zan=p_zan-1 WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    collect:(p_id,u_id,fn)=>{
        const sql='INSERT INTO collect VALUES(NULL,'+u_id+','+p_id+',NULL);';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    findCollectNum:(p_id,fn)=>{
        const sql='SELECT p_collect FROM push WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    setCollect:(p_id,fn)=>{
        const sql='UPDATE push SET p_collect=p_collect+1 WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    findCollect:(p_id,u_id,fn)=>{
        const sql='SELECT * FROM collect WHERE p_id='+p_id+' && u_id='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    removeCollect:(p_id,u_id,fn)=>{
        const sql='DELETE FROM collect WHERE p_id='+p_id+' && u_id='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    unSetCollect:(p_id,fn)=>{
        const sql='UPDATE push SET p_collect=p_collect-1 WHERE p_id='+p_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
};
module.exports=communityModel;