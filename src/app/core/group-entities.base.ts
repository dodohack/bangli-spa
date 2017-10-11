/**
 * This is the base class of those pages which need to load multiple groups
 * of different type of entities, e.g channel, category page etc.
 * route.params is required to trigger the load.
 */
import { OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router }    from '@angular/router';
import { Observable }        from 'rxjs/Rx';
import { Store }             from '@ngrx/store';

//import { Channel }           from './models';
//import { Category }          from './models';
import { ENTITY, Paginator, EntityParams } from './models';

import * as EntityActions    from './actions/entity';

import { AppState, getEntities, getIsLoading } from './reducers';

export abstract class GroupEntitiesBase implements OnInit, OnDestroy
{
    sub1: any;
    sub2: any;

    // A copy of route.params
    params: any;

    // In page navigation, hash anchor
    //fragment$:   Observable<string>;
    // Group entity load status
    //isComplete$: Observable<boolean>;

    // Used in pageless load for last group
    isLastGroupLoading$: Observable<boolean>;
    isLastGroupLoading: boolean;

    offers$: Observable<any>;
    topics$: Observable<any>;
    posts$: Observable<any>;

    /**
     *
     * @param route
     * @param store
     * @param router
     * @param groupKeys
     * @param groupParams - group of parameters to query group of entities
     * @param pageless - pageless loading for the last entity group
     */
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router,
                protected groupKeys: any,
                protected groupParams: EntityParams[],
                protected pageless: boolean = false) { }

    ngOnInit() {
        //this.fragment$ = this.route.fragment;
        this.offers$ = this.store.select(getEntities(ENTITY.OFFER));
        this.topics$ = this.store.select(getEntities(ENTITY.TOPIC));
        this.posts$  = this.store.select(getEntities(ENTITY.POST));

        this.isLastGroupLoading$ = this.store.select(
            getIsLoading(this.groupParams[this.groupParams.length - 1].etype));

        this.sub2    = this.isLastGroupLoading$.subscribe(i => this.isLastGroupLoading = i);

        // Kick the batch load
        this.batchLoadEntities();
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
    }

    /**
     * Kick batch load action when groupParams is not empty.
     */
    batchLoadEntities() {
        this.sub1 = this.route.params.subscribe(params => {
            // Check if elements of url change
            if (JSON.stringify(this.params) != JSON.stringify(params)) {

                // Update last group parameters and keep a copy of route.params
                this.updateLastGroupParams(params);

                let page = this.params['page'];

                // Load all grouped entities when this is page number 1
                if (!page || page == 1)
                    this.store.dispatch(new EntityActions.LoadGroupEntities(this.groupParams));

                // Do pageless load when we are not loading page number 1.
                // For some pages, we support pageless load,say category page.
                // When we doipageless load, only the last group of the entities
                // will be loaded as pageless.
                if (this.pageless && page && page > 1) {
                    let lastGroup = this.groupParams[this.groupParams.length - 1];
                    this.store.dispatch(new EntityActions.LoadEntitiesOnScroll(
                        {etype: lastGroup.etype, data: lastGroup}));
                }
            }
        });
    }

    /**
     * Update grouped entities query parameters based on url parameters
     * @param params - url parameters, contains current :page and cat :slug
     */
    updateLastGroupParams(params) {
        // Keep a copy of route.params
        this.params = params;

        let idx = this.groupParams.length - 1;

        // Add category of the query to groupParams
        if (this.params['slug'] && this.params['page']) {

            this.groupParams[idx] = Object.assign({}, this.groupParams[idx], {
                page: +this.params['page'],
                slug: this.params['slug']
            });
        } else if (this.params['slug']) {
            this.groupParams[idx] = Object.assign({}, this.groupParams[idx], {
                slug: this.params['slug']
            });

        } else if (this.params['page']) {
            this.groupParams[idx] = Object.assign({}, this.groupParams[idx], {
                page: +this.params['page'],
            });
        }
    }

    isLastPage(paginator: Paginator) {
        if (!paginator) return true;

        if (paginator.cur_page == paginator.last_page)
            return true;
        return false;
    }
}
