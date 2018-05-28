window.jQuery = function(nodeOrSelector) {
	var nodes = {}
	if(typeof nodeOrSelector === 'string') {
		// 如果输入的是字符串，则是选择器，查找并遍历添加到nodes对象
		var temp = document.querySelectorAll(nodeOrSelector)
		for(let i = 0; i < temp.length; i++) {
			nodes[i] = temp[i]
		}
		nodes.length = temp.length
	}else if(nodeOrSelector instanceof node){
		 nodes = {
		 	0: nodeOrSelector,
		 	length: 1
		 }
	}
	// 添加多个类名
	nodes.addClass = function(classes) {
		classes.forEach((value) => {
			for(let i = 0; i < nodes.length; i++) {
				nodes[i].classList.add(value)
			}
		})
	}
	// 设置内容。参数为空默认获取值，当参数不为空，默认设定值
	nodes.text = function(text) {
		if(text === undefined) {
			var texts = []
			for(let i = 0; i < nodes.length; i++) {
				texts.push(nodes[i].textContent)
			}
			return texts;
		}else {
			for(let i = 0; i < nodes.length; i++) {
				nodes[i].textContent = text
			}
		}
	}
	return nodes;
}
