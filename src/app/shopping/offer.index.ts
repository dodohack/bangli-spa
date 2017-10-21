import { Component }   from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { NgxCarousel }       from 'ngx-carousel';
import 'hammerjs';

import { AppState } from "../core/reducers";
import { GroupEntitiesBaseFixed } from '../core/group-entities-fixed.base';
import * as cfg from './offer.index.cfg';

@Component({
    templateUrl: './offer.index.html'
})
export class OfferIndex extends GroupEntitiesBaseFixed
{
    public carouselConfig:  NgxCarousel;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(route, store, router, cfg.GROUP_KEYS, [
            cfg.FEATURED_OFFER,
            cfg.FEATURED_BEAUTY_OFFER,
            cfg.FEATURED_HEALTHCARE_OFFER,
            cfg.FEATURED_FASHION_OFFER
        ]);

        this.carouselConfig = {
            grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
            slide: 1,
            speed: 400,
            interval: 4000,
            point: { visible: true },
            load: 2,
            touch: true,
            loop: true
        };
    }
}
