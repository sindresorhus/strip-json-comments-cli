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
			name: 'whitespace',
			type: 'boolean',
			default: true,
		}
	}
});

function init(data) {
	console.log(stripJsonComments(data, cli.flags));
}

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Specify a file path');
	process.exit(1);
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	(async () => {
		init(await getStdin());
	})();
}
