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
                                if(json.p_id==data1[j].p_id){
                                    if(json.src){
                                        json.src=json.src+'|'+data1[j].pi_src;
                                    }else{
                                        json.src=json.src+data1[j].pi_src;
                                    }
                                }
                            }
                            console.log(json);
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
                communityModel.changeReplyNum(req.body.p_id,(err,data1)=>{
                    if(err){
                        console.log('更新评论次数数据库错误')
                    }else{
                        communityModel.getDiscussNum(req.body.p_id,(err,data2)=>{
                            if(err){
                                console.log('获取评论次数数据库错误');
                            }else{
                                res.send({error:1,id:data.insertId,num:data2[0].p_discuss});
                            }
                        })
                    }

                });
            }
        })
    },
    getAllComments:(req,res)=>{
        communityModel.getAllComments(req.body.id,(err,data)=>{
            if(err){
                console.log('获取所有评论数据库错误',err);
            }else{
                let u_id=[];
                let name=[];
                let src=[];
                data.forEach(v=>{
                   u_id.push(v.u_id);
                });
                communityModel.getTheAllUser(u_id,(err,data1)=>{
                    if(err){
                        console.log('获取全部用户头像错误数据库');
                    }else{
                        name.push(data1[0].u_name);
                        src.push(data1[0].u_img);
                        if(name.length==u_id.length){
                            data.forEach((v,i)=>{
                               v.u_name=name[i];
                               v.u_img=src[i];
                            });
                            communityModel.getDiscussNum(req.body.id,(err,data2)=>{
                                if(err){
                                    console.log('获取评论次数数据库错误',err);
                                }else{
                                    res.send({error:1,data:data,num:data2[0].p_discuss});
                                }
                            })
                        }

                    }
                });

            }
        })
    },
    answer:(req,res)=>{
        communityModel.answer(req,(err,data)=>{
            if(err){
                console.log('回复评论人数据库错误',err);
            }else{
                communityModel.changeReplyNum(req.body.p_id,(err,data1)=>{
                    if(err){
                        console.log('更新评论次数数据库错误')
                    }else{
                        communityModel.getDiscussNum(req.body.p_id,(err,data2)=>{
                            if(err){
                                console.log('获取评论次数数据库错误');
                            }else{
                                res.send({error:1,data:data.insertId,num:data2[0].p_discuss});
                            }
                        })
                    }

                });
            }
        })
    },
    answered:(req,res)=>{
        communityModel.answered(req,(err,data)=>{
            if(err){
                console.log('回复回复人数据库错误',err);
            }else{
                communityModel.changeReplyNum(req.body.p_id,(err,data1)=>{
                    if(err){
                        console.log('更新评论次数数据库错误')
                    }else{
                        communityModel.getDiscussNum(req.body.p_id,(err,data2)=>{
                            if(err){
                                console.log('获取评论次数数据库错误');
                            }else{
                                res.send({error:1,data:data.insertId,num:data2[0].p_discuss});
                            }
                        })
                    }

                });

            }
        });
    },
    getAllReplies:(req,res)=>{
        communityModel.getAllReplies(req.body.p_id,(err,data)=>{
            if(err){
                console.log('获取所有回复数据库错误',err);
            }else{
                communityModel.getDiscussNum(req.body.p_id,(err,data2)=>{
                    if(err){
                        console.log('获取评论次数数据库错误',err);
                    }else{
                        res.send({error:1,data:data,num:data2[0].p_discuss})
                    }
                })
            }
        })
    },
    removeDiscuss:(req,res)=>{

        communityModel.findUnDisNum(req.body.p_id,req.body.d_id,(err,data1)=>{
            let n;
            if(err){
                console.log('查找有多少个回复数据库错误')
            }else{
                console.log(data1.length);
                communityModel.removeDiscuss(req.body.p_id,req.body.d_id,(err,data)=>{
                    if(err){
                        console.log('删除评论数据库错误');
                    }else{
                        if(data1.length){
                            n=data1.length+1;
                        }else{
                            n=1;
                        }
                        communityModel.unChangeReplyNum(req.body.p_id,n,(err,data3)=>{
                            if(err){
                                console.log('删除回复更新评论次数数据库错误');
                            }else{
                                communityModel.getDiscussNum(req.body.p_id,(err,data2)=>{
                                    if(err){
                                        console.log('获取评论次数数据库错误',err);
                                    }else{
                                        res.send({error:1,num:data2[0].p_discuss})
                                    }
                                })
                            }
                        });
                    }
                })
            }
        });
    },
    removeReply:(req,res)=>{
        communityModel.findUnNum(req.body.p_id,req.body.r_id,(err,data1)=>{
            if(err){
                console.log('查找有多少个回复数据库错误')
            }else{
                console.log(data1.length);
                communityModel.removeReply(req.body.r_id,req.body.d_id,req.body.p_id,(err,data)=>{
                    if(err){
                        console.log('删除回复数据库错误')
                    }else{
                        communityModel.unChangeReplyNum(req.body.p_id,data1.length+1,(err,data3)=>{
                            if(err){
                                console.log('删除回复更新评论次数数据库错误');
                            }else{
                                communityModel.getDiscussNum(req.body.p_id,(err,data2)=>{
                                    if(err){
                                        console.log('获取评论次数数据库错误',err);
                                    }else{
                                        res.send({error:1,num:data2[0].p_discuss})
                                    }
                                })
                            }
                        });
                    }
                })
            }
        });

    },
    removeReplyed:(req,res)=>{
        communityModel.removeReplyed(req.body.p_id,req.body.rr_id,req.body.r_id,(err,data)=>{
            if(err){
                console.log('删除回复回复上的数据库错误');
            }else{
                communityModel.unChangeReplyNum(req.body.p_id,1,(err,data1)=>{
                    if(err){
                        console.log('删除回复更新评论次数数据库错误');
                    }else{
                        communityModel.getDiscussNum(req.body.p_id,(err,data2)=>{
                            if(err){
                                console.log('获取评论次数数据库错误',err);
                            }else{
                                res.send({error:1,num:data2[0].p_discuss})
                            }
                        })
                    }
                });
            }
        })
    },
    like:(req,res)=>{
        communityModel.findLike(req.body.p_id,req.body.u_id,(err,data3)=>{
            if(err){
                console.log('查找是否点赞数据库错误');
            }else{
                if(data3.length){
                    //取消点赞
                    communityModel.removeZan(req.body.p_id,req.body.u_id,(err,data)=>{
                        if(err){
                            console.log('取消点赞数据库错误');
                        }else{
                            communityModel.unSetZan(req.body.p_id,(err,data2)=>{
                                if(err){
                                    console.log('设置取消点赞数据库错误');
                                }else{
                                    communityModel.findLikeNum(req.body.p_id,(err,data1)=>{
                                        if(err){
                                            console.log('获取点赞次数数据库错误');
                                        }else{
                                            res.send({error:1,num:data1[0].p_zan});
                                        }
                                    })
                                }
                            })
                        }
                    })
                }else{
                    //点赞
                    communityModel.like(req.body.p_id,req.body.u_id,(err,data)=>{
                        if(err){
                            console.log('点赞数据库错误',err);
                        }else{
                            communityModel.setZan(req.body.p_id,(err,data2)=>{
                                if(err){
                                    console.log('设置点赞数据库错误');
                                }else{
                                    communityModel.findLikeNum(req.body.p_id,(err,data1)=>{
                                        if(err){
                                            console.log('获取点赞次数数据库错误');
                                        }else{
                                            res.send({error:2,num:data1[0].p_zan});
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        });

    },
    collect:(req,res)=>{
        communityModel.findCollect(req.body.p_id,req.body.u_id,(err,data3)=>{
            if(err){
                console.log('查找是否点赞数据库错误');
            }else{
                if(data3.length){
                    //取消点赞
                    communityModel.removeCollect(req.body.p_id,req.body.u_id,(err,data)=>{
                        if(err){
                            console.log('取消点赞数据库错误');
                        }else{
                            communityModel.unSetCollect(req.body.p_id,(err,data2)=>{
                                if(err){
                                    console.log('设置取消点赞数据库错误');
                                }else{
                                    communityModel.findCollectNum(req.body.p_id,(err,data1)=>{
                                        if(err){
                                            console.log('获取点赞次数数据库错误');
                                        }else{
                                            res.send({error:1,num:data1[0].p_collect});
                                        }
                                    })
                                }
                            })
                        }
                    })
                }else{
                    //点赞
                    communityModel.collect(req.body.p_id,req.body.u_id,(err,data)=>{
                        if(err){
                            console.log('点赞数据库错误',err);
                        }else{
                            communityModel.setCollect(req.body.p_id,(err,data2)=>{
                                if(err){
                                    console.log('设置点赞数据库错误');
                                }else{
                                    communityModel.findCollectNum(req.body.p_id,(err,data1)=>{
                                        if(err){
                                            console.log('获取点赞次数数据库错误');
                                        }else{
                                            res.send({error:2,num:data1[0].p_collect});
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        });

    },
    findLike:(req,res)=>{
        communityModel.findLike(req.body.p_id,req.body.u_id,(err,data)=>{
            if(err){
                console.log('获取是否点赞数据库错误');
            }else{
                if(data.length){
                    res.send({error:1,zan:true});
                }else{
                    res.send({error:1,zan:false});
                }
            }
        })
    },
    findCollect:(req,res)=>{
        communityModel.findCollect(req.body.p_id,req.body.u_id,(err,data)=>{
            if(err){
                console.log('获取是否点赞数据库错误');
            }else{
                if(data.length){
                    res.send({error:1,collect:true});
                }else{
                    res.send({error:1,collect:false});
                }
            }
        })
    },
    deleteTopic:(req,res)=>{
        communityModel.deleteTopic(req.body.p_id,req.body.u_id,(err,data)=>{
            let i=0;
            if(err){
                console.log('删除当前话题数据库错误');
            }else{
                res.send({error:1});
            }
        })
    }
};
module.exports=communityController;
