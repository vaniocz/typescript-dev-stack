declare module '*.html'
{
    import * as Vue from 'vue';

    interface WithRender
    {
        <V extends typeof Vue>(component: V): V;
    }

    const withRender: WithRender;

    export default withRender;
}
