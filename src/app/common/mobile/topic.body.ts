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

import { Offer, Post } from '../../core/models';

@Component({
    selector: 'topic-body',
    templateUrl: './topic.body.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicBody
{
    // The type of topic, some topic has slightly different head
    @Input() ttype: string;

    @Input() content: string; // Topic detailed introduction
    @Input() posts: Post[];   // Posts of this topic
    @Input() offers: Offer[]; // Offers of this topic

    constructor(private cd: ChangeDetectorRef) {}

    get hasOffer() { return this.offers && this.offers.length > 0; }

    get numOffers() {
        let num = this.offers && this.offers.length;
        if (num) return '(' + num + ')';
        return;
    }
}
