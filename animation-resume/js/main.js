var result = `/* 
面试官你好，我是吴春祥

只用文字介绍太单调了
我就用代码来介绍吧
首先，准备一些样式
*/
*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}
#paper > .content {
 display: block;
}
/*于是我就可以在白纸上写字了，请看右边👉*/
`
var result2 = `
# 自我介绍

我叫 吴春祥
1992 年 5 月出生
黑龙江大学 本科 电气工程及其自动化
自学前端 2年相关工作经验
希望应聘前端开发岗位

# 工作经历
1.北京中电普华信息技术有限公司
	工作内容： 国家电网网省信息化建设
	主要技术：HTML、CSS、JS、Eclipse、SVN
2.小格科技
	工作内容： 民俗管理系统H5开发
	主要技术： Vue、Axios、Vue-Router、Vue-Scroller、Vux、Rem、Flex、Less、 HTML5、CSS3、ES6
	主要功能：
		① 登录注册。用户注册、登录阶段。
		② 房源列表。列表展示所有房源的概要，主要为名称，地址。
		③ 房源详情。房源详情展示。
		④ 系统设置。主要包含账号的修改密码，多民宿平台账号管理(添加，
		删除，修改密码)，以及多平台房源的同步。
3.首汽租赁有限责任公司
	工作内容： 参与首汽租车移动端、PC 官网、APP 三端的前端开发工作。
	主要技术： HTML5、CSS3、JS、jQuery、SVN、Eclipse、Vue

# 技能介绍
熟悉 JavaScript CSS HTML jQuery Vue SVN Git

- HTML5&CSS3 ★★★★★
熟悉盒模型、CSS3 动画、常见布局、响应式、移动端适配
掌握 Flex、Scss、CSS3 动画，可快速根据设计稿开发页面，熟悉开发调
试，搭建符合 HTML5 语义化的页面结构。
- 原生 JS/jQuery ★★★★★
熟悉原生JS，理解事件模型、原型、闭包、异步、面向对象、封装等，
熟悉 AJAX、JSONP、跨域、 UI 组件、插件使用，了解 ES6 语法、继承、 类、Promise、async/await等。
- 框架&工具 ★★★★
理解 MV*思想，熟悉 Git 的使用进行版本管理，了解Linux命令行，
了解 Webpack，可对工程文件进行打包编译，了解Vue前端框架，可独立开发页面组件，了解HTTP及Node，可独立搭建 Node 后端服务器。

# 个人项目介绍
1. jQuery实现无缝轮播
2. TodoList(Vue)
3. 手机Canvas画板

# 联系方式
- QQ 1136025519
- Email 1136025519@qq.com
- 手机 18646093455
 
`
var css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`

writeCss('', result, ()=>{
	createPaper(()=>{
		writeMarkdown(result2, () =>{
			writeCss(result, css2, 
			)
		})
	})
})


function writeCss(prefix, code, fn) {
	let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix +  code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 10)
}
function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn()
    }
  }, 35)
}
function createPaper(fn) {
   var paper = document.createElement('div') 
   paper.id = 'paper'
   var content = document.createElement('pre')
   content.className = 'content'
   paper.appendChild(content)
   document.body.appendChild(paper)
	fn()
}








