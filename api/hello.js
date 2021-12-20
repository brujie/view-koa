var hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.render('../views/hello.html', {
        title: 'hello',
        name:'hello ' + name.substring(5)
    });
};

module.exports = {
    'GET /hello/:name': hello
};