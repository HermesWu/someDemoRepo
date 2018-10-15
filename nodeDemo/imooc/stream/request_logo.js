var http = require('http')
var fs = require('fs')
var request = require('request')
http
    .createServer(function(req, res){
        // fs.readFileSync('../buffer/logo.png', function(err, data){
        //     if(err){
        //         res.end('file not exist!')
        //     }
        //     else{
        //         res.writeHeader(200, {'Context-Type': 'text/html'})
        //         res.end(data)
        //     }
        // })

        // fs.createReadStream('../buffer/logo.png').pipe(res)
        request('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539256803200&di=b2f898645b802d0c67eed6cce9a6bb00&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1306%2F07%2Fc0%2F21762923_1370577491969.jpg')
            .pipe(res)
    })
    .listen(8090)