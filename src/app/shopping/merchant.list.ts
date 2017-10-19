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


@Component({ templateUrl: './merchant.list.html' })
export class MerchantList extends EntitiesBase
{
    alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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
}
