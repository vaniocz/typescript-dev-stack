import * as Vue from 'vue';
import Component from 'vue-class-component';
import Greeter from 'foo/Greeter';
import Template from 'components/greeting.html';

@Template
@Component
export default class Greeting extends Vue
{
    public data(): {greeting: string}
    {
        return {greeting: new Greeter().greeting};
    }
}
