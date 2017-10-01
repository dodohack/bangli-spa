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

import { MdTab } from '@angular/material';

import { NgSwitch } from '@angular/common';

import { Topic }  from '../../core/models';

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
}
