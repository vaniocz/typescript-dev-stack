try {
    window.require = window.top.require;
    window.process = window.top.process;
    window.__dirname = window.top.__dirname;
    require('module').globalPaths.push('./node_modules');
} catch (e) {}

if (typeof global === 'undefined') {
    window.global = window;
}

if (__COVERAGE__ && !__GREP__) {
    const srcContext = require.context('../src', true, /^(?!.*(index\.tsx?|\.d.ts)$).*\.[jt]sx?$/);
    srcContext.keys().forEach(srcContext);
}

const testsContext = require.context('./' + __TEST_CONTEXT__, true, __GREP__ || /\.[jt]sx?$/);
testsContext.keys().forEach(testsContext);
