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
    setPendingGoodsType:(goods,u_id,time,type,a_id,fn)=>{
        goods.forEach(v=>{
            let sql='INSERT INTO orders VALUES(NULL,'+u_id+','+v.shopId+','+type+','+v.price+','+v.sum+',"'+time+'",'+a_id+')';
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
    },
    getAddress:(data,fn)=>{
        let sql='INSERT INTO address VALUES(NULL,'+data.u_id+',"'+data.phone+'","'+data.province+'","'+data.city+'","'+data.area+'","'+data.detailed+'","'+data.mail+'","'+data.name+'");';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    getChangeAddress:(data,fn)=>{
        let sql='UPDATE address SET a_phone="'+data.phone+'",a_province="'+data.province+'",a_city="'+data.city+'",a_area="'+data.area+'",a_detailed="'+data.detailed+'",a_mail="'+data.mail+'",a_name="'+data.name+'" WHERE u_id='+data.u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    getAllAddress:(u_id,fn)=>{
        let sql='SELECT * FROM address WHERE u_id='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    removeAddress:(a_id,u_id,fn)=>{
        let sql='DELETE FROM address WHERE a_id='+a_id+' AND u_id='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    getCurrentAddress:(a_id,fn)=>{
        let sql='SELECT * FROM address WHERE a_id='+a_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    payment:(u_id,money,fn)=>{
        let sql='UPDATE USER SET money=money-'+money+' WHERE u_id='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    setPendingGoodsTypeL:(goods,u_id,type,fn)=>{
        goods.forEach(v=>{
            let sql='UPDATE orders SET v_type=2 WHERE v_uid='+u_id+' AND v_id='+v.id+';';
            db.query(sql,(err,data)=>{
                fn(err,data);
            })
        })
    },
    removeOreder:(v_id,u_id,fn)=>{
        let sql='DELETE FROM orders WHERE v_id='+v_id+' AND v_uid='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    removeShoppingCar:(o_id,u_id,fn)=>{
        let sql='DELETE FROM buy WHERE o_id='+o_id+' AND u_id='+u_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    signing:(v_id,u_id,type,fn)=>{
        let sql='UPDATE orders SET v_type='+type+' WHERE v_uid='+u_id+' AND v_id='+v_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    evaluationProduct:(s_id,u_id,content,time,u_name,rate,fn)=>{
        let sql='INSERT INTO evaluate VALUES(NULL,'+s_id+','+u_id+',"'+time+'","'+rate+'","'+content+'","'+u_name+'");';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    },
    setShoppingInfo:(goods,fn)=>{
        goods.forEach(v=>{
            let sql='UPDATE shop SET s_sold=s_sold+1,s_num=s_num-'+v.sum+' WHERE s_id='+v.shopId+'';
            db.query(sql,(err,data)=>{
                fn(err,data);
            })
        })
    },
    getShoppingNum:(goods,fn)=>{
        goods.forEach(v=>{
            let sql='SELECT s_num FROM shop WHERE s_id='+v.shopId+';';
            db.query(sql,(err,data)=>{
                fn(err,data);
            })
        })
    },
    getShoppingNums:(goods,fn)=>{
        let sql='SELECT s_num FROM shop WHERE s_id='+goods.s_id+';';
        db.query(sql,(err,data)=>{
            fn(err,data);
        })
    }
};

module.exports = shopListModel;