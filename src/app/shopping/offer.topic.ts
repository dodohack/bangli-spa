import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { environment }   from '../../environments/environment';
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
class _OfferTopic extends EntityBase // implements OnInit
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<fromEntities.AppState>) {
        super(ENTITY.TOPIC, route, store);
    }
}

@Component({
    selector: '',
    templateUrl: './offer.topic.m.html'
})
class _OfferTopicM extends EntityBase // implements OnInit
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<fromEntities.AppState>) {
        super(ENTITY.TOPIC, route, store);
    }
}

export const OfferTopic = environment.mobile ? _OfferTopicM : _OfferTopic;
