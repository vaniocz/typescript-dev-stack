import {assert} from 'chai';
import Bar from 'bar/Bar';

describe('server-side test', () => {
    it('works', () => {
        assert.strictEqual('WORLD', Bar.world());
    });
});
