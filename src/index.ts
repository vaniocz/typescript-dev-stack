/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" /> NetBeans TypeScript plugin bug

import 'babel-polyfill';
import 'whatwg-fetch';
import 'reflect-metadata';
import Greeter from 'foo/Greeter';

const foo = new Greeter;
const metadataValue = Reflect.getMetadata('myClassMetadata', Greeter);
foo.greet('foo');
foo.testAsync().then((value) => console.log(`fetched text response: ${value}`));

console.log(`metadata value: ${metadataValue}`);
