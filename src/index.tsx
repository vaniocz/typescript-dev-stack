/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" /> NetBeans TypeScript plugin bug

import 'whatwg-fetch';
import 'reflect-metadata';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Greeter from 'foo/Greeter';
import Hello from 'components/Hello';

import 'index.scss';

const foo = new Greeter;
const metadataValue = Reflect.getMetadata('myClassMetadata', Greeter);
foo.greet('foo');
foo.testAsync().then((value) => console.log(`fetched text response: ${value}`));
console.log(`metadata value: ${metadataValue}`);

ReactDOM.render(
    <Hello who="world" using="React" />,
    document.getElementById('reactRoot')
);
