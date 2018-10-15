var Readable = require('stream').Readable // 可读流构造函数
var Writable = require('stream').Writable //可写流构造函数

var readStream = new Readable() //new 实例
var writeStream = new Writable()

readStream.push('I ')
readStream.push('Love ')
readStream.push('Imooc\n')
readStream.push(null)

writeStream._write = function(chunk, encode, cb){
    console.log(chunk.toString())
    cb()
}

readStream.pipe(writeStream)