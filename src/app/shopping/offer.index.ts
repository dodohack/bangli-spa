import { Component }   from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Title }       from '@angular/platform-browser';
import { Store } from "@ngrx/store";
import { NgxCarousel }       from 'ngx-carousel';
import 'hammerjs';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';



import { AppState } from "../core/reducers";
import { GroupEntitiesBaseFixed } from '../core/group-entities-fixed.base';
import { Helper } from "../core/helper";
import * as cfg from './offer.index.cfg';
import { SITE } from '../../../.config';

@Component({
    templateUrl: './offer.index.html',
    animations: [
        trigger('fadeIn', [
            state('in', style({ opacity: '1'})),
            transition(':enter', [
                style({ opacity: '0'}),
                animate(500),
            ]),
        ]),
    ],
})
export class OfferIndex extends GroupEntitiesBaseFixed
{
    public carouselConfig:  NgxCarousel;
    public displayCfg: any;

    constructor(public helper: Helper,
                public title: Title,
                public route: ActivatedRoute,
                public store: Store<AppState>,
                public router: Router) {
        super(route, store, router, cfg.GROUP_KEYS, [
            cfg.FEATURED_OFFER,
            cfg.FEATURED_BEAUTY_OFFER,
            cfg.FEATURED_CLOTHES_OFFER,
            cfg.FEATURED_JEWELLERY_OFFER,
            cfg.FEATURED_HOUSEHOLD_OFFER,
            cfg.FEATURED_BOOKING_OFFER,
        ]);

        this.carouselConfig = {
            grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
            slide: 1,
            speed: 400,
            interval: 2500,
            point: { visible: true },
            load: 2,
            touch: true,
            loop: true
        };

        this.displayCfg = cfg.DISPLAY_PARAMS;

        this.title.setTitle('邦利优惠 - ' + SITE.NAME);
    }
}
