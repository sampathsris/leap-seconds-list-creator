#! /usr/bin/env/node

const program = require('program');
const creator = require('./creator');

program
    .arguments('<file>')
    .action((file) => {
        creator(file);
    })
