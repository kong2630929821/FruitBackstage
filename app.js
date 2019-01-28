let express=require('express');
let bodyParser=require('body-parser');//post请求
let serveFavicon=require('serve-favicon');//图标
let AV=require('leanengine');//短信服务
let strong=require('leancloud-storage');//缓存
let app=express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:false}));
app.listen(1015,function () {
   console.log('项目启动')
});
