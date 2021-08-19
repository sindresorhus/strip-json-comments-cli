import test from 'ava';
import execa from 'execa';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['fixture.json']);
	t.deepEqual(JSON.parse(stdout), {unicorn: 'cake'});
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', {input: '{/*rainbows*/"unicorn":"cake"}'});
	t.deepEqual(JSON.parse(stdout), {unicorn: 'cake'});
});
