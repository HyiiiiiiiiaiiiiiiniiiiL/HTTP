const http = require("http")
const fs = require('fs')
http.createServer(function(request, response) {
    console.log("request come", request.url)
    if (request.url === "/") {
        //同域下直接写路径就可以
        //只有302的头才代表跳转，302代表的是临时跳转 请求的时候 /  和 /new都出现了 ，每次访问/的时候，都要进过服务端的一次跳转
        //301是永久跳转 第一次出现了/ 和/new  后来的请求，就直接是/new,就不再进过服务器的跳转 /的请求已经被浏览器放到缓存里面了
        //y也就是，如果我们把301改为200，如果用户在浏览器端不清理缓存，还是会默认从缓存中读取跳转
        response.writeHead(302, {
            "Location": '/new'
        })
    } else if (request.url === "/new") {
        response.writeHead(200, {
            "Content-Type": 'text/html'
        })
        response.end('<div>this is content</div>')
    }
}).listen(8888)
console.log("server listening on 8888") 