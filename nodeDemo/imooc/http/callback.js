function learn(something){
	console.log(something)
}
function we(callback, something){
	something = something + ' is cool'
	callback(something)
}
we(learn, 'NodeJs')