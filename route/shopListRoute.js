let express =require('express');
let shopListConroller = require('../controller/shopListController.js');

let myRouter =express.Router();
myRouter.route('/shopList').post(shopListConroller.shopList);//获取商品列表
myRouter.route('/getEvaluate').post(shopListConroller.getEvaluate);//获取商品评价
myRouter.route('/bugShopping').post(shopListConroller.bugShopping);//加入购物车
myRouter.route('/getShoppingCar').post(shopListConroller.getShoppingCar);//获取所有购物车
myRouter.route('/payMoney').post(shopListConroller.payMoney);//支付密码
myRouter.route('/pendingGoods').post(shopListConroller.pendingGoods);//添加到待收货
myRouter.route('/pendingPayment').post(shopListConroller.pendingPayment);//添加到待付款
myRouter.route('/getPendingPayment').post(shopListConroller.getPendingPayment);//获取所有待付款
module.exports=myRouter;