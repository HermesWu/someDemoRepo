var http = require('https')
var cheerio = require('cheerio')
var url = 'https://www.imooc.com/learn/348'

function printCourseInfo(courseData){
  courseData.forEach(function(item){
     var chapterTitle = item.chapterTitle
     console.log(chapterTitle + '\n') 
     item.videos.forEach(function (video) {
        console.log(' 【' + video.id + '】' + video.title + '\n')
     }) 
  })     
}

function filterChapters(html){
  console.log('------filterChapters--------')
  var $ = cheerio.load(html)
  var chapters = $('.chapter')
  //[{
  //    chapterTitle: '',
  //    videos: [
  //      title: '',
  //      id: ''
  //    ]
  //}]
  var courseData = []
  chapters.each(function (item){
    var chapter = $(this)
    var chapterTitle = chapter.find('.chapter-description').text()
    var videos = chapter.find('.video').children('li')
    var chapterData = {
        chapterTitle: chapterTitle,
        videos: []
    }
    videos.each(function(item){
      var video = $(this).find('.J-media-item')
      var videoTitles = video.text().trim().split(' ')
        var videoTitle = videoTitles[0] + ' ' + videoTitles[1]
      var id = video.attr('href').split('video/')[1]

      chapterData.videos.push({
          title: videoTitle,
          id: id
      })
    })
      courseData.push(chapterData)
  })
    return courseData
}
http.get(url, function(res){
 var html = ''
 res.on('data', function(data){
 	html += data
 })
 res.on('end', function(){
     console.log('结束')
     console.log('html')
     console.log(html)
     var courseData = filterChapters(html)

     printCourseInfo(courseData)
 })
}).on('error', function() {
	console.log('获取课程数据失败')
})
