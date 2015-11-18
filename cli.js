#!/usr/bin/env node
'use strict';
const fs = require('fs');
const getStdin = require('get-stdin');
const meow = require('meow');
const fn = require('strip-json-comments');

const cli = meow(`
	Usage
	  $ strip-json-comments <input-file> > <output-file>
	  $ strip-json-comments < <input-string>

	Options
	  --no-whitespace  Remove comments instead of replacing them with whitespace

	Example
	  $ strip-json-comments input.json > output.json
`, {
	string: ['_']
});

function init(data) {
	console.log(fn(data, cli.flags));
}

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	if (!cli.input[0]) {
		console.error('Filepath required');
		process.exit(1);
	}
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	getStdin().then(init);
}
