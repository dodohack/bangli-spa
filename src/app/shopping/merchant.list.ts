/**
 * List of merchants who has at least 1 offers.
 */
import { Component }         from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store }             from '@ngrx/store';

import { AppState }        from '../core/reducers';
import { EntitiesBase }    from '../core/entities.base';
import * as EntityActions  from '../core/actions/entity';
import { SINGLE_PARAMS }   from './merchant.list.cfg';
import { environment }   from '../../environments/environment';


@Component({ templateUrl: './merchant.list.html' })
export class _MerchantList extends EntitiesBase
{

}

@Component({ templateUrl: './merchant.list.m.html' })
export class _MerchantListMobile extends EntitiesBase
{
    alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    /* Each time we swipe 6 tabs instead of 1 */
    SWIPE_COUNT = 6;
    TOTAL_COUNT = this.alphabets.length;

    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

    selectedIdx = 0;

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected store: Store<AppState>) {
        super(route, router, '/deal/list/', store, SINGLE_PARAMS, true/*pageless*/);
    }

    isGroupStart(i, c1, c2) {
        if (i == 0) return true;
        if (c1.substring(0,1) === c2.substring(0,1)) return false;
        return true;
    }


    swipe(type) {
        if (type === this.SWIPE_ACTION.RIGHT && this.selectedIdx > 0) {
            this.selectedIdx = this.selectedIdx - this.SWIPE_COUNT;
            this.selectedIdx = this.selectedIdx > 0 ? this.selectedIdx : 0;
        }
        else if (type === this.SWIPE_ACTION.LEFT &&
            this.selectedIdx < this.TOTAL_COUNT) {
            this.selectedIdx = this.selectedIdx + this.SWIPE_COUNT;
            this.selectedIdx = this.selectedIdx < this.TOTAL_COUNT ?
                this.selectedIdx : this.TOTAL_COUNT;
        }
    }
}


export const MerchantList = environment.mobile ? _MerchantListMobile : _MerchantList;
