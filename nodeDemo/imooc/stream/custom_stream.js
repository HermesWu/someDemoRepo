var stream = require('stream')
var util = require('util')

// 可读流
function ReadStream() {
    stream.Readable.call(this) //改变上下文，使其可以调用stream的 可读类的方法
}

util.inherits(ReadStream, stream.Readable) //让我们生成的可读流，继承流里面可读的原型

ReadStream.prototype._read = function(){ // 为这个可读流，添加原型链的read方法,等于重写
    this.push('I ')
    this.push('Love ')
    this.push('Imooc\n')
    this.push(null)
}

// 可写流
function WriteStream() {
    stream.Writable.call(this)
    this._cache = new Buffer('')
}
util.inherits(WriteStream, stream.Writable)
WriteStream.prototype._write = function(chunk, encode, cb){
    console.log(chunk.toString())
    cb()
}

// 转换流
function TransformStream() {
    stream.Transform.call(this)
}
util.inherits(TransformStream, stream.Transform)

TransformStream.prototype._transform = function(chunk, encode, cb) { // 加后缀，前缀，修改数据
    this.push(chunk)
    cb()
}
TransformStream.prototype._flush = function(cb) { // 收到数据，加额外的内容
    this.push('Oh Yeah!')
    cb()
}

var rs = new ReadStream()
var ws = new WriteStream()
var ts = new TransformStream()
rs.pipe(ts).pipe(ws)