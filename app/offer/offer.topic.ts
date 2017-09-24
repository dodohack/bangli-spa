import { Component, OnInit } from '@angular/core';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import * as fromEntities from '../core/reducers';
import * as entity       from '../core/actions/entity';
import { Entity } from "../core/models";

@Component({
    selector: '',
    templateUrl: './offer.topic.html'
})
export class OfferTopic implements OnInit
{
    topic$: Observable<Entity>;

    constructor(private store: Store<fromEntities.AppState>) {
        this.topic$ = store.select(fromEntities.getCurTopic);
    }

    ngOnInit() {
        let payload = {etype: 'topic', data: 'lookfantastic-uk'};
        this.store.dispatch(new entity.LoadEntity(payload));
    }
}
