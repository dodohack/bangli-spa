
/**
 * The card widget used to display single offer or post
 */

import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Entity }                  from "../core/models";
import { Helper }                  from "../core/helper";

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';




@Component ({
    selector: 'offer-card',
    templateUrl: './offer-card.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeIn', [
            state('in', style({ opacity: '1'})),
            transition(':enter', [
                style({ opacity: '0'}),
                animate(500),
            ]),
        ]),
    ],
})
export class OfferCard
{
    constructor(private helper: Helper) { }

    @Input() title: string;
    @Input() topics: Entity[];
    @Input() category: string; // Category slug

    // Will deprecate these
    @Input() topic: Entity;    // Topic object
}
