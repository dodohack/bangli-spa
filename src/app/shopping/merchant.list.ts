/**
 * List of merchants who has at least 1 offers.
 */
import { Inject, Component, PLATFORM_ID } from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Store }             from '@ngrx/store';
import { FormControl }       from '@angular/forms';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';


import { AppState }        from '../core/reducers';
import { EntitiesBase }    from '../core/entities.base';
import { SINGLE_PARAMS }   from './merchant.list.cfg';
import { SITE }            from '../../../.config';
import { Helper }          from "../core/helper";
import { ENTITY }          from "../core/models";
import * as EntityActions  from '../core/actions/entity';
import { AutofocusDirective } from '../common/autofocus';

@Component({
    templateUrl: './merchant.list.html',
    animations: [
        trigger('flyIn', [
            state('in', style({ transform: 'translateY(0)'})),
            transition(':enter', [
                style({transform: 'translateY(100%)'}),
                animate(300)
            ]),
        ]),
    ],
})
export class MerchantList extends EntitiesBase
{
    searchControl: FormControl = new FormControl();

    alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    constructor(public route: ActivatedRoute,
                public router: Router,
                public store: Store<AppState>,
                public title: Title,
                public helper: Helper,
                @Inject(PLATFORM_ID) public platformId: Object) {
        super(route, router, '/deal/list/', store, SINGLE_PARAMS,
            true/*pageless*/, platformId);

        this.title.setTitle('优惠导航 - ' + SITE.NAME);

        this.searchControl.valueChanges.subscribe(text => {
            let p = Object.assign({}, SINGLE_PARAMS, {query: text});
            this.store.dispatch(new EntityActions.Search({etype: ENTITY.TOPIC, data: p}));
        });

    }

    isGroupStart(i, c1, c2) {
        if (i == 0) return true;
        if (c1.substring(0,1) === c2.substring(0,1)) return false;
        return true;
    }
}
