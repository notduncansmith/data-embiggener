#!/usr/bin/env node

var R = require('randopeep');
var csv = require('csv');
var Moniker = require('moniker');
var adj = Moniker.generator([Moniker.adjective]);

var fieldNames = [];

for (var i = 10; i >= 0; i--) {
  fieldNames.push(adj.choose());
};

var headers = null;

var pipe = process.stdin
.pipe(csv.parse())
.pipe(csv.transform(function (record) {

  if (!headers) {
    headers = record;
    return headers.concat(fieldNames);
  }

  return scaleHorizontally(record)
  .map(function(value){
    return value.toUpperCase()
  });
}))
.pipe(csv.stringify())
.pipe(process.stdout);

function scaleHorizontally (fields) {
  return fields.concat(fieldNames.map(function () {
    return ((Math.floor(Math.random() * 100) + 1) < 50).toString();
  }));
}