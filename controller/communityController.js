let communityModel=require('../model/communityModel.js');
let communityController={
    release:(req,res)=>{
        communityModel.release(req.body.id,req.body.content,req.body.date,(err,data)=>{
            if(err){
                console.log('社区发布数据库错误');
            }else{
                console.log('发表内容',data,req.body.src);
                const insertId=data.insertId;
                communityModel.postImage(insertId,req.body.src,(err,data)=>{
                    if(err){
                        console.log('发表图片数据库错误');
                    }else{
                        console.log('发布图片',data);
                    }
                });
                res.send({error:1,id:insertId});
            }
        });
    },
    getAllTopics:(req,res)=>{
        communityModel.loadpush((err,data)=> {
            if(err){
                console.log('获取全部话题内容数据库错误'+err)
            }else{
                communityModel.loadpushimg((err,data1)=> {
                    if(err){
                        console.log('获取全部话题图片数据库错误'+err)
                    }else{
                        var array=[];
                        for(var i=0;i<data.length;i++){
                            var json={};
                            json.p_id=data[i].p_id;
                            json.p_content=data[i].p_content;
                            json.u_id=data[i].u_id;
                            json.p_zan=data[i].p_zan;
                            json.p_discuss=data[i].p_discuss;
                            json.p_collect=data[i].p_collect;
                            json.p_relay=data[i].p_relay;
                            json.p_time=data[i].p_time;
                            json.src='';
                            for(var j=0;j<data1.length;j++){
                                if(json.src){
                                    json.src=json.src+'|'+data1[j].pi_img;
                                }else{
                                    json.src=json.src+data1[j].pi_img;
                                }
                            }
                            array.push(json);
                        }
                        res.send({error:1,data:array});
                    }
                })
            }
        })
    },
    getTheTopic:(req,res)=>{
        communityModel.getTheTopic(req.body.id,(err,data)=>{
            if(err){
                console.log('获取当前话题数据库错误');
            }else{
                if(data.length){
                    communityModel.getTheTopicImg(req.body.id,(err,data1)=>{
                        if(err){
                            console.log('获取当前话题图片数据库错误');
                        }else{
                            const u_id=data[0].u_id;
                            communityModel.getTheTopicUser(u_id,(err,data2)=>{
                                if(err){
                                    console.log('获取当前话题用户数据库错误');
                                }else{
                                    var json={};
                                    json.p_id=data[0].p_id;
                                    json.p_content=data[0].p_content;
                                    json.u_id=data[0].u_id;
                                    json.p_zan=data[0].p_zan;
                                    json.p_discuss=data[0].p_discuss;
                                    json.p_collect=data[0].p_collect;
                                    json.p_relay=data[0].p_relay;
                                    json.p_time=data[0].p_time;
                                    json.src='';
                                    json.head=data2[0].u_img;
                                    json.name=data2[0].u_name;
                                    for(var j=0;j<data1.length;j++){
                                        if(json.src){
                                            json.src=json.src+'|'+data1[j].pi_src;
                                        }else{
                                            json.src=json.src+data1[j].pi_src;
                                        }
                                    }
                                    res.send({error:1,data:json});
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    discuss:(req,res)=>{
        communityModel.discuss(req.body.p_id,req.body.u_id,req.body.d_content,req.body.d_time,(err,data)=>{
            if(err){
                console.log('发布评论数据库错误',err);
            }else{
                res.send({error:1,id:data.insertId});
            }
        })
    }
};
module.exports=communityController;
