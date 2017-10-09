/**
 * This is the base class of those pages which need to load multiple groups
 * of different type of entities.
 */
import { OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router }    from '@angular/router';
import { Observable }        from 'rxjs/Rx';
import { Store }             from '@ngrx/store';

//import { Channel }           from './models';
//import { Category }          from './models';
import { ENTITY, Entity }    from './models';
import * as fromEntities     from './reducers';

import * as EntityActions    from '../core/actions/entity';

import { getEntities }      from './reducers';

export abstract class GroupEntitiesBase implements OnInit, OnDestroy
{
    sub1: any;

    isLoading$: Observable<boolean>;
    // In page navigation, hash anchor
    //fragment$:   Observable<string>;
    // Group entity load status
    //isComplete$: Observable<boolean>;
    offers$: Observable<any>;
    topics$: Observable<any>;
    posts$: Observable<any>;

    constructor(protected route: ActivatedRoute,
                protected store: Store<fromEntities.AppState>,
                protected router: Router,
                protected groupKeys: any = null,
                protected groupParams: any = null,
                protected pageless: boolean = false) { }

    ngOnInit() {
        //this.fragment$ = this.route.fragment;
        this.offers$ = this.store.select(getEntities(ENTITY.OFFER));
        this.topics$ = this.store.select(getEntities(ENTITY.TOPIC));
        this.posts$  = this.store.select(getEntities(ENTITY.POST));

        this.isLoading$ =

        // Kick the batch load
        this.batchLoadEntities();
    }

    ngOnDestroy() {
        //this.sub1.unsubscribe();
    }

    /**
     * Kick batch load action when groupParams is not empty.
     */
    batchLoadEntities() {
        let gid = 0;
        // Load first group of grouped entities
        if (this.groupParams.length) {
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

}
