export default function log(target: Object, method: string, descriptor: TypedPropertyDescriptor<any>)
{
    const value = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
        var a = args.map((a) => JSON.stringify(a)).join();
        let result = value.apply(this, args);
        var r = JSON.stringify(result);

        console.log(`Method ${method} called with arguments ${a} and returned ${r}.`);

        return result;
    };
    
    return descriptor;
}
