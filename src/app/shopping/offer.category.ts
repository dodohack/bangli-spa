/**
 * Offer category page
 */

import { Component }         from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store }             from '@ngrx/store';

import { environment } from '../../environments/environment';
import { AppState } from "../core/reducers";
import { GroupEntitiesBase } from '../core/group-entities.base';
import { GROUP_KEYS, GROUP_PARAMS } from './offer.category.cfg';

@Component({
    selector: '',
    templateUrl: './offer.category.html'
})
export class _OfferCategory extends GroupEntitiesBase
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(route, store, router, GROUP_KEYS, GROUP_PARAMS);
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
        super(route, store, router, GROUP_KEYS, GROUP_PARAMS);
    }
}

export const OfferCategory = environment.mobile ? _OfferCategoryMobile : _OfferCategory;
