try {
    window.require = window.top.require;
    window.process = window.top.process;
    window.__dirname = window.top.__dirname;
    require('module').globalPaths.push('./node_modules');
} catch (e) {}

if (__COVERAGE__ && !__GREP__) {
    const srcContext = require.context('../src', true, /^(?!.*index\.tsx?$).*\.tsx?$/);
    srcContext.keys().forEach(srcContext);
}

const testsContext = require.context('./' + __TEST_CONTEXT__, true, __GREP__ || /\.tsx?$/);
testsContext.keys().forEach(testsContext);
