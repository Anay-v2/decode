/*


?     Encoders/Decoders


:     These are the functions used for encoding/decoding in the app.


*/
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

function caeserEncode(string, shift) {
	let encodedString = ''
	for (let i = 0; i < string.length; i++) {
		let currentLetter = string[i]
		let currentIndex = alphabet.indexOf(currentLetter)
		let newIndex = currentIndex + shift
		if (newIndex > 25) {
			newIndex = newIndex - 26
		}
		encodedString += alphabet[newIndex]
	}
	return encodedString
}

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

function caeserCipher(string, shift, decode) {
	if (decode) return caeserDecode(string, shift)
	return caeserEncode(string, shift)
}

const morseCode = {
	a: '.-',
	b: '-...',
	c: '-.-.',
	d: '-..',
	e: '.',
	f: '..-.',
	g: '--.',
	h: '....',
	i: '..',
	j: '.---',
	k: '-.-',
	l: '.-..',
	m: '--',
	n: '-.',
	o: '---',
	p: '.--.',
	q: '--.-',
	r: '.-.',
	s: '...',
	t: '-',
	u: '..-',
	v: '...-',
	w: '.--',
	x: '-..-',
	y: '-.--',
	z: '--..',
	0: '-----',
	1: '.----',
	2: '..---',
	3: '...--',
	4: '....-',
	5: '.....',
	6: '-....',
	7: '--...',
	8: '---..',
	9: '----.',
	'&': '.-...',
	"'": '.----.',
	'@': '.--.-.',
	$: '···−··−',
	')': '-.--.-',
	'(': '-.--.',
	':': '---...',
	',': '--..--',
	';': '−·−·−·',
	'=': '-...-',
	'!': '-.-.--',
	'.': '.-.-.-',
	'-': '-....-',
	_: '··−−·−',
	'+': '.-.-.',
	'"': '.-..-.',
	'?': '..--..',
	'/': '-..-.',
	' ': '/',
}

const fromMorse = Object.keys(morseCode).reduce(
	(obj, char) => ({ ...obj, [morseCode[char]]: char }),
	{}
)

function morseEncode(string) {
	return [...string.toLowerCase()].map(letter => morseCode[letter]).join(' ')
}

function morseDecode(string) {
	return string
		.split(' ')
		.map(morse => fromMorse[morse])
		.join('')
}

function morse(string, decode) {
	if (decode) return morseDecode(string)
	return morseEncode(string)
}

const base64Encode = btoa
const base64Decode = atob
function base64(string, decode) {
	if (decode) return base64Decode(string)
	return base64Encode(string)
}

function asciiEncode(string) {
	return [...string].map(letter => letter.charCodeAt(0)).join(' ')
}

function asciiDecode(string) {
	return string
		.split(' ')
		.map(code => String.fromCharCode(code))
		.join('')
}

function ascii(string, decode) {
	if (decode) return asciiDecode(string)
	return asciiEncode(string)
}

const baconl = {
	a: 'AAAAA',
	b: 'AAAAB',
	c: 'AAABA',
	d: 'AAABB',
	e: 'AABAA',
	f: 'AABAB',
	g: 'AABBA',
	h: 'AABBB',
	i: 'ABAAA',
	j: 'ABAAA',
	k: 'ABAAB',
	l: 'ABABA',
	m: 'ABABB',
	n: 'ABBAA',
	o: 'ABBAB',
	p: 'ABBBA',
	q: 'ABBBB',
	r: 'BAAAA',
	s: 'BAAAB',
	t: 'BAABA',
	u: 'BAABB',
	v: 'BAABB',
	w: 'BABAA',
	x: 'BABAB',
	y: 'BABBA',
	z: 'BABBB',
}

const baconld = {
	aaaaa: 'a',
	aaaab: 'b',
	aaaba: 'c',
	aaabb: 'd',
	aabaa: 'e',
	aabab: 'f',
	aabba: 'g',
	aabbb: 'h',
	abaaa: 'i',
	abaab: 'k',
	ababa: 'l',
	ababb: 'm',
	abbaa: 'n',
	abbab: 'o',
	abbba: 'p',
	abbbb: 'q',
	baaaa: 'r',
	baaab: 's',
	baaba: 't',
	baabb: 'u',
	babaa: 'w',
	babab: 'x',
	babba: 'y',
	babbb: 'z',
}

function baconEncode(string) {
	return [...string.toLowerCase()]
		.map(letter => baconl[letter] || letter)
		.join(' ')
}

function baconDecode(string) {
	return string
		.split(' ')
		.map(bacon => baconld[bacon.toLowerCase()] || bacon)
		.join('')
}

function bacon(string, decode) {
	if (decode) return baconDecode(string)
	return baconEncode(string)
}

/*


?     Webpage


:     These are the things required to make the app function


*/

const keys = ['caeser']

document.querySelector('#method').addEventListener('change', e => {
	const method = e.target.value
	if (keys.includes(method)) {
		document.querySelector('#key').setAttribute('disabled', false)
	} else {
		document.querySelector('#key').setAttribute('disabled', true)
	}
})

document.querySelector('#en')?.addEventListener('click', encode)
document.querySelector('#de')?.addEventListener('click', decode)

function encode() {
	const string = document.querySelector('#in').value
	const method = document.querySelector('#method').value
	const key = document.querySelector('#key').value
	let out = null
	if (method == 'caeser') out = caeserCipher(string, parseInt(key))
	else if (method == 'morse') out = morse(string)
	else if (method == 'base64') out = base64(string)
	else if (method == 'ascii') out = ascii(string)
	else if (method == 'bacon') out = bacon(string)
	document.querySelector('#out').value = out
}

function decode() {
	const string = document.querySelector('#in').value
	const method = document.querySelector('#method').value
	const key = document.querySelector('#key').value
	let out = null
	if (method == 'caeser') out = caeserCipher(string, parseInt(key), true)
	else if (method == 'morse') out = morse(string, true)
	else if (method == 'base64') out = base64(string, true)
	else if (method == 'ascii') out = ascii(string, true)
	else if (method == 'bacon') out = bacon(string, true)
	document.querySelector('#out').value = out
}
