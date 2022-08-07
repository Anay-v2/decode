let container = document.getElementById('container')
let input = document.getElementById('in')

function generate() {
	container.innerHTML = ''
	let qrcode = new QRCode(container, {
		text: input.value,
		width: 128,
		height: 128,
	})
}

document.querySelector('#make').addEventListener('click', generate)
