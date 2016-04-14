import {assert} from 'chai';
import Bar from 'bar/Bar';

describe('browser test', () => {
    it('works', () => {
        assert.strictEqual('WORLD', Bar.world());
    });

    it('the test runs in browser context', () => {
        assert.ok(document.createElement);
    });
});
