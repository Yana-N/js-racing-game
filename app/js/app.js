document.addEventListener('DOMContentLoaded', function () {

	const score = document.querySelector('.score'),
		start = document.querySelector('.start'),
		gameArea = document.querySelector('.game-area')

	const car = new Image()
	car.src = '../images/dest/car.png'

	car.classList.add('car')

	const keys = {
		ArrowUp: false,
		ArrowDown: false,
		ArrowLeft: false,
		ArrowRight: false,
	}

	const setting = {
		start: false,
		score: 0,
		speed: 3,
	}

	function startGame() {
		start.classList.add('hide')
		setting.start = true
		gameArea.appendChild(car)

		requestAnimationFrame(playGame)
	}

	function playGame() {
		console.log('play game')
		if (setting.start) {
			requestAnimationFrame(playGame)
		}
	}

	function startRun(e) {
		e.preventDefault()
		keys[e.key] = true
	}

	function stopRun(e) {
		e.preventDefault()
		keys[e.key] = false
	}

	start.addEventListener('click', startGame)

	document.addEventListener('keydown', startRun)
	document.addEventListener('keyup', stopRun)

})