/**
 * List of merchants who has at least 1 offers.
 */
import { Component }         from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Store }             from '@ngrx/store';

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


@Component({
    templateUrl: './merchant.list.html',
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: '0' }),
                animate('.5s ease-out', style({ opacity: '1' })),
            ]),
        ]),

        trigger('flyInOut', [
            state('in', style({ transform: 'translateY(0)'})),
            transition(':enter', [
                style({transform: 'translateY(100%)'}),
                animate(300),
            ]),
        ]),
    ],
})
export class MerchantList extends EntitiesBase
{
    alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected store: Store<AppState>,
                protected title: Title) {
        super(route, router, '/deal/list/', store, SINGLE_PARAMS, true/*pageless*/);

        this.title.setTitle('优惠导航 - ' + SITE.NAME);
    }

    isGroupStart(i, c1, c2) {
        if (i == 0) return true;
        if (c1.substring(0,1) === c2.substring(0,1)) return false;
        return true;
    }
}
