let n
init()
setInterval(() => {
	makeLeave(getImg(getIndex(n)))
		.one('transitionend', (e) => {
			makeEnter($(e.currentTarget))
		})
	makeCurrent(getImg(getIndex(n+1)))
	n += 1;
}, 3000);


//************* 封装函数 ********************

function makeCurrent($node) {
	$node.removeClass('leave enter').addClass('current')
}
function makeLeave($node) {
	$node.removeClass('current enter').addClass('leave')
	return $node
}
function makeEnter($node) {
	$node.removeClass('current leave').addClass('enter')
}

function getImg (index) {
	return $(`.images>img:nth-child(${index})`)
}

function init() {
	n = 1
	$('.images>img:nth-child(1)').addClass('current')
	$('.images>img:nth-child(2)').addClass('enter')
	$('.images>img:nth-child(3)').addClass('enter')
}
function getIndex(n) {
	if(n > 3) {
		n %= 3
		if(n ===0) {
			n = 3
		}
	}
	return n
}
// *********** 封装结束 ********************


// // ******************* 原代码 **************

// $('.images>img:nth-child(1)').addClass('current')
// $('.images>img:nth-child(2)').addClass('enter')
// $('.images>img:nth-child(3)').addClass('enter')
// let n =1
// setInterval(() => {
// 	$(`.images>img:nth-child(${x(n)})`).removeClass('current').addClass('leave')
// 		.one('transitionend', (e) => {
// 			$(e.currentTarget).removeClass('leave').addClass('enter')
// 		})
// 	$(`.images>img:nth-child(${x(n+1)})`).removeClass('enter').addClass('current')
// 	n += 1;
// }, 3000);

// function x(n) {
// 	if(n > 3) {
// 		n %= 3
// 		if(n ===0) {
// 			n = 3
// 		}
// 	}
// 	return n
// }

// **************** 原代码结束 ********************
