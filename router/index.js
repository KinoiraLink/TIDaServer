//引入路由
const Router = require('koa-router');
const list = require('./list');
const home = require('./home');
const login = require('./login');
const upload = require('./upload');
//声明一个实例
const router = new Router();


//例子1
// router.get('/', async (ctx) => {

    // ctx.body = "首页";
// })

//例子2
// router.get('/list', async (ctx) => {
    // ctx.body = "列表页";
// })

router.use('/list',list.routes(), list.allowedMethods());
router.use('/home',home.routes(), home.allowedMethods());
router.use('/login',login.routes(), login.allowedMethods());
router.use('/upload',upload.routes(), upload.allowedMethods());
router.redirect('/','/home')

module.exports = router