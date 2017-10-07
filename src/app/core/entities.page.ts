import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';
import { Observable }        from 'rxjs/Rx';
import { Store }             from '@ngrx/store';

//import { Channel }           from './models';
//import { Category }          from './models';
import { ENTITY, Entity }    from './models';
import * as fromEntities     from './reducers';

import * as EntityActions    from '../core/actions/entity';

export abstract class EntitiesBase implements OnInit, OnDestroy
{
    sub1: any;

    // In page navigation, hash anchor
    //fragment$:   Observable<string>;
    // Group entity load status
    //isComplete$: Observable<boolean>;

    constructor(protected route: ActivatedRoute,
                protected store: Store<fromEntities.AppState>,
                protected router: Router,
                protected groupParams: any) {
        //this.fragment$ = this.route.fragment;
        this.batchLoadEntities();
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
    }

    batchLoadEntities() {
        let gid = 0;
        // Load first group of grouped entities
        this.store.dispatch(new EntityActions.LoadGroupEntities(this.groupParams[gid++]));

        // Dispatch actions to load following groups
        /*
        this.sub1 = this.isComplete$.subscribe(() => {
           if (gid < this.groupParams.length)
               return this.store.dispatch(new EntityActions.LoadGroupEntities(this.groupParams[gid++]));
        });
        */
    }
}
