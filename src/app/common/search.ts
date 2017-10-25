/**
 * This is popup full screen search modal, but we
 * support more includes offers, merchants, articles etc.
 */

import { Component, Input, OnInit } from '@angular/core';
import { ChangeDetectionStrategy }  from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store }       from '@ngrx/store';
import { Observable }  from 'rxjs'

import {AppState, getEntitiesCurPage}    from '../core/reducers';
import { ENTITY, EntityParams }  from "../core/models";
import * as EntityActions from '../core/actions/entity';
import { Helper } from '../core/helper';

@Component ({
    selector: 'search',
    templateUrl: './search.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Search implements OnInit
{
    searchControl: FormControl = new FormControl();

    entities$: Observable<any>;

    searchParams: EntityParams  = {
        key: 'search',
        etype: ENTITY.TOPIC,
        topic_has_offer: true,  // Only query topic which at least has 1 offer
        per_page: 10,
        page: 1,
        order_by: 'guid',
        order: 'asc',
        query: ''
    };

    constructor(protected store: Store<AppState>, protected helper: Helper) {}

    ngOnInit() {
        this.entities$ = this.store.select(getEntitiesCurPage(ENTITY.TOPIC));

        this.searchControl.valueChanges.subscribe(text => {
            let p = Object.assign({}, this.searchParams, {query: text});
            this.store.dispatch(new EntityActions.Search({etype: ENTITY.TOPIC, data: p}));
        });
    }
}
