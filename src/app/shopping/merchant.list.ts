/**
 * List of merchants who has at least 1 offers.
 */
import { Component }         from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store }             from '@ngrx/store';

import { AppState }          from '../core/reducers';
import { EntitiesBase }      from '../core/entities.base';
import { SINGLE_PARAMS }     from './merchant.list.cfg';
import { environment }   from '../../environments/environment';


@Component({ templateUrl: './merchant.list.html' })
export class _MerchantList extends EntitiesBase
{

}

@Component({ templateUrl: './merchant.list.m.html' })
export class _MerchantListMobile extends EntitiesBase
{

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected store: Store<AppState>) {
        super(route, router, '/deal/list/', store, SINGLE_PARAMS, true/*pageless*/);
    }

}


export const MerchantList = environment.mobile ? _MerchantListMobile : _MerchantList;
