let express=require('express');
let bodyParser=require('body-parser');//post请求
let serveFavicon=require('serve-favicon');//图标
let AV=require('leanengine');//短信服务
let multer=require('./unitls/upload.js');//上传文件
let strong=require('leancloud-storage');//缓存
let loginModel = require('./model/loginModel.js');
let loginRoute = require('./route/loginRoute.js');//登入相关路由
let communityRoute=require('./route/communityRoute.js');//发布的路由
let cors=require('cors');//跨域
let app=express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({
   origin:['http://localhost:8080'],
   methods:['GET','POST'],
   alloweHeaders:['Content-Type','Authorization']
}));
AV.init({
   appId: 'Gu4QgBwgLx8Cp1HLcTwVrM1k-gzGzoHsz',
   appKey: 'nVx9o7Hc2J4hJAPLVWAXdR3V',
   masterKey: '972VpyRFnXwdbAlD7PVKXGd3'
});
app.use(AV.express());
//获取验证码
app.post('/getCode',function (req,res) {
   AV.Cloud.requestSmsCode({
      mobilePhoneNumber:req.body.phone,
      name: '果思',
      op: '短信验证',
      ttl: 10                     // 验证码有效时间为 10 分钟
   }).then(function(res){
      //调用成功
      console.log(req.body.phone);
      res.send({"error":0})
   }, function(err){
      //调用失败
      res.send({"error":1})
   });
});
//注册
app.post('/register',(req,res)=>{
   AV.Cloud.verifySmsCode(req.body.code,req.body.phone).then(function(){
      //验证成功
      loginModel.register(req.body.phone,req.body.account,req.body.pass,(err,data)=>{
         if(err){
            console.log('数据库错误');
         }else{
            console.log(data);
            res.send({"error":1,"id":data.insertId});
         }
      });
   }, function(err){
      //验证失败
      res.send({"error":0})
   });
});
//验证码登入
app.post('/loginPhone',function (req,res) {
   AV.Cloud.verifySmsCode(req.body.code,req.body.phone).then(function(){
      //验证成功
      loginModel.phoneLogin(req.body.phone,(err,data)=>{
         if(err){
            console.log('数据库错误');
         }else{
            console.log(data);
            res.send({error:1,data:data});
         }
      })
   }, function(err){
      //验证失败
      res.send({"error":0})
   });
});
//验证码修改资料
app.post('/changeUserInfo',function (req,res) {
   AV.Cloud.verifySmsCode(req.body.code,req.body.phone).then(function(){
      //验证成功
      loginModel.changeUserInfo(req.body.userInfo,(err,data)=>{
         if(err){
            console.log('数据库错误');
         }else{
            console.log(data);
            res.send({error:1,data:data});
         }
      })
   }, function(err){
      //验证失败
      res.send({"error":0})
   });
});
//头像上传
app.post('/uploads',multer.single('files'),(req,res)=> {
   loginModel.uploads(req.body.u_id,req.body.files,(err,data)=> {
      if(err){
         console.log('数据库错误'+err)
      }else{
         res.send({error:1})
      }
   })
});
//图片上传
app.post('/upload',multer.array('files',9),function (req,res) {
   res.send({error:0});
});
/*=============================使用路由=============================*/
app.use(loginRoute);
app.use(communityRoute);
app.listen(1086,function () {
   console.log('项目启动')
});
