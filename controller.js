const fs = require('fs');
const router = require('koa-router')();
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
function addMapping(mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addApi(api_dir) {
    var files = fs.readdirSync(`${api_dir}`);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process Api: ${f}...`);
        let mapping = require(`${api_dir}/` + f);
        addMapping(mapping);
    }
}

// 批量注册api导出
module.exports = function (dir) {
    let api_dir = dir || './api'; // 如果不传参数，扫描目录默认为'api'
    addApi(api_dir);
    return router.routes();
};