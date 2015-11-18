import childProcess from 'child_process';
import test from 'ava';
import pify from 'pify';

test('main', async t => {
	const stdout = await pify(childProcess.execFile)('./cli.js', ['fixture.json']);
	t.same(JSON.parse(stdout), {unicorn: 'cake'});
});

test('stdin', async t => {
	const stdout = await pify(childProcess.exec)('echo \'{/*rainbows*/"unicorn":"cake"}\' | ./cli.js');
	t.same(JSON.parse(stdout), {unicorn: 'cake'});
});
