/**
 * Created by Administrator on 2018/12/6.
 */
let multer=require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb)=> {//指定硬盘保存的路径和文件位置
        cb(null, './public/images/push')
    },
    filename: (req, file, cb)=> {//指定文件名和扩展名
        let arr=file.originalname.split('.');
        cb(null,arr[0]+'.'+arr[1])
    }
});
let upload = multer({ storage: storage});
module.exports=upload;