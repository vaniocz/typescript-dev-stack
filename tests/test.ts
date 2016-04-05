import {assert} from 'chai';
import Bar from 'bar/Bar';

describe('test', () => {
    it('foo', () => {
        assert.strictEqual('WORLD', Bar.world());
        assert.strictEqual('foo', Bar.nonCovered());
    });
});
