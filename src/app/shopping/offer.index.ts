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
        let testOffers: any[] = [{title: '测试优惠1'}, {title: '测试优惠2'}, {title: '测试优惠3'}];
        this.featuredOffers$ = Observable.of(testOffers);
    }
}

export const OfferIndex = environment.mobile ? _OfferIndexMobile : _OfferIndex;
