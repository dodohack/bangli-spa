import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import * as fromEntities from '../core/reducers';
import * as entity       from '../core/actions/entity';
import { ENTITY, Entity } from "../core/models";
import { EntityBase }    from '../core/entity.base';

//
// FIXME: Actually We could use MerchantTopic as OfferTopic!!
//
@Component({
    selector: '',
    templateUrl: './offer.topic.html'
})
export class OfferTopic extends EntityBase // implements OnInit
{
    //topic$: Observable<Entity>;

    constructor(protected route: ActivatedRoute,
                protected store: Store<fromEntities.AppState>) {
        super(ENTITY.TOPIC, route, store);
        //this.topic$ = store.select(fromEntities.getCurTopic);
    }

    /*
    ngOnInit() {
        let payload = {etype: 'topic', data: 'lookfantastic-uk'};
        this.store.dispatch(new entity.LoadEntity(payload));
    }
    */
}
