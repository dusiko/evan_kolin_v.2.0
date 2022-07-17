let detect = new MobileDetect(window.navigator.userAgent)

const options = {
	mobile: false,
	start: 1,
	end: 4,
}

optimizationForMobil()



function optimizationForMobil() {
	if (detect.phone()) {
		options.mobile = true
		let $videoListArr = [...document.querySelectorAll('.video-block__item')]
		$videoListArr = $videoListArr.slice(1)
		displayVideo = $videoListArr
		$videoListArr.forEach((item, i) => {
			if (i > 1)
				item.remove()
		})
		window.addEventListener('scroll', Visible);
	}
}




function lazyLoad() {
	if (options.mobile === true && [...document.querySelectorAll('.video-block__item')].length - 1 !== videoList.length) {
		createItem(videoList, options.start, options.end)
		options.start += 2
		options.end += 2
		setTimeout(() => window.addEventListener('scroll', Visible, Visible()), 500)

	}
}


function createItem(list, start, end = videoList.length) {
	const parent = document.querySelector('.video-list__inner')
	list.forEach((item, i) => {
		if (i > start && i < end) {
			const blockItem = document.createElement('DIV')
			blockItem.classList.add('video-block__item')

			const divBG = document.createElement('DIV')
			divBG.classList.add('video-bg')
			blockItem.append(divBG)

			const divBGLoad = document.createElement('DIV')
			divBGLoad.classList.add('video-bg__load')
			blockItem.append(divBGLoad)

			const iframe = document.createElement('iframe')
			iframe.classList.add('video-block__item-video')
			iframe.setAttribute('title', "YouTube video player")
			iframe.setAttribute('frameborder', '0')
			iframe.setAttribute('allow', 'accelerometer')
			iframe.setAttribute('autoplay', 'autoplay')
			iframe.setAttribute('clipboard-write', 'clipboard-write')
			iframe.setAttribute('encrypted-media', 'encrypted-media')
			iframe.setAttribute('gyroscope', 'gyroscope')
			iframe.setAttribute('picture-in-picture', 'picture-in-picture')
			iframe.setAttribute('allowfullscreen', 'allowfullscreen')
			iframe.setAttribute('src', item.src)
			blockItem.append(iframe)
			parent.append(blockItem)
		}
	})
}



// Получаем нужный элемент

function Visible() {
	const target = document.querySelector('.footer');
	// Все позиции элемента
	var targetPosition = {
		top: window.pageYOffset + target.getBoundingClientRect().top,
		left: window.pageXOffset + target.getBoundingClientRect().left,
		right: window.pageXOffset + target.getBoundingClientRect().right,
		bottom: window.pageYOffset + target.getBoundingClientRect().bottom
	},
		// Получаем позиции окна
		windowPosition = {
			top: window.pageYOffset,
			left: window.pageXOffset,
			right: window.pageXOffset + document.documentElement.clientWidth,
			bottom: window.pageYOffset + document.documentElement.clientHeight
		};

	if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
		targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
		targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
		targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
		// Если элемент полностью видно, то запускаем следующий код
		window.removeEventListener('scroll', Visible)
		lazyLoad()

	}
};
