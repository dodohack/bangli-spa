import { Component }   from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { environment } from '../../environments/environment';
import { AppState } from "../core/reducers";
import { EntitiesBase } from '../core/entities.page';
import { GROUP_KEYS, GROUP_PARAMS } from './offer.index.cfg';


@Component({
    selector: '',
    templateUrl: './offer.index.html'
})
export class _OfferIndex extends EntitiesBase
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(route, store, router, GROUP_KEYS, GROUP_PARAMS);
    }
}

@Component({
    selector: '',
    templateUrl: './offer.index.m.html'
})
export class _OfferIndexMobile extends EntitiesBase
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(route, store, router, GROUP_KEYS, GROUP_PARAMS);
    }
}

export const OfferIndex = environment.mobile ? _OfferIndexMobile : _OfferIndex;
