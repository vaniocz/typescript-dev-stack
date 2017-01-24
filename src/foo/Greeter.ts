export default class Greeter
{
    public readonly greeting: string;

    public constructor(greeting: string = 'Hello world!')
    {
        this.greeting = greeting;
    }
}
