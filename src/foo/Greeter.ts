import * as $ from 'jquery';
import Bar from 'bar/Bar';
import log from 'bar/log';
import myClassMetadata from 'bar/myClassMetadata';

@myClassMetadata('foo')
export default class Greeter
{
    private greeting: string;

    public constructor(greeting: string = 'Hello')
    {
        this.greeting = greeting;
    }

    @log
    public greet(foo: string = 'bar'): string
    {
        const text = `${this.greeting} ${Bar.world()} using jQuery!`;
        $('#hello').html(text);
        console.log(text);

        return text;
    }

    public async testAsync(): Promise<string>
    {
        const response = await fetch('/index.html');

        return response.text();
    }
}
