var allButtons = $('.buttons span')
var n = 0
var size = allButtons.length
var timerId = setTimer()

for(let i = 0; i < allButtons.length; i++) {
	$(allButtons[i]).on('click', function(e) {
		var index = $(e.currentTarget).index();
		var p = index * -275
		$('.images').css({
			transform: 'translate(' + p + 'px)'
		})
		n = index
		activeButton(allButtons.eq(n))
	})
}
function activeButton($button) {
	$button.addClass('red').siblings('.red').removeClass('red')
}
function setTimer() {
	return setInterval(() => {
		n += 1
		playSlide(n % size)
	}, 3000)
}
function playSlide(index) {
	allButtons.eq(index).trigger('click')
}
$('.window').on('mouseenter', function() {
	window.clearInterval(timerId)
})
$('.window').on('mouseleave', function() {
	timerId = setTimer()
})