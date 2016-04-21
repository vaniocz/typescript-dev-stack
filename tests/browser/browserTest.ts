import {assert} from 'chai';
import * as sinon from 'sinon';
import Bar from 'bar/Bar';

describe('browser test', () => {
    it('works', () => {
        assert.strictEqual('WORLD', Bar.world());
    });

    it('the test runs in browser context', () => {
        assert.ok(document.createElement);
    });

    it('sinon is available', () => {
        assert.ok(sinon.spy);
    });
});
