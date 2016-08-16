'use strict'

const synaptic = require('synaptic')
const set = require('./set.json')
const fs = require('fs')

const computeName = name =>
  name
    .split('')
    .reverse()
    .map(c => {
      let x = (
          (
            c
              .toLowerCase()
              .charCodeAt(0) - 94
          )
        ) / 25
      return x > 1
        ? 1
        : x
    })
    .reduce(
      (mem, el, i) => {
        mem[i] = el
        return mem
      },
      Array.from(Array(6)).fill(0)
    )

module.exports = () => {
  let network
  const train = net => {
    console.log('Starting to train.')
    const trainer = new synaptic.Trainer(net, {
      iterations: 100
    })
    trainer.train(set.map(el => {
      return {
        input: computeName(el[0]),
        output: [el[1]]
      }
    }))
    fs.writeFileSync('memory.json', JSON.stringify(net.toJSON()))
    return net
  }

  try {
    network = synaptic.Network.fromJSON(require('./memory.json'))
  } catch (e) {
    console.log('No memory found! Recomputing...')
    network = new synaptic.Architect.Perceptron(5, 10, 5, 1)
  }

  const test = str => network.activate(computeName(str))

  return {
    network,
    test,
    train,
    computeName
  }
}

