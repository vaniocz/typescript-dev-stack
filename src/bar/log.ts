export default function log(
    target: Object,
    method: string,
    descriptor: TypedPropertyDescriptor<any>,
): TypedPropertyDescriptor<any> {
    const value = descriptor.value;
    
    descriptor.value = function (...args: any[]): any
    {
        const a = args.map((argument) => JSON.stringify(argument)).join();
        const result = value.apply(this, args);

        console.log(`Method ${method} called with arguments ${a} and returned ${JSON.stringify(result)}.`);

        return result;
    };
    
    return descriptor;
}
