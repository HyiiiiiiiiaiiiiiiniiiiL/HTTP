const http = require("http")
const fs = require('fs')
http.createServer(function(request, response) {
    console.log("request come", request.url)
    //cookie有一个访问域的权限设定，当前的域设置了这个cookie,其它域是不能访问的
    //比如在a.com下设置了cookie，那么在b.com下是不能访问到这个cookie的，对于同一个域名下的不同路径
    //可以通过设置cookie来让不同路径下的域名来访问 比如用户的信息 想让二级域名下的
    //所有地址都可以访问到用户的信息，设置domain是其中的一个解决方法
    const host = request.headers.host
    if (request.url === "/") {
        const html = fs.readFileSync("test.html", 'utf-8')
        if (host === 'a.test.com') {
            response.writeHead(200, {
                "Content-Type": "text/html",
                "Set-Cookie": ["id=123;max-age=2", "abc=456;domain=test.com"]
            })
        }
        response.end(html)
    }
}).listen(8888)
console.log("server listening on 8888") 