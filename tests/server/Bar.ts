import {assert} from 'chai';
import Bar from 'bar/Bar';

describe('Bar', () => {
    it('knows about the world', () => {
        assert.strictEqual('WORLD', Bar.world());
    });
});
