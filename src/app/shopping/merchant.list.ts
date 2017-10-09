/**
 * List of merchants who has at least 1 offers.
 */
import { Component }         from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store }             from '@ngrx/store';

import { AppState }          from '../core/reducers';
import { EntityBase }        from '../core';
import { ENTITY }            from '../core/models';
import { EntitiesBase }      from '../core/entities.base';
import * as fromEntities     from '../core/reducers';
import * as EntityActions    from '../core/actions/entity';

import { environment }   from '../../environments/environment';

@Component({ templateUrl: './merchant.list.html' })
export class _MerchantList extends EntitiesBase
{

}

@Component({ templateUrl: './merchant.list.m.html' })
export class _MerchantListMobile extends EntitiesBase
{
    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected router: Router,
                protected baseUrl: string,
                protected store: Store<fromEntities.AppState>) {
        super(etype, route, router, '/deal/list/', store, true/*pageless*/);
    }

}


export const MerchantList = environment.mobile ? _MerchantListMobile : _MerchantList;
