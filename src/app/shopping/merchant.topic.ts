import { Component }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Title }             from '@angular/platform-browser';
import { Store }             from '@ngrx/store';


import { AppState }          from '../core/reducers';
import { EntityBase }        from '../core';
import { ENTITY }            from '../core/models';

@Component({
    templateUrl: './merchant.topic.html',
})
export class MerchantTopic extends EntityBase
{
    // Variables used in template only
    isGeneralTopic: boolean;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected title: Title) {
        super(ENTITY.TOPIC, route, store, title);
    }
}
