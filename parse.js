#!/usr/bin/env node

process.stdin.pipe(require('csv').parse()).pipe(process.stdout)