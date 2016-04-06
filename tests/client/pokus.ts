import {assert} from 'chai';
import Bar from 'bar/Bar';

describe('pokus', () => {
    it('foo', () => {
        assert.strictEqual('WORLD', Bar.world());
    });
});
