#!/usr/bin/env node
import process from 'node:process';
import fs from 'node:fs';
import getStdin from 'get-stdin';
import meow from 'meow';
import stripJsonComments from 'strip-json-comments';

const cli = meow(`
	Usage
	  $ strip-json-comments <input-file> > <output-file>
	  $ strip-json-comments < <input-string>

	Options
	  --no-whitespace  Remove comments instead of replacing them with whitespace

	Example
	  $ strip-json-comments input.json > output.json
`, {
	importMeta: import.meta,
	flags: {
		whitespace: {
			type: 'boolean',
			default: true,
		},
	},
});

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Specify a file path');
	process.exit(1);
}

const data = input ? fs.readFileSync(input, 'utf8') : await getStdin();
console.log(stripJsonComments(data, {...cli.flags, trailingCommas: true}));
