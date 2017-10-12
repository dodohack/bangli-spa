
/**
 * The card widget used to display single offer or post
 */

import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Entity }                  from "../../core/models";

@Component ({
    selector: 'offer-card-group',
    templateUrl: './offer-card-group.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardGroup
{
    @Input() offers: Entity[];
    @Input() title: string;
    @Input() category: string; // Category slug
    @Input() topic: Entity;    // Topic object

    today = new Date();

    // If 'category' slug is given, then this is not a category page
    get isCategoryPage() {
        return !this.category;
    }


    // Convert MySQL date into number of days away from today
    expires(date) {
        let exp = new Date(date);
        let diff = exp.getTime() - this.today.getTime();
        if (diff < 0)
            return '已过期';
        else {
            let days = Math.ceil(diff / (1000 * 3600 * 24));
            if (days < 2)
                return '有效期：仅限今日';
            else if (days < 10)
                return '有效期：还剩' + days + '天';
            else
                return '有效期：随时失效';
        }
    }

}
