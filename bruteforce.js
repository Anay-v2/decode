const alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
]

function caeserDecode(string, shift) {
	let decodedString = ''
	for (let i = 0; i < string.length; i++) {
		let currentLetter = string[i]
		let currentIndex = alphabet.indexOf(currentLetter)
		let newIndex = currentIndex - shift
		if (newIndex < 0) {
			newIndex = newIndex + 26
		}
		decodedString += alphabet[newIndex]
	}
	return decodedString
}

function bruteForce(input) {
	let strings = []
	for (let i = 0; i < 26; i++) {
		const decodedString = caeserDecode(input, i)
		strings.push(decodedString)
	}
	return strings
}

document.querySelector('#de').addEventListener('click', () => {
	const input = document.querySelector('#in').value
	const output = bruteForce(input)
	document.querySelector('#out').innerHTML = output
		.map((v, i) => `${i + 1}. ${v}`)
		.join('<br>')
})
