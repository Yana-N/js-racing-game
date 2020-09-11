document.addEventListener('DOMContentLoaded', function () {

	const MAX_ENEMY = 5
	const HEIGHT_ELEM = 100

	const score = document.querySelector('.score'),
		start = document.querySelector('.start'),
		gameArea = document.querySelector('.game-area'),
		audioBtn = document.querySelector('.audio-btn')

	gameArea.style.height = Math.floor(document.documentElement.clientHeight / HEIGHT_ELEM) * HEIGHT_ELEM + 'px'

	const car = document.createElement('div')
	car.classList.add('car')

	const audio = document.createElement('audio')
	audio.src = '../audio/audio.mp3'
	audio.loop = true

	const crash = document.createElement('audio')
	crash.src = '../audio/crash.mp3'

	const keys = {
		ArrowUp: false,
		ArrowDown: false,
		ArrowLeft: false,
		ArrowRight: false,
	}

	const setting = {
		start: false,
		score: 0,
		speed: 5,
		traffic: 3,
	}

	function getQuantityEl(heightElem) {
		return gameArea.offsetHeight / heightElem + 1
	}

	function toggleAudio() {
		if (audio.paused) {
			audio.play()
		} else {
			audio.pause()
		}
	}

	function toggleAudioBtn() {
		audioBtn.classList.toggle('active')
	}

	function startGame() {
		start.classList.add('hide')
		audioBtn.classList.add('active')
		gameArea.innerHTML = ''

		for (let i = 0; i < getQuantityEl(HEIGHT_ELEM); i++) {
			const line = document.createElement('div')
			line.classList.add('line')
			line.style.top = (i * HEIGHT_ELEM) + 'px'
			line.y = i * HEIGHT_ELEM
			gameArea.appendChild(line)
		}

		for (let i = 0; i < getQuantityEl(HEIGHT_ELEM * setting.traffic); i++) {
			const enemy = document.createElement('div')
			const randomEnemy = Math.floor(Math.random() * MAX_ENEMY + 1)
			enemy.classList.add('enemy')
			enemy.y = -HEIGHT_ELEM * setting.traffic * (i + 1)
			enemy.style.top = enemy.y + 'px'
			enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + 'px'
			enemy.style.background = `transparent url("../images/dest/enemy/${randomEnemy}.png") no-repeat center / contain`

			gameArea.appendChild(enemy)
		}

		setting.score = 0
		setting.start = true
		gameArea.appendChild(car)

		document.body.appendChild(audio)
		audio.play()

		car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2 + 'px'
		car.style.top = 'auto'
		car.style.bottom = '10px'

		setting.x = car.offsetLeft
		setting.y = car.offsetTop

		requestAnimationFrame(playGame)
	}

	function playGame() {
		if (setting.start) {
			setting.score += setting.speed
			score.textContent = `Score: ${setting.score}`
			moveRoad()
			moveEnemy()
			if (keys.ArrowLeft && setting.x > 0) {
				setting.x -= setting.speed
			}
			if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
				setting.x += setting.speed
			}
			if (keys.ArrowUp && setting.y > 0) {
				setting.y -= setting.speed
			}
			if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
				setting.y += setting.speed
			}

			car.style.left = setting.x + 'px'
			car.style.top = setting.y + 'px'

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

	function moveRoad() {
		let lines = document.querySelectorAll('.line')
		lines.forEach(function (item) {
			item.y += setting.speed
			item.style.top = item.y + 'px'

			if (item.y >= gameArea.offsetHeight) {
				item.y = -HEIGHT_ELEM
			}
		})
	}

	function moveEnemy() {
		let enemies = document.querySelectorAll('.enemy')
		enemies.forEach(function (item) {
			let carRect = car.getBoundingClientRect()
			let enemyRect = item.getBoundingClientRect()

			if (carRect.top <= enemyRect.bottom
				&& carRect.right >= enemyRect.left
				&& carRect.left <= enemyRect.right
				&& carRect.bottom >= enemyRect.top) {
				setting.start = false
				start.classList.remove('hide')
				score.style.top = start.offsetHeight
				audio.pause()
				crash.play()
				toggleAudioBtn()
			}

			item.y += setting.speed / 2
			item.style.top = item.y + 'px'
			if (item.y >= gameArea.offsetHeight) {
				item.y = -HEIGHT_ELEM * setting.traffic
				item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - item.offsetWidth)) + 'px'
			}
		})
	}

	start.addEventListener('click', startGame)

	document.addEventListener('keydown', startRun)
	document.addEventListener('keyup', stopRun)

	audioBtn.addEventListener('click', () => {
		toggleAudioBtn()
		toggleAudio()
	})

})
