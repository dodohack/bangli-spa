import { Component }   from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable }  from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Offer } from '../core/models';

@Component({
    selector: '',
    templateUrl: './offer.index.html'
})
export class _OfferIndex
{
    offerFormControl = new FormControl('', []);
}

@Component({
    selector: '',
    templateUrl: './offer.index.m.html'
})
export class _OfferIndexMobile
{
    featuredOffers$: Observable<Offer[]>;

    constructor() {
        // Create a dummy data
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
    }
}

export const OfferIndex = environment.mobile ? _OfferIndexMobile : _OfferIndex;
