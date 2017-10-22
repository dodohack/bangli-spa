
/**
 * The card widget used to display single offer or post
 */

import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Entity }                  from "../core/models";
import { Helper }                  from "../core/helper";

@Component ({
    selector: 'offer-card',
    templateUrl: './offer-card.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCard
{
    constructor(private helper: Helper) { }

    @Input() display: string;  // Display style: 'card', 'group' etc

    @Input() title: string;
    @Input() topics: Entity[];
    @Input() category: string; // Category slug

    // Will deprecate these
    @Input() offers: Entity[];
    @Input() topic: Entity;    // Topic object


    // If 'category' slug is given, then this is not a category page
    get isCategoryPage() {
        return !this.category;
    }
}
