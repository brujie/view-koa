const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const log = require('log-output-color');
const controller = require('./controller.js');
const router = require('koa-router')();
const app = new Koa();
const port = 5000;
const isProduction = process.env.NODE_ENV === 'production';
let staticFiles = require('./static/static-files.js');
let templating = require('./static/templating.js');


// middleWare
app.use(async (ctx, next) => {
    log.text(`${ctx.request.method}:${ctx.request.url}`);
    const startTime = new Date().getTime();
    await next();
    const ms = new Date().getTime() - startTime;
    log.warn(`time:${ms}`);
})

if (!isProduction) {
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// add router middleware:
app.use(bodyParser());
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller());
app.use(router.routes());

app.listen(port)
log.debug(`请访问http://localhost:${port}`)