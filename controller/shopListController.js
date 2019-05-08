let shopListModel = require('../model/shopListModel.js');

let shopListController={
    shopList:(req,res)=>{
        shopListModel.shopList(req.body.type,(err,data)=>{
            if(err){
                console.log('商品列表数据库错误');
            }else{
                res.send({error:1,data});
            }
        })
    },
    getEvaluate:(req,res)=>{
        shopListModel.getEvaluate(req.body.s_id,(err,data)=>{
            if(err){
                console.log('获取评价数据库错误');
            }else{
                res.send({error:1,data});
            }
        })
    },
    bugShopping:(req,res)=>{
        shopListModel.bugShopping(req.body.s_id,req.body.u_id,req.body.o_time,req.body.o_num,req.body.o_price,(err,data)=>{
            if(err){
                console.log('加入购物车数据库错误')
            }else{
                res.send({error:1,data:data.insertId});
            }
        })
    },
    getShoppingCar:(req,res)=>{
        shopListModel.getShoppingCar(req.body.u_id,(err,data)=>{
            if(err){
                console.log('获取所有购物车数据库错误');
            }else{
                let shopCarList=[];
                data.forEach(v=>{
                    shopListModel.getShopInfo(v.s_id,(err,data1)=>{
                        if(err){
                            console.log('查询商品详情数据库错误');
                        }else{
                            let shopCar={
                                id: v.o_id,
                                name: data1[0].s_name,
                                category: data1[0].s_information+'水果',
                                desc:data1[0].s_info,
                                address: '成都市高新区',
                                shop: '果思旗舰店',
                                shopId: data1[0].s_id,
                                time:v.o_time,
                                img:data1[0].s_maxImg.split('|')[0],
                                price:v.o_price,
                                sum:v.o_num
                            };
                           shopCarList.unshift(shopCar);
                           if(shopCarList.length==data.length){
                               res.send({error:1,data:shopCarList});
                           }
                        }
                    })
                });
            }
        })
    },
    payMoney:(req,res)=>{
        shopListModel.payMoney(req.body.password,req.body.u_id,(err,data)=>{
            if(err){
                console.log('支付密码数据库错误');
            }else{
                if(data.length){
                    res.send({error:1});
                }else{
                    res.send({error:0});
                }
            }
        })
    },
    //setPendingGoodsType 设置订单 1待支付 2收货 3评价 4售后
    pendingGoods:(req,res)=>{
        let i=0;
        shopListModel.setPendingGoodsType(req.body.goods,req.body.u_id,req.body.time,2,(err,data)=>{
            if(err){
                console.log('添加到待收货数据库错误');
            }else{
                if(data.insertId){
                   i++;
                   if(i==req.body.goods.length){
                       shopListModel.removeShopCar(req.body.goods,(err,data1)=>{
                          if(err){
                              console.log('删除购物车信息数据库错误')
                          }else{
                              i--;
                              if(i==0){
                                  res.send({error:1});
                              }
                          }
                       });
                   }
                }
            }
        })
    },
    pendingPayment:(req,res)=>{
        let i=0;
        shopListModel.setPendingGoodsType(req.body.goods,req.body.u_id,req.body.time,1,(err,data)=>{
            if(err){
                console.log('添加到待付款数据库错误');
            }else{
                if(data.insertId){
                    i++;
                    if(i==req.body.goods.length){
                        shopListModel.removeShopCar(req.body.goods,(err,data1)=>{
                            if(err){
                                console.log('删除购物车信息数据库错误')
                            }else{
                                i--;
                                if(i==0){
                                    res.send({error:1});
                                }
                            }
                        });
                    }
                }
            }
        })
    },
    //getPendingType获取获取的种类 1待支付 2待收货 3评价 4退款
    getPendingPayment:(req,res)=>{
        shopListModel.getPendingType(req.body.u_id,1,(err,data)=>{
            if(err){
                console.log('获取全部待支付数据库错误')
            }else{
                let shopCarList=[];
                data.forEach(v=>{
                    shopListModel.getShopInfo(v.s_id,(err,data1)=>{
                        if(err){
                            console.log('查询商品详情数据库错误');
                        }else{
                            let shopCar={
                                id: v.v_id,
                                name: data1[0].s_name,
                                category: data1[0].s_information+'水果',
                                desc:data1[0].s_info,
                                address: '成都市高新区',
                                shop: '果思旗舰店',
                                shopId: data1[0].s_id,
                                time:v.v_time,
                                img:data1[0].s_maxImg.split('|')[0],
                                price:v.v_price,
                                sum:v.v_num
                            };
                            shopCarList.unshift(shopCar);
                            if(shopCarList.length==data.length){
                                res.send({error:1,data:shopCarList});
                            }
                        }
                    })
                });
            }
        })
    }
};

module.exports = shopListController;