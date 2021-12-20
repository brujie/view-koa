const ws = require("nodejs-websocket");
console.log("开始建立连接...")

const socket = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        let message = str.split(':')[1];
        console.log(message)
        broadcast(message)
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭", code, reason)
    });
}).listen(8888)

function broadcast(data) {
    //所有的窗口都储存在connections里面，所以用循环把消息发给所有的窗口 
    socket.connections.forEach((conn) => {
        conn.sendText(data) //sendText 服务端发送给客户端方法
    })
}
console.log("WebSocket建立完毕")