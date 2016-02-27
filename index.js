'use strict'

const synaptic = require('synaptic')
const set = require('./set.json')
const fs = require('fs')

const network = new synaptic.Architect.Perceptron(6, 12, 6, 1);
const trainer = new synaptic.Trainer(network, {
  iterations: 10000
})

const computeName = name => {
  let arr = name
    .substr(0,6)
    .split('')
    .reverse()
    .map(c => {
      let x = (
          (
            c
              .toLowerCase()
              .charCodeAt(0)
            - 94
          )
        )
          / 25
      return x > 1
        ? 1
        : x
    }
    )
    .reduce(
      (mem, el, i) => {
        mem[i] = el
        return mem
      },
      Array.from(Array(6)).fill(0)
    )
  return [arr[0]].concat(arr)
}

console.log(computeName('test'))

trainer.train(set.map(el => {
  return {
    input: computeName(el[0]),
    output: [el[1]]
  }
}))

module.exports = {
  test (x) {
    return network.activate(computeName(x))
  },
  network,
  computeName
}

