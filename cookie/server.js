var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('清风大侠说：含查询字符串的路径\n' + pathWithQuery)

  if(path === '/'){
    let string = fs.readFileSync('./index.html','utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/sign_up'){
    let string = fs.readFileSync('./sign_up.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path ==='/pay'){
    var amount = fs.readFileSync('./db', 'utf8') //读取数据库
    var newamount = amount - 1
    fs.writeFileSync('./db',newamount)//写入数据库
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/javascript')
    response.write(`
    //说明 jack.com的后端需要对frank.com的页面细节了解很清楚
    //耦合 解耦
    //  amount.innerText = amount.innerText -1
    ${query.callback}.call(undefined,'success') //取callback函数名
     `)
    response.end()
  }else if(path === '/style.css') {
    var string = fs.readFileSync('./style.css', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css；charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/main.js') {
    var string = fs.readFileSync('./main.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type','application/javascript;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/xxx') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Alow-Orign', 'http://frank1.com:8001')
    response.write(`
      {
        "note": {
          "to": "小谷",
          "from": "方世玉",
          "heading": "打招呼",
          "content": "hi"
        }
      }
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`{
      "error": "not found"
    }`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


