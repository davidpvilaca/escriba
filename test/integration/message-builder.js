const R = require('ramda')
const { test } = require('ava')
const { createMessageBuilder } = require('../../src/message-builder')
const { createMessageMasker } = require('../../src/message-masker')

let messageBuilder = {}

test.before(() => {
  const sensitive = {
    password: {
      paths: ['message.password'],
      pattern: /\w.*/g,
      replacer: '*'
    }
  }
  
  messageBuilder = createMessageBuilder(createMessageMasker(sensitive), 'test')
})

test('messageBuilder: create a message with a masked message.password property', t => {
  const object = {
    message: { 
      password: 'Papyrus'
    },
    level: 'info'
  }

  const { message, service, level } = messageBuilder(object)
  t.is(message.password, '*')
  t.is(service, 'test')
  t.is(level, 'info')
})