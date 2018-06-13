myButton.addEventListener('click', (e)=>{
  $.ajax({
    method: 'post',
    url: '/fff',
    body: 'hi',
    headers: {
      'content-type':'application/x-www-form-urlencoded',
      'qingfengdaxia':'18'
    },
  }).then(
    (responseText)=>{console.log(responseText)},
    (request)=>{console.log(request)}
  )
})
// *************原始调用****************
// myButton.addEventListener('click', (e)=>{
// 	$.ajax({
// 		method: 'post',
// 		url: '/xxx',
// 		body: 'hi',
//     headers: {
//       'content-type':'application/x-www-form-urlencoded',
//       'qingfengdaxia':'18'
//     },
// 		success: (e) =>{
// 			f1.call(undefined,e)
// 			f2.call(undefined,e)
// 		},
// 		fail: (e) => {
// 			console.log(e)
// 			console.log(e.status)
// 			console.log(e.responseText)
// 		}
// 	})
// })

function f1(responseText) {
	console.log('f1', responseText)
}
function f2(responseText) {
	console.log('f2', responseText)
}

window.jQuery = function(nodeOrSelector) {
	let nodes ={}
	nodes.addClass =function(){}
	nodes.html = function(){}
	return nodes
}

window.$=window.jQuery

// *************promise************

window.jQuery.ajax=function({method, url, body, headers}){
  return new Promise(function(resolve, reject){
   let request = new XMLHttpRequest()
   request.open(method, url)
   for(let key in headers) {
     let value = headers[key]
     request.setRequestHeader(key, value)
   }
   request.onreadystatechange = ()=>{
     if(request.readyState === 4) {
        if(request.status >=200 && request.status <300) {
          resolve.call(undefined, request.responseText)
        }
      }else if(request.status>=400){
       reject.call(undefined, request)
      }
    } 
   request.send() 
    })
}

/* 坑
*   1. response.end() 不要忘记
    2. ajax参数{}
    3. 后端服务不要忘记全等 ===
*
*/


//************原生js封装ajax*****************
// window.jQuery.ajax=function({method, url, body, success, fail, headers}){
// 	let request = new XMLHttpRequest()
// 	request.open(method, url)
// 	for(let key in headers) {
// 		let value = headers[key]
// 		request.setRequestHeader(key, value)
// 	}
// 	request.onreadystatechange = ()=>{
// 		if(request.readyState === 4) {
// 			if(request.status >=200 && request.status <300) {
// 				success.call(undefined, request.responseText)
// 			}
// 		}else if(request.status>=400){
// 			fail.call(undefined, request)
// 		}
// 	}
// 	request.send()
// }