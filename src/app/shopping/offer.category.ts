/**
 * Offer category page
 */

import { Inject, Component, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title }             from '@angular/platform-browser';
import { Store }             from '@ngrx/store';
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
import { GroupEntitiesBase } from '../core/group-entities.base';
import * as cfg from './offer.category.cfg';
import { Helper } from "../core/helper";


@Component({
    templateUrl: './offer.category.html',
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
export class OfferCategory extends GroupEntitiesBase
{
    public carouselConfig:  NgxCarousel;

    constructor(public helper: Helper,
                public title: Title,
                public route: ActivatedRoute,
                public store: Store<AppState>,
                public router: Router,
                @Inject(PLATFORM_ID) public platformId: Object) {
        // Only last group of entities will be pageless
        super(title, route, store, router, cfg.GROUP_KEYS, [
            cfg.FEATURED_TOPIC_PARAMS,
            cfg.TOPIC_PARAMS
        ], true, platformId);


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

    }

    // FIXME: If we implement OnInit in child class, there will be a
    // strange angular runtime error!
    /*
    ngOnInit() {
    }
     */
}
