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

@Component({
    selector: 'topic-body',
    templateUrl: './topic.body.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicBody
{
    // The type of topic, some topic has slightly different head
    @Input() ttype: string;

    constructor(private cd: ChangeDetectorRef) {}

    dealCount = [ 1, 2, 3, 4, 5];
}
