//存放关于列表的所有接口
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const upload = new Router();
const db = require('../utils/db')
const jwt = require('jsonwebtoken')
const multer = require('@koa/multer');
const path = require("path")
const fs = require("fs");
//对应接口
upload.use(bodyParser());

let myfilename = "";

fs.readdir(__dirname + "/images/", function (err, files) {
    if (err) {
        fs.mkdir(__dirname + "/images/", function (err) {
            if (err) {
                console.log(err)
            }
            console.log("目录创建成功。");
        })
    }
})
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname ,'../assets/images/'))
    },
    //修改文件名称
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        // logo.png -> logo.xxx.png
        myfilename = `${file.fieldname}-${Date.now().toString(16)}.${type}`
        cb(null, myfilename)
    }
})

const limits = {
    fields: 10,//非文件字段的数量
    fileSize: 200 * 1024,//文件大小 单位 b
    files: 1//文件数量
}
const imageupload = multer({storage,limits})

upload.post('/image',imageupload.single('img'),async (ctx)=>{
    // 当前接口允许跨域
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    console.log(ctx.req.file);
    ctx.body =  {
        // 要求前端自行补全域名
        filePath:`${myfilename}`}
})



upload.post('/commonget', async (ctx) => {
    let token = ctx.request.body.UserCookie;
    console.log(token);
    let sql = `select Id,UserCookie,TaskTitle,TaskDescribe,TaskDate,TaskTime,Done,Timestamp,IsDeleted from common_task where UserCookie ='${token}' `;
    let myarr = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);

        })
    })
    ctx.body = myarr;
})



upload.post('/commonsave', async (ctx) => {
    console.log(ctx.request.body[0]);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `INSERT INTO common_task (Id,UserCookie,TaskTitle,TaskDescribe,TaskDate,TaskTime,Done,Timestamp,IsDeleted) VALUES (${val.Id},'${val.UserCookie}', '${val.TaskTitle}', '${val.TaskDescribe}', '${val.TaskDate}', '${val.TaskTime}',${val.Done},${val.Timestamp},${val.IsDeleted})`;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/commonupdate', async (ctx) => {
    console.log(ctx.request.body);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `UPDATE common_task SET TaskTitle = '${val.TaskTitle}',TaskDescribe = '${val.TaskDescribe}',TaskDate = '${val.TaskDate}',TaskTime = '${val.TaskTime}',Done = ${val.Done},Timestamp = ${val.Timestamp},IsDeleted = ${val.IsDeleted} WHERE Id = ${val.Id} And UserCookie = '${val.UserCookie}' `;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/commondelete', async (ctx) => {
    console.log(ctx.request.body);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `DELETE FROM common_task WHERE Id = ${val.Id} And UserCookie = '${val.UserCookie}' `;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/markdownget', async (ctx) => {
    let token = ctx.request.body.UserCookie;
    console.log(token);
    let sql = `select Id,UserCookie,TaskTitle,TaskContent,Timestamp from markdown_task where UserCookie ='${token}' `;
    let myarr = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);

        })
    })
    ctx.body = myarr;
})

upload.post('/markdownsave', async (ctx) => {
    console.log(ctx.request.body[0]);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `INSERT INTO markdown_task (Id,UserCookie,TaskTitle,TaskContent,Timestamp) VALUES (${val.Id},'${val.UserCookie}', '${val.TaskTitle}', '${val.TaskContent}',${val.Timestamp})`;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/markdownupdate', async (ctx) => {
    console.log(ctx.request.body);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `UPDATE markdown_task SET TaskTitle = '${val.TaskTitle}',TaskContent = '${val.TaskContent}',Timestamp = ${val.Timestamp} WHERE Id = ${val.Id} And UserCookie = '${val.UserCookie}' `;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/markdowndelete', async (ctx) => {
    console.log(ctx.request.body);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `DELETE FROM markdown_task WHERE Id = ${val.Id} And UserCookie = '${val.UserCookie}' `;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/weekget', async (ctx) => {
    let token = ctx.request.body.UserCookie;
    console.log(token);
    let sql = `select Id,UserCookie,TaskTitle,TaskDescribe,Site,Timestamp from week_task where UserCookie ='${token}' `;
    let myarr = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);

        })
    })
    ctx.body = myarr;
})

upload.post('/weeksave', async (ctx) => {
    console.log(ctx.request.body[0]);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `INSERT INTO week_task (Id,UserCookie,TaskTitle,TaskDescribe,TaskTime,Site,Timestamp) VALUES (${val.Id},'${val.UserCookie}', '${val.TaskTitle}', '${val.TaskDescribe}', '${val.TaskTime}', '${val.Site}',${val.Timestamp})`;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/weekupdate', async (ctx) => {
    console.log(ctx.request.body);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `UPDATE week_task SET TaskTitle = '${val.TaskTitle}',TaskDescribe = '${val.TaskDescribe}',TaskTime = '${val.TaskTime}',Site = '${val.Site}',Timestamp = ${val.Timestamp} WHERE Id = ${val.Id} And UserCookie = '${val.UserCookie}' `;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/tomatoget', async (ctx) => {
    let token = ctx.request.body.UserCookie;
    console.log(token);
    let sql = `select Id,UserCookie,TaskTitle,TaskDescribe,TaskTime,Timestamp from tomato_task where UserCookie ='${token}' `;
    let myarr = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);

        })
    })
    ctx.body = myarr;
})

upload.post('/tomatosave', async (ctx) => {
    console.log(ctx.request.body[0]);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `INSERT INTO tomato_task (Id,UserCookie,TaskTitle,TaskDescribe,TaskTime,Timestamp) VALUES (${val.Id},'${val.UserCookie}', '${val.TaskTitle}', '${val.TaskDescribe}', '${val.TaskTime}',${val.Timestamp})`;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/tomatoupdate', async (ctx) => {
    console.log(ctx.request.body);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `UPDATE tomato_task SET TaskTitle = '${val.TaskTitle}',TaskDescribe = '${val.TaskDescribe}',TaskTime = '${val.TaskTime}',Timestamp = ${val.Timestamp} WHERE Id = ${val.Id} And UserCookie = '${val.UserCookie}' `;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/targetget', async (ctx) => {
    let token = ctx.request.body.UserCookie;
    console.log(token);
    let sql = `select Id,UserCookie,MainTitle,MinorTitle,IsDone,Timestamp,IsDelete from target_task where UserCookie ='${token}' `;
    let myarr = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);

        })
    })
    ctx.body = myarr;
})

upload.post('/targetsave', async (ctx) => {
    console.log(ctx.request.body[0]);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `INSERT INTO target_task (Id,UserCookie,MainTitle,MinorTitle,IsDone,Timestamp,IsDelete) VALUES (${val.Id},'${val.UserCookie}', '${val.MainTitle}', '${val.MinorTitle}',${val.IsDone},${val.Timestamp},${val.IsDelete})`;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/targetupdate', async (ctx) => {
    console.log(ctx.request.body);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `UPDATE target_task SET MainTitle = '${val.MainTitle}',MinorTitle = '${val.MinorTitle}',IsDone = ${val.IsDone},Timestamp = ${val.Timestamp},IsDelete = ${val.IsDelete} WHERE Id = ${val.Id} And UserCookie = '${val.UserCookie}' `;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/targetdelete', async (ctx) => {
    console.log(ctx.request.body);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `DELETE FROM target_task WHERE Id = ${val.Id} And UserCookie = '${val.UserCookie}' `;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})

upload.post('/simpleget', async (ctx) => {
    let token = ctx.request.body.UserCookie;
    console.log(token);
    let sql = `select Id,UserCookie,Title,Content,ImagePath,Timestamp from simple_wrpo where UserCookie ='${token}' `;
    let myarr = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);

        })
    })
    ctx.body = myarr;
})


upload.post('/simplesave', async (ctx) => {
    console.log(ctx.request.body[0]);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `INSERT INTO simple_wrpo (Id,UserCookie,ImagePath,Title,Content,Timestamp) VALUES (${val.Id},'${val.UserCookie}', '${val.ImagePath}', '${val.Title}', '${val.Content}',${val.Timestamp})`;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})


upload.post('/simpleupdate', async (ctx) => {
    console.log(ctx.request.body);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `UPDATE simple_wrpo SET ImagePath = '${val.ImagePath}',Title = '${val.Title}',Content = '${val.Content}',Timestamp = ${val.Timestamp} WHERE Id = ${val.Id} And UserCookie = '${val.UserCookie}' `;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})


module.exports = upload;