const http = require("http")
const fs = require('fs')
http.createServer(function(request, response) {
    console.log("request come", request.url)
    if (request.url === "/") {
        const html = fs.readFileSync("test.html", 'utf-8')
        response.writeHead(200, {
            "Content-Type": "text/html",
            //设置通过哪些域名进行加载  比如设置只能根据本域名下的js文件加载,如果此时引入外链的js文件，将会报错
            //限制的default-scr图片也不允许外链
            //如果不想限制Img只想限制script，就把default-src改为script-src
            //这个内容可以直接写在meta标签中 但建议还是写在header中，因为这样更合理
            "Content-Security-Policy": 'default-src \'self\'; https://cdn.bootcss.com/ ; form-action  \'self\''
            //如何限制 指定某个网站下文件被加载 把网站的域名写上
            //还可以限制form表单的提交的范围
        })
        response.end(html)
    } else {
        response.writeHead(200, {
            "Content-Type": "text/html",
            "Content-Security-Policy": 'default-src http: https:'
        })
        response.end('console.log("loaded script")')
    }
}).listen(8888)
console.log("server listening on 8888") 