import {assert} from 'chai';
import * as sinon from 'sinon';
import Bar from 'bar/Bar';

describe('server test', () => {
    it('works', () => {
        assert.strictEqual('WORLD', Bar.world());
    });

    it('the test runs in server context', () => {
        assert.ok(require('fs'));
    });

    it('sinon is available', () => {
        assert.ok(sinon.spy);
    });
});
