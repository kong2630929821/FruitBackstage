let express =require('express');
let shopListConroller = require('../controller/shopListController.js');

let myRouter =express.Router();
myRouter.route('/shopList').post(shopListConroller.shopList);//获取商品列表
myRouter.route('/getEvaluate').post(shopListConroller.getEvaluate);//获取商品评价
myRouter.route('/bugShopping').post(shopListConroller.bugShopping);//加入购物车
myRouter.route('/getShoppingCar').post(shopListConroller.getShoppingCar);//获取所有购物车
myRouter.route('/payMoney').post(shopListConroller.payMoney);//支付密码
myRouter.route('/pendingGoods').post(shopListConroller.pendingGoods);//添加到待收货
myRouter.route('/pendingGoodsL').post(shopListConroller.pendingGoodsL);//待支付添加到待收货
myRouter.route('/pendingPayment').post(shopListConroller.pendingPayment);//添加到待付款
myRouter.route('/getPendingPayment').post(shopListConroller.getPendingPayment);//获取所有待付款
myRouter.route('/getAddress').post(shopListConroller.getAddress);//添加收货地址
myRouter.route('/getChangeAddress').post(shopListConroller.getChangeAddress);//修改收货地址
myRouter.route('/getAllAddress').post(shopListConroller.getAllAddress);//获取所有收货地址
myRouter.route('/removeAddress').post(shopListConroller.removeAddress);//删除当前收货地址
myRouter.route('/removePedding').post(shopListConroller.removePedding);//删除当前待收货
myRouter.route('/removeShoppingCar').post(shopListConroller.removeShoppingCar);//删除当前待收货
myRouter.route('/getAllPendingReceipt').post(shopListConroller.getAllPendingReceipt);//获取所有待收货
myRouter.route('/signing').post(shopListConroller.signing);//添加到评价
myRouter.route('/refund').post(shopListConroller.refund);//添加到售后
myRouter.route('/getAllShoppingEvaluate').post(shopListConroller.getAllShoppingEvaluate);//获取所有评价商品列表
myRouter.route('/getAllShoppingRefund').post(shopListConroller.getAllShoppingRefund);//获取所有退款商品列表
myRouter.route('/evaluationProduct').post(shopListConroller.evaluationProduct);//评价购买的商品
myRouter.route('/setShoppingInfo').post(shopListConroller.setShoppingInfo);//更新商品的库存和购买人数
myRouter.route('/getShoppingNum').post(shopListConroller.getShoppingNum);//获取商品的库存
myRouter.route('/getShoppingNums').post(shopListConroller.getShoppingNums);//获取当前商品的库存
myRouter.route('/setCollection').post(shopListConroller.setCollection);//获取当前商品的加入购物车数量
module.exports=myRouter;