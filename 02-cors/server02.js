const http = require("http")
http.createServer(function(request, response) {
    console.log("request come", request.url)
    //设置跨域请求
    //不管我们有没有设置跨域的这个头，浏览器都会发送这个请求,并且接收返回内容，在
    //浏览器返回内容的时，发现没有设置跨域的话，浏览器会拦截这个内容，并且在控制台报错
    // "Access-Control-Allow-Origin": '*'表示任何域名的页面都可以访问这个服务，这样不安全
    //这里可以设置特定的域名才可以跨域
    response.writeHead(200, {
        "Access-Control-Allow-Origin": '*'
    })
    //如果想要实现浏览器动态的判断哪个域 可以通过request.url来设置
    response.end("123")
}).listen(8887)
console.log("server listening on 8887")