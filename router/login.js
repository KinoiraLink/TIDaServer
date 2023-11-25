//存放关于列表的所有接口
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const login = new Router();
const db = require('../utils/db')
const jwt = require('jsonwebtoken')
//对应接口
login.use(bodyParser());

login.post('/loginin', async (ctx) => {

    let myaccount = ctx.request.body.account;
    let mypwd = ctx.request.body.pwd;
    //判断数据库里是否存在该账户
    //1.如果有验证密码如果没有
    //2.如果没有注册
    let sql = `select * from users where account ='${myaccount}' `;//字符串记得加引号
    let myarr = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);

        })
    })
    //验证数组长度是否大于0
    if (myarr.length > 0) {
        //证明有这个账号
        //验证密码
        console.log(myarr);
        if (myarr[0].pwd == mypwd) {
            ctx.body = {
                msg: "登录成功",
                token: myarr[0].token,
                account: myarr[0].account
            }
        }
        else {
            ctx.body = {
                msg: '密码错误'
            }
        }
    } else {
        ctx.body = {
            msg: '没有此用户'
        }
    }

})
login.post('/register', async (ctx) => {

    let myaccount = ctx.request.body.account;
    let mypwd = ctx.request.body.pwd;
    //判断数据库里是否存在该账户
    //1.如果有验证密码如果没有
    //2.如果没有注册
    let sql = `select * from users where account ='${myaccount}' `;//字符串记得加引号
    let myarr = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);

        })
    })
    //验证数组长度是否大于0
    if (myarr.length > 0) {
        //证明有这个账号
        //验证密码
        console.log(myarr);
        if (myarr[0].pwd == mypwd) {
            ctx.body = {
                msg: "已有此用户",
            }
        }
    } else {
        //没有账号，要注册
        //创建一个token
        let mytoken = jwt.sign({ myaccount: myaccount, mypwd: mypwd }, 'secret', { expiresIn: 3600 });
        let sql = `insert into users (account,pwd,token) values ('${myaccount}','${mypwd}','${mytoken}')`;
        
        let result=await new Promise((resolve,reject)=>{
            return db.query(sql, (err, data) => {
                if (err) throw err;
                //console.log(data);
                let obj = {
                    msg: "注册成功",
                    token: mytoken,
                    account: myaccount
                }
                resolve(obj)
    
            })
        })
        ctx.body = result;
    }
})


login.post('/getinfo', async (ctx) => {
    let token = ctx.request.body.UserCookie;
    console.log(ctx.request.body.UserCookie);
    let sql = `select id,token,NickName,Email,ImagePath from user_info where token ='${token}' `;
    let myarr = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);

        })
    })
    ctx.body = myarr;
})

login.post('/saveinfo', async (ctx) => {
    console.log(ctx.request.body[0]);
    arr = ctx.request.body;
    arr.map(val=>{
        let sql = `INSERT INTO user_info (token,NickName,Email,ImagePath) VALUES ('${val.UserCookie}', '${val.NickName}', '${val.Email}', '${val.ImagePath}')`;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
        })
    })
    ctx.body = ctx.request.body;
})
module.exports = login;