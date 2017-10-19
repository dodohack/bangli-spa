/**
 * Offer category page
 */

import {
    HostListener,
    Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Rx';

import { Paginator } from '../core/models';
import { AppState } from "../core/reducers";
import { GroupEntitiesBase } from '../core/group-entities.base';
import * as cfg from './offer.category.cfg';

@Component({
    selector: '',
    templateUrl: './offer.category.html'
})
export class OfferCategory extends GroupEntitiesBase
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        // Only last group of entities will be pageless
        super(route, store, router, cfg.GROUP_KEYS, [
            cfg.FEATURED_TOPIC_PARAMS,
            cfg.TOPIC_PARAMS
        ], true);
    }

    /**
     * Pageless loading
     * Load next page of entities when scroll to page bottom
     */
    @HostListener('window:scroll', [])
    loadEntitiesOnScroll() {
        if (this.pageless && !this.isLastGroupLoading &&
            !this.isLastPage(cfg.GROUP_KEYS.CATEGORY_TOPIC_W_OFFER) &&
            (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(() => {
                //if (this.isLoading) return;
                // Navigate to next page to trigger the load
                this.router.navigate(['/deal/cat', this.lastGroupCat, this.nextPage]);
            }, 10);
        }
    }
}
