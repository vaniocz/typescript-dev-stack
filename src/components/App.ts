import * as Vue from 'vue';
import Component from 'vue-class-component';
import Greeting from 'components/Greeting';
import Template from 'components/app.html';

@Template
@Component({
    name: 'App',
    components: {greeting: Greeting},
})
export default class App extends Vue
{}
