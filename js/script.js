document.querySelector('.intro__text-subdonat').addEventListener('click', copyCardNum)

function copyCardNum(event) {
	if (event.target.classList.contains('card__num')) {
		if (event.target.innerText != 'номер скопірований!') {
			const target = event.target
			const text = target.innerText
			const range = document.createRange();
			range.selectNode(target);
			window.getSelection().removeAllRanges(); // clear current selection
			window.getSelection().addRange(range); // to select text
			window.navigator.clipboard.writeText(text);
			window.getSelection().removeAllRanges();// to deselect
			target.innerText = 'номер скопірований!'
			target.style.color = 'green'
			setTimeout(() => {
				target.style.color = '#212121'
				target.innerText = text
			}, 1000)
		}
	}
}


const videoBlockInner = document.querySelector('.video-list__inner')
function fillVideos(playList) {
	playList.forEach((item, i) => {
		const video = document.createElement('DIV')
		video.classList.add('video-block__item')

		const bg = document.createElement('DIV')
		bg.classList.add('video-bg')
		video.appendChild(bg)

		const load = document.createElement('DIV')
		load.classList.add('video-bg__load')
		video.appendChild(load)

		videoBlockInner.appendChild(video)
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
		video.appendChild(iframe)

		if (playList[i].hasOwnProperty('new')) {
			const videoNew = document.querySelectorAll('.video-block__item')[i].cloneNode(true)
			console.log(videoNew)
			document.querySelector('.video-new').appendChild(videoNew)
		}

	})
}

fillVideos(videoList)