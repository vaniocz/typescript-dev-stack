import 'reflect-metadata';

export default function myClassMetadata(value: string)
{
    return (target: Function) => {
        Reflect.defineMetadata('myClassMetadata', value, target);
    }
}
