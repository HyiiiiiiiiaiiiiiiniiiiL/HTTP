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
        //在客户端设置的缓存，服务器根本不知道，如果服务器端更新了数据
        //客户端可能无法及时更新，那么如何让客户端及时更新？？？？
        //当url没有变，并且缓存的时间还在，那么就会去缓存中读取数据，
        //这时，如果服务器的数据发生改变，客户端这边没有办法及时更新
        //我们希望浏览器缓存我们的文件，同时我们不希望服务器更新了数据，浏览器这边还是读取缓存的数据
        //解决方案--打包完成的js文件有一串hash码，如果js文件或静态资源文件的hash文件没有改变，则
        //还是读取缓存的数据，如果文件发生了改变，那么hash码就会发生改变
        response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Cache-Control": "max-age=200,public"
        })
        response.end('console.log("script loaded  twice")')
    }
}).listen(8888)
console.log("server listening on 8888")