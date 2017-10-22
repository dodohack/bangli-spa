
/**
 * The card widget used to display single offer or post
 */

import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Entity }                  from "../core/models";
import { IMG_SERVER }              from "../../../.config";

@Component ({
    selector: 'offer-card',
    templateUrl: './offer-card.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCard
{
    @Input() offers: Entity[];
    @Input() title: string;
    @Input() category: string; // Category slug
    @Input() topic: Entity;    // Topic object
    @Input() display: string;  // Display style: 'card', 'group' etc

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

    /**
     * Get an random featured image from the topic
     */
    get imgUrl() {
        if (this.topic && this.topic.images) {
            let idx = Math.random() * this.topic.images.length;
            return IMG_SERVER + '/' + this.topic.images[idx];
        }

        return "http://placehold.it/400x220?text=img";
    }

    /**
     * Get topic logo
     */
    get logoUrl() {
        if (this.topic && this.topic.logo)
            if (this.topic.logo[0] == 'h' && this.topic.logo[1] == 't')
                return this.topic.logo;
            else
                return IMG_SERVER + '/' + this.topic.logo;

        return "http://placehold.it/64x64?text=logo";
    }

    /**
     * Return offer of this topic, firstly choose featured offer
     */
    get offerTitle() {
        if (this.topic && this.topic.offers && this.topic.offers.length) {
            // Find featured offer
            let offer = this.topic.offers.find(ele => ele.featured);

            // If we don't have featured offer
            if (!offer) {
                offer = this.topic.offers[0];
            }

            // Shorten long text
            if (offer.title.length < 80) return offer.title;
            else return offer.title.substr(0,79) + '...';
        }
    }
}
