const http = require("http")
const fs = require('fs')
http.createServer(function(request, response) {
    console.log("request come", request.url)
    const html = fs.readFileSync("test.html", 'utf-8')
    response.writeHead(200, {
        "Content-Type": "text/html",
        "Content-Security-Policy": 'default-src http: https:'
    })
    response.end(html)
}).listen(8888)
console.log("server listening on 8888") 