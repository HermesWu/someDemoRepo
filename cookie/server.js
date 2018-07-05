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
    let cookies = request.headers.cookie.split(';')
    let hash = {}
    for(let i = 0; i < cookies.length; i++) {
      let parts = cookies[i].split('=')
      let key = parts[0]
      let value = parts[1]
      hash[key] = value
    }
    let email = hash.sign_in_email
    let users = fs.readFileSync('./db/users', 'utf8')
    users = JSON.parse(users)
    let foundUser
    for(let i = 0; i < users.length; i++){
      if(users[i].email === email){
        foundUser = users[i]
        break
      }
    }
    if(foundUser) {
      console.log(foundUser.email)
      string = string.replace('__password__', foundUser.email)
    }else {
      string = string.replace('__password__', '请登录')
    }
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/sign_up' && method === 'GET'){
    let string = fs.readFileSync('./sign_up.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/sign_up' && method === 'POST'){
    readBody(request)
    .then((body)=>{
      console.log(body)
        let strings = body.split('&') // ['email=1', 'password=2', 'password_confirmation=3']
        let hash= {}
        strings.forEach((string)=>{
          let parts = string.split('=') //['email', '1']
          let key = parts[0]
          let value = parts[1]
          hash[key] = decodeURIComponent(value) //hash['email'] = '1'
        })
        console.log(hash)
        // let email = hash['email']
        // let password = hash['password']
        // let password_confirmation = hash{'password_confirmation'}
        let {email, password, password_confirmation} = hash
        if(email.indexOf('@') === -1){
          response.statusCode = 400
          response.setHeader('Content-Type', 'Application/json;charset=utf-8')
          response.write(`{
            "errors": {
              "email": "invalid"
            }
          }`)
        }else if(password !== password_confirmation) {
          response.statusCode = 400
          response.write('password not match')
        }else {
          var users = fs.readFileSync('./db/users', 'utf8')
          try{
            users = JSON.parse(users) // []
          }catch(exception){
            users = []
          }
          let inUse = false
          for(let i  = 0; i < users.length; i++) {
            let user = users[i]
            if(user.email === email) {
              inUse = true
              break
            }
          }
          if(inUse) {
            console.log(1)
            response.statusCode = 400
            response.write('email in use')
          }else {
            console.log(2)
            users.push({email:email, password: password})
            usersString = JSON.stringify(users)
            fs.writeFileSync('./db/users', usersString)
            response.statusCode = 200  
          }
        }
        response.end()
      })

      // at this point, `body` has the entire request body stored in it as a string
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
  }else if(path === '/sign_in' && method === 'GET'){
    let string = fs.readFileSync('./sign_in.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/sign_in' && method === 'POST'){
    readBody(request)
    .then((body)=>{
      let strings = body.split('&') // ['email=1', 'password=2', 'password_confirmation=3']
      let hash= {}
      strings.forEach((string)=>{
        let parts = string.split('=') //['email', '1']
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value) //hash['email'] = '1'
      })
      let {email, password} = hash
      var users = fs.readFileSync('./db/users', 'utf8')
      try{
        users = JSON.parse(users) // []
      }catch(exception){
        users = []
      }
      let found
      for(let i = 0; i < users.length; i++){
        if(users[i].email === email && users[i].password === password){
          found = true
          break
        }
      }
      if(found) {
        response.setHeader('Set-Cookie', `sign_in_email=${email}`)
        response.statusCode = 200
      }
      else{
        response.statusCode = 401
      }
      response.end()
    })
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

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      resolve(body)
    })
  })
}

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


