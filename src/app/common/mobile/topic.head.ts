/**
 * Top optional-fixed nav bar for mobile website
 */

import {
    Component,
    Input,
    ChangeDetectionStrategy,
} from '@angular/core';

import { Topic }  from '../../core/models';
import { Helper } from '../../core/helper';

@Component({
    selector: 'topic-head',
    templateUrl: './topic.head.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicHead
{
    // The type of topic, some topic has slightly different head
    @Input() ttype: string;

    @Input() topic: Topic;

    constructor(private helper: Helper) {}
}
