import {suite, test} from 'mocha-typescript';
import {assert} from 'chai';
import Greeter from 'foo/Greeter';

@suite
class GreeterTest
{
    @test
    'greets using default greeting'()
    {
        assert.strictEqual('Hello world!', new Greeter().greeting);
    }

    @test
    'greets using custom greeting'()
    {
        assert.strictEqual('Hello man!', new Greeter('Hello man!').greeting);
        assert.strictEqual('Hello mate!', new Greeter('Hello mate!').greeting);
    }
}
