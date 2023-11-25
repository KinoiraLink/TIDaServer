//存放关于列表的所有接口
const Router = require('koa-router');
const Connection = require('mysql/lib/Connection');
const db = require('../utils/db')
const home = new Router();

//对应接口
home.get('/', async (ctx) => {
    let mydata = await new Promise((resolve, reject) => {
        return db.query('SELECT * FROM cover', (err, data) => {
            if (err) throw err;
            resolve(data);
        })
    })
    //db.end;
    ctx.body = mydata;
})

home.get('/banner', async (ctx) => {
    ctx.body = "首页-轮播图";
})

home.get('/footer', async (ctx) => {
    ctx.body = "列表页-底部"

})
module.exports = home;