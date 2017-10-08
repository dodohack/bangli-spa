import { Component }   from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import { Observable }  from 'rxjs/Observable';
import { Store } from "@ngrx/store";

import { environment } from '../../environments/environment';
import { Offer }    from '../core/models';
import { AppState } from "../core/reducers";
import { ENTITY }   from "../core/models";
import { EntitiesBase } from '../core/entities.page';

import { getOffers } from '../core/reducers';

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
