function getSiblings(node) {
	var allChildren = node.parentNode.children

	var array = {
		length: 0
	}
	for (let i = 0; i < allChildren.length; i++) {
		if(allChildren[i] !== node) {
			array[array.length] = allChildren[i]
			array.length += 1
		}
	}
	return array
}

function addClass(node, classes) {
	for(let key in classes) {
		var value = classes[key]
		var methodName = value ? true : false
		node.classList[methodName](key)
	}
}
addClass(item3, {a: true, b: false, c: true})

// *******************************
// 增加命名空间
// 命名空间 ，全局覆盖

window.wudom = {}
wudom.addClass = addClass
wudom.getSiblings = getSiblings

// 改变引用

function getSiblings () {
	var allChildren = this.parentNode.children
	var array = {
		length: 0
	}
	for(let i = 0; i < allChildren.length; i++) {
		if(allChildren[i] !== this) {
			array[array.length] = allChildren[i]
			array.length += 1 
		}
	}
	return array
}

function addClass (classes) {
	classes.forEach((value) => this.classList.add(value))
}

// **********************
// 添加到Node的原型上

Node.prototype.addClass = function (classes) {
	classes.forEach((value) => this.classList.add(value))
}
Node.prototype.getSiblings = function () {
	var allChildren = this.parentNode.children
	var array = {
		length: 0
	}
	for(let i = 0; i < allChildren.length; i++) {
		if(allChildren[i] !== this) {
			array[array.length] = allChildren[i]
			array.length += 1 
		}
	}
	return array
}
// item3.getSiblings()
// item3.getSiblings.call(item3)
// *************************
// 重写node为node2，调用node

window.Node2 = function (node) {
	if(typeof node === )
	return {
		// 不能用this，this为node2
		getSiblings: function () {
			var allChildren = node.parentNode.children
			var array = {
				length: 0
			}
			for(let i = 0; i < allChildren.length; i++) {
				if(allChildren[i] !== node) {
					array[array.length] = allChildren[i]
					array.length += 1 
				}
			}
			return array
		},
		addClass: function(classes) {
			// classes 形参名字
			classes.forEach((value) => node.classList.add(value))
		}
	}
}
// wudom.addClass(item3)
var node2 = Node2(item3) // 已经把参数传入
node2.getSiblings()
node2.addClass(['a', 'b', 'c'])

//************接受字符串参数
// 自己封装简易jQuery
//闭包，一直用这个api操作nodes，操作一个

window.jQuery = function (nodeOrSelector) {
	let nodes = {}
	if(typeof nodeOrSelector === 'string') {
		let temp = document.querySelectorAll(nodeOrSelector) //伪数组
		for(let i = 0; i < temp.length; i++) {
			nodes[i] = temp[i]
		}
		nodes.length = temp.length
	} else if (nodeOrSelector instanceof Node) {
		nodes = {
			0: nodeOrSelector,
			length: 1
		}
	}
	nodes.addClass = function (classes) {
		classes.forEach((value) => {
			for(let i = 0; i < nodes.length; i++) {
				nodes[i].classList.add(value)
			}
		})
	}
	nodes.text = function (text) {
		if(text === undefined) {
			var texts = []
			for(let i = 0; i < nodes.length; i++ ) {
				text.push(nodes[i].textContent)
			}
			return texts
		}else {
			for(let i = 0; i < nodes.length; i++) {
				nodes[i].textContent = text
			}
		}
	}
	return nodes
}
var node2 = jQuery('ul > li')
node2.addClass('blue')
node2.text()
//直接操作nodes，返回就可以，可以使用闭包操作node2，或者使用数组访问里面的元素
//node2[0]就是第一个li
node2[0].classList.add('blue')