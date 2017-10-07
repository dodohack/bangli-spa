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

import { getEntitiesByKey, getOffersByKey } from '../core/reducers';

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
        super(route, store, router, GROUP_PARAMS);
    }
}

@Component({
    selector: '',
    templateUrl: './offer.index.m.html'
})
export class _OfferIndexMobile extends EntitiesBase
{
    featuredOffers$: Observable<any>;
    beautyFeaturedOffers$: Observable<Offer[]>;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(route, store, router, GROUP_PARAMS);

        // Create a dummy data
        /*
        let testOffers: any[] = [
            {title: '测试优惠1',
                brand: 'Holland & Barrett', brand_slug: 'holland-barrett'},
            {title: '测试优惠标题一句话介绍，长度在50字左右，太长的文字需要需要截断,不然就回导致排版很难看',
                brand: 'ASOS', brand_slug: 'asos-uk'},
            {title: '测试优惠3',
                brand: 'Lookfantastic', brand_slug: 'lookfantastic-uk'},
            {title: '测试优惠标题一句话介绍，长度在50字左右，太长的文字需要需要截断,不然就回导致排版很难看',
                brand: 'Allsole', brand_slug: 'allsole'},
            {title: '测试优惠标题一句话介绍，长度在50字左右',
                brand: 'Allsaints', brand_slug: 'allsaints'},
            {title: '测试优惠标题一句话介绍，长度在50字左右，太长的文字需要需要截断',
                brand: 'ASOS', brand_slug: 'asos'},
        ];
        this.featuredOffers$ = Observable.of(testOffers);
         */

        //
        // FIXME: When we enable these, it will cause error:
        // TypeError: Cannot read property 'createUrlTree' of undefined
        // FIXME: This probably is caused by passing a non selector to store.select!!
        //

        this.featuredOffers$ = this.store.select(
            getOffersByKey(GROUP_KEYS.FEATURED_OFFER));
/*
        this.beautyFeaturedOffers$ = this.store.select(
            getEntitiesByKey(ENTITY.OFFER, GROUP_KEYS.FEATURED_BEAUTY_OFFER));
            */
    }
}

export const OfferIndex = environment.mobile ? _OfferIndexMobile : _OfferIndex;
