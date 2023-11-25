//引用
const Router = require('koa-router');

//实例
const errorPage = new Router();

//访问无效页面

errorPage.get('/',async (ctx)=>{
    ctx.body = "访问页面不存在";

})
//公开
module.exports = errorPage

//在app.js中引用