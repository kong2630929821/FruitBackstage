let mysql=require('mysql');
let db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'fruit'
});
let shopListModel = {
    shopList:(type,fn)=>{
        let sql='SELECT * FROM shop WHERE s_type='+type+';';
        db.query(sql,(err,data)=>{
            fn(err,data)
        })
    },
    getEvaluate:(s_id,fn)=>{
        let sql='SELECT * FROM evaluate WHERE s_id='+s_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    bugShopping:(s_id,u_id,o_time,o_num,o_price,fn)=>{
        let sql='INSERT INTO buy VALUES(NULL,'+s_id+','+u_id+',"'+o_time+'",'+o_num+','+o_price+');';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    getShoppingCar:(u_id,fn)=>{
        let sql='SELECT * FROM buy WHERE u_id='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    getShopInfo:(s_id,fn)=>{
        let sql='SELECT * FROM shop WHERE s_id='+s_id+'';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    payMoney:(password,u_id,fn)=>{
        let sql='SELECT * FROM USER WHERE u_id='+u_id+' AND u_pass="'+password+'";';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    setPendingGoodsType:(goods,u_id,time,type,fn)=>{
        goods.forEach(v=>{
            let sql='INSERT INTO orders VALUES(NULL,'+u_id+','+v.shopId+','+type+','+v.price+','+v.sum+',"'+time+'")';
            db.query(sql,(err,data)=>{
                fn(err,data);
            })
        });
    },
    removeShopCar:(goods,fn)=>{
        goods.forEach(v=>{
            let sql='DELETE FROM buy WHERE o_id='+v.id+'';
            db.query(sql,(err,data)=>{
                fn(err,data);
            })
        })
    },
    getPendingType:(u_id,type,fn)=>{
        let sql='SELECT * FROM orders WHERE v_uid='+u_id+' AND v_type='+type+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    }
};

module.exports = shopListModel;