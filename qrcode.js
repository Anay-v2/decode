let container = document.getElementById('container')
let input = document.getElementById('in')

function generate() {
	container.innerHTML = ''
	let qrcode = new QRCode(container, {
		text: input.value,
		width: 128,
		height: 128,
        colorDark: document.querySelector('#dc').value,
        colorLight: document.querySelector('#lc').value
	})
}

document.querySelector('#make').addEventListener('click', generate)