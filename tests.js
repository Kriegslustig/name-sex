const name = require('./index.js')()

name.train(name.network)
console.log(name.test('veith'))
console.log(name.test('carlo'))
console.log(name.test('luca'))
console.log(name.test('lara'))
console.log(name.test('alexa'))
console.log(name.test('sandy'))
console.log(name.test('marie'))

