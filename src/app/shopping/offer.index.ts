import { Component }   from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { AppState } from "../core/reducers";
import { GroupEntitiesBaseFixed } from '../core/group-entities-fixed.base';
import * as cfg from './offer.index.cfg';

@Component({
    templateUrl: './offer.index.html'
})
export class OfferIndex extends GroupEntitiesBaseFixed
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
