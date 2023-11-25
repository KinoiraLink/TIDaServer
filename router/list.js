//存放关于列表的所有接口
const Router = require('koa-router');

const list = new Router();

//对应接口
list.get('/', async (ctx) => {
    ctx.body = "列表页";
})

list.get('/yinger', async (ctx) => {
    ctx.body = "列表页-婴儿";
})

list.get('/wanju', async (ctx) => {
    ctx.body = "列表页-玩具"

})
module.exports = list;