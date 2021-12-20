const log = require('log-output-color');

var index = async (ctx, next) => {
    ctx.render('../views/index.html', {
        title: 'Welcome'
    });
};

var signin = async (ctx, next) => {
    var
    name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    log.data(`name:${name},password:${password}`)
    if (name === 'admin' && password === '123456') {
        // 登录成功:
        ctx.render('../views/signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr Node'
        });
    } else {
        // 登录失败:
        ctx.render('../views/signin-failed.html', {
            title: 'Sign In Failed'
        });
    }
};

module.exports = {
    'GET /': index,
    'POST /signin': signin
};