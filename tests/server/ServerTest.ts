import {suite, test} from 'mocha-typescript';
import {assert} from 'chai';
import * as sinon from 'sinon';
import Bar from 'bar/Bar';

@suite
class ServerTest
{
    @test
    'bar is available'()
    {
         assert.strictEqual('WORLD', Bar.world());
    }

    @test
    'sinon is available'()
    {
        assert.ok(sinon.spy);
    }

    @test
    'test runs in server context'()
    {
        assert.ok(require('fs'));
    }
}
