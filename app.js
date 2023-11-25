//app.js
//整个koa项目的入口文件
//Koa 大写开头 构造函数
const Koa = require('koa2');

const static = require('koa-static');

const router = require('./router/index')

const errorPage = require('./router/errorPage')


//声明一个实例
const app = new Koa();


const cors = require('koa2-cors');



//端口号
const port = 3000;


//运行跨域访问
app.use(cors());
app.use(static('./assets'));
// 调用路由中间件
// router.routes()：启动路由
//router.allowedMethods()允许各种请求get、post等
app.use(router.routes(), router.allowedMethods());


//监听口
app.listen(port, () => {
    console.log('Server is running at http://localhost:${port}')
})


/* //调用中间键
app.use(async (ctx) => {
//返回数据给页面 ctx.response.body=""
ctx.response.body = "你好,Koa";
}) */

//router.use('/errorPage',errorPage.route,errorPage.allowedMethods)

app.use(async (ctx, next) => {
    await next();
    if (parseInt(ctx.status) == 404) {
        ctx.response.redirect("/errorPage")
    }
})