const http = require("http")
const fs = require('fs')
http.createServer(function(request, response) {
    console.log("request come", request.url)
    if (request.url === "/") {
        const html = fs.readFileSync("test.html", 'utf-8')
        //设置Content-type为HTML
        response.writeHead(200, {
            "Content-Type": "text/html"
        })
        response.end(html)
    }
    if (request.url === "/script.js") {
        response.writeHead(200, {
            //no-cache  就是虽然设置了缓存时间，但是下次请求数据还要到服务器端验证 ，如果数据改变了就请求新的数据
            //如果数据没有改变，就使用缓存
            "Content-Type": "text/javascript",
            "Cache-Control": "max-age=2000000,no-cache",
            "Last-Modified": '123',
            "Etag": '777'
        })
        response.end('console.log("script loaded  twice")')
    }
}).listen(8888)
console.log("server listening on 8888")