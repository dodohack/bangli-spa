/**
 * Offer category page
 */

import { Component }         from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store }             from '@ngrx/store';

import { environment } from '../../environments/environment';
import { AppState } from "../core/reducers";
import { GroupEntitiesBase } from '../core/group-entities.base';
import * as cfg from './offer.category.cfg';

@Component({
    selector: '',
    templateUrl: './offer.category.html'
})
export class _OfferCategory extends GroupEntitiesBase
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(route, store, router, cfg.GROUP_KEYS, [
            cfg.FEATURED_TOPIC_PARAMS,
            cfg.TOPIC_PARAMS
        ]);
    }
}

@Component({
    selector: '',
    templateUrl: './offer.category.m.html'
})
export class _OfferCategoryMobile extends GroupEntitiesBase
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
}

export const OfferCategory = environment.mobile ? _OfferCategoryMobile : _OfferCategory;
