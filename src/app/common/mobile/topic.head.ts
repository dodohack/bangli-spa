/**
 * Top optional-fixed nav bar for mobile website
 */

import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

import { Topic }  from '../../core/models';

import { IMG_SERVER } from '../../../../.config';

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

    constructor(private cd: ChangeDetectorRef) {}

    /**
     * Get image url from relative or absolute uri
     */
    imageUrl(uri: string) {
        if (uri[0] == 'h' && uri[1] == 't') return uri;
        return IMG_SERVER + '/' + uri;
    }
}
