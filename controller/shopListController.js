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
                                shopNum:data1[0].s_num,
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
                    shopListModel.payment(req.body.u_id,req.body.money,(err,data1)=>{
                        if(err){
                            console.log('付款数据库错误');
                        }else{
                            res.send({error:1});
                        }
                    });
                }else{
                    res.send({error:0});
                }
            }
        })
    },
    //setPendingGoodsType 设置订单 1待支付 2收货 3评价 4售后
    pendingGoods:(req,res)=>{
        let i=0;
        shopListModel.setPendingGoodsType(req.body.goods,req.body.u_id,req.body.time,2,req.body.a_id,(err,data)=>{
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
    //修改订单状态
    pendingGoodsL:(req,res)=>{
        let i=0;
        shopListModel.setPendingGoodsTypeL(req.body.goods,req.body.u_id,2,(err,data)=>{
            if(err){
                console.log('待支付添加到待收货数据库错误');
            }else{
                i++;
                if(i==req.body.goods.length){
                    res.send({error:1});
                }
            }
        })
    },
    pendingPayment:(req,res)=>{
        let i=0;
        shopListModel.setPendingGoodsType(req.body.goods,req.body.u_id,req.body.time,1,req.body.a_id,(err,data)=>{
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
                            shopListModel.getCurrentAddress(v.a_id,(err,data2)=>{
                               if(err){
                                   console.log('获取当前收货地址数据库错误');
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
                                       sum:v.v_num,
                                       a_id:data2[0].a_id,
                                       receiptName:data2[0].a_name,
                                       receiptPhone:data2[0].a_phone,
                                       receiptProvince:data2[0].a_province,
                                       receiptCity:data2[0].a_city,
                                       receiptArea:data2[0].a_area,
                                       receiptDetailed:data2[0].a_detailed,
                                   };
                                   shopCarList.unshift(shopCar);
                                   if(shopCarList.length==data.length){
                                       res.send({error:1,data:shopCarList});
                                   }
                               }
                            });

                        }
                    })
                });
            }
        })
    },
    getAddress:(req,res)=>{
        shopListModel.getAddress(req.body,(err,data)=>{
            if(err){
                console.log('添加收货地址数据库错误');
            }else{
                if(data.insertId){
                    res.send({error:1,data:data.insertId});
                }
            }
        })
    },
    getChangeAddress:(req,res)=>{
        shopListModel.getChangeAddress(req.body,(err,data)=>{
            if(err){
                console.log('修改收货地址数据库错误');
            }else{
                res.send({error:1})
            }
        })
    },
    getAllAddress:(req,res)=>{
        shopListModel.getAllAddress(req.body.u_id,(err,data)=>{
            if(err){
                console.log('获取所有收货地址数据库错误')
            }else{
                if(data.length){
                    res.send({error:1,data});
                }else{
                    res.send({error:0});
                }
            }
        })
    },
    removeAddress:(req,res)=>{
        shopListModel.removeAddress(req.body.a_id,req.body.u_id,(err,data)=>{
            if(err){
                console.log('删除收货地址数据库错误');
            }else{
                res.send({error:1})
            }
        })
    },
    removePedding:(req,res)=>{
        shopListModel.removeOreder(req.body.v_id,req.body.u_id,(err,data)=>{
            if(err){
                console.log('删除订单数据库错误');
            }else{
                res.send({error:1});
            }
        })
    },
    //getPendingType获取获取的种类 1待支付 2待收货 3评价 4退款
    getAllPendingReceipt:(req,res)=>{
        shopListModel.getPendingType(req.body.u_id,2,(err,data)=>{
            if(err){
                console.log('获取全部待收货数据库错误')
            }else{
                let shopCarList=[];
                data.forEach(v=>{
                    shopListModel.getShopInfo(v.s_id,(err,data1)=>{
                        if(err){
                            console.log('查询商品详情数据库错误');
                        }else{
                            shopListModel.getCurrentAddress(v.a_id,(err,data2)=>{
                                if(err){
                                    console.log('获取当前收货地址数据库错误');
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
                                        sum:v.v_num,
                                        a_id:data2[0].a_id,
                                        receiptName:data2[0].a_name,
                                        receiptPhone:data2[0].a_phone,
                                        receiptProvince:data2[0].a_province,
                                        receiptCity:data2[0].a_city,
                                        receiptArea:data2[0].a_area,
                                        receiptDetailed:data2[0].a_detailed,
                                    };
                                    shopCarList.unshift(shopCar);
                                    if(shopCarList.length==data.length){
                                        res.send({error:1,data:shopCarList});
                                    }
                                }
                            });

                        }
                    })
                });
            }
        })
    },
    removeShoppingCar:(req,res)=>{
        shopListModel.removeShoppingCar(req.body.o_id,req.body.u_id,(err,data)=>{
            if(err){
                console.log('删除购物车数据库错误')
            }else{
                res.send({error:1})
            }
        })
    },
    signing:(req,res)=>{
        shopListModel.signing(req.body.v_id,req.body.u_id,3,(err,data)=>{
            if(err){
                console.log('确认收货数据库错误');
            }else{
                res.send({error:1});
            }
        })
    },
    refund:(req,res)=>{
        shopListModel.signing(req.body.v_id,req.body.u_id,4,(err,data)=>{
            if(err){
                console.log('确认收货数据库错误');
            }else{
                res.send({error:1});
            }
        })
    },
    getAllShoppingEvaluate:(req,res)=>{
        shopListModel.getPendingType(req.body.u_id,3,(err,data)=>{
            if(err){
                console.log('获取全部评价数据库错误')
            }else{
                let shopCarList=[];
                data.forEach(v=>{
                    shopListModel.getShopInfo(v.s_id,(err,data1)=>{
                        if(err){
                            console.log('获取全部评价查询商品详情数据库错误');
                        }else{
                            shopListModel.getCurrentAddress(v.a_id,(err,data2)=>{
                                if(err){
                                    console.log('获取全部评价获取当前收货地址数据库错误');
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
                                        sum:v.v_num,
                                        a_id:data2[0].a_id,
                                        receiptName:data2[0].a_name,
                                        receiptPhone:data2[0].a_phone,
                                        receiptProvince:data2[0].a_province,
                                        receiptCity:data2[0].a_city,
                                        receiptArea:data2[0].a_area,
                                        receiptDetailed:data2[0].a_detailed,
                                    };
                                    shopCarList.unshift(shopCar);
                                    if(shopCarList.length==data.length){
                                        res.send({error:1,data:shopCarList});
                                    }
                                }
                            });

                        }
                    })
                });
            }
        })
    },
    getAllShoppingRefund:(req,res)=>{
        shopListModel.getPendingType(req.body.u_id,4,(err,data)=>{
            if(err){
                console.log('获取全部退款数据库错误')
            }else{
                let shopCarList=[];
                data.forEach(v=>{
                    shopListModel.getShopInfo(v.s_id,(err,data1)=>{
                        if(err){
                            console.log('获取全部退款查询商品详情数据库错误');
                        }else{
                            shopListModel.getCurrentAddress(v.a_id,(err,data2)=>{
                                if(err){
                                    console.log('获取全部退款获取当前收货地址数据库错误');
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
                                        sum:v.v_num,
                                        a_id:data2[0].a_id,
                                        receiptName:data2[0].a_name,
                                        receiptPhone:data2[0].a_phone,
                                        receiptProvince:data2[0].a_province,
                                        receiptCity:data2[0].a_city,
                                        receiptArea:data2[0].a_area,
                                        receiptDetailed:data2[0].a_detailed,
                                    };
                                    shopCarList.unshift(shopCar);
                                    if(shopCarList.length==data.length){
                                        res.send({error:1,data:shopCarList});
                                    }
                                }
                            });

                        }
                    })
                });
            }
        })
    },
    evaluationProduct:(req,res)=>{
        shopListModel.evaluationProduct(req.body.s_id,req.body.u_id,req.body.content,req.body.time,req.body.u_name,req.body.rate,(err,data)=>{
            if(err){
                console.log('评价商品数据库错误');
            }else{
                if(data.insertId){
                    res.send({error:1});
                }
            }
        })
    },
    setShoppingInfo:(req,res)=>{
        let i=0;
        shopListModel.setShoppingInfo(req.body.goods,(err,data)=>{
            if(err){
                console.log('更新商品库存数据库')
            }else{
                i++;
                if(i==req.body.goods.length){
                    res.send({error:1});
                }
            }
        })
    },
    getShoppingNum:(req,res)=>{
        let i=0;
        shopListModel.getShoppingNum(req.body.goods,(err,data)=>{
            if(err){
                console.log('获取商品库存数据库错误')
            }else{
                if(data[0].s_num>=req.body.goods[i].sum){
                    if(i==req.body.goods.length-1){
                        res.send({error:1});
                    }
                }else{
                    res.send({error:0})
                }
                i++;
            }
        })
    },
    getShoppingNums:(req,res)=>{
        shopListModel.getShoppingNums(req.body.goods,(err,data)=>{
            if(err){
                console.log('商品详情购买获取库存数据库错误')
            }else{
                if(req.body.num>data[0].s_num){
                    res.send({error:0})
                }else{
                    res.send({error:1})
                }
            }
        })
    }
};

module.exports = shopListController;