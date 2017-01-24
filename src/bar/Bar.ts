import {upperCase} from 'lodash';

export default class Bar
{
    public static world(): string
    {
        return upperCase('world');
    }
}
