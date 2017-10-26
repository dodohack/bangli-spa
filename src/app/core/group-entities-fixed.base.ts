/**
 * This is the base class of those pages which need to load multiple groups
 * of different type of entities, e.g home page.
 * No route.params.
 */
import { OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable }        from 'rxjs/Rx';
import { Store }             from '@ngrx/store';

//import { Channel }           from './models';
//import { Category }          from './models';
import { ENTITY, Entity, EntityParams } from './models';

import * as EntityActions    from './actions/entity';
import { IMG_SERVER, THUMBS } from "../../../.config";
import { AppState, getEntities }      from './reducers';

export abstract class GroupEntitiesBaseFixed implements OnInit
{
    // In page navigation, hash anchor
    //fragment$:   Observable<string>;

    isLoading$: Observable<boolean>;
    isLoading: boolean;

    offers$: Observable<any>;
    topics$: Observable<any>;
    posts$: Observable<any>;

    /**
     * @param route
     * @param store
     * @param router
     * @param groupKeys
     * @param groupParams - group of parameters to query group of entities
     * @param pageless - pageless loading for the last entity group
     */
    constructor(public route: ActivatedRoute,
                public store: Store<AppState>,
                public router: Router,
                public groupKeys: any,
                public groupParams: EntityParams[],
                public pageless: boolean = false) { }

    ngOnInit() {
        //this.fragment$ = this.route.fragment;
        this.offers$ = this.store.select(getEntities(ENTITY.OFFER));
        this.topics$ = this.store.select(getEntities(ENTITY.TOPIC));
        this.posts$  = this.store.select(getEntities(ENTITY.POST));

        // Kick the batch load
        this.batchLoadEntities();
    }

    /**
     * Kick batch load action when groupParams is not empty.
     */
    batchLoadEntities() {
        this.store.dispatch(new EntityActions.LoadGroupEntities(this.groupParams));
        // TODO: Kick more load when previous one finishes if there are too many groups
    }
}
