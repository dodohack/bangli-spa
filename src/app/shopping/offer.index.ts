import { Component }   from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { environment } from '../../environments/environment';
import { AppState } from "../core/reducers";
import { GroupEntitiesBaseFixed } from '../core/group-entities-fixed.base';
import * as cfg from './offer.index.cfg';


@Component({
    selector: '',
    templateUrl: './offer.index.html'
})
export class _OfferIndex extends GroupEntitiesBaseFixed
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(route, store, router, cfg.GROUP_KEYS, [
            cfg.FEATURED_OFFER,
            cfg.FEATURED_BEAUTY_OFFER,
            cfg.FEATURED_HEALTHCARE_OFFER,
            cfg.FEATURED_FASHION_OFFER
        ]);
    }
}

@Component({
    selector: '',
    templateUrl: './offer.index.m.html'
})
export class _OfferIndexMobile extends GroupEntitiesBaseFixed
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(route, store, router, cfg.GROUP_KEYS, [
            cfg.FEATURED_OFFER,
            cfg.FEATURED_BEAUTY_OFFER,
            cfg.FEATURED_HEALTHCARE_OFFER,
            cfg.FEATURED_FASHION_OFFER
        ]);
    }
}

export const OfferIndex = environment.mobile ? _OfferIndexMobile : _OfferIndex;
