import 'reflect-metadata';

export default function myClassMetadata(value: string): ClassDecorator
{
    return (target: Function) => Reflect.defineMetadata('myClassMetadata', value, target);
}
