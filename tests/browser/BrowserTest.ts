import {suite, test} from 'mocha-typescript';
import {assert} from 'chai';

@suite
class BrowserTest
{
    @test
    'test runs in browser context'()
    {
        assert.ok(document.createElement);
    }
}
