const http = require("http")
const fs = require('fs')
http.createServer(function(request, response) {
    console.log("request come", request.url)
    //读取test.html的内容，第二个参数是设置读取后显示的格式，没有设置默认是
    //二进制，没有办法通过end的方式发送
    const html = fs.readFileSync("test.html", 'utf-8')
    //设置Content-type为HTML
    response.writeHead(200, {
        "Content-Type": "text/html"
    })
    response.end(html)
}).listen(8888)
console.log("server listening on 8888")