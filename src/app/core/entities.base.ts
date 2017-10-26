/**
 * This is the base class of those pages which only load 1 type of entity
 * in single group.
 */
import {
    HostListener,
    OnInit, OnDestroy
} from '@angular/core';

import { ActivatedRoute, Router }  from '@angular/router';
import { Observable }      from 'rxjs/Rx';
import { Store }           from '@ngrx/store';

import { EntityParams, Paginator }  from './models';
import * as EntityActions  from '../core/actions/entity';
import { AppState } from './reducers';
import { getIsLoading, getEntitiesCurPage, getPaginators } from './reducers';

export abstract class EntitiesBase implements OnInit, OnDestroy
{
    subParams: any;
    subLoad: any;
    subPager: any;

    // For single gropued entities page, we only need a default key to
    // index EntitiesState
    key: string = 'default';

    // A copy of route.params
    params: any;

    // If the list of entities is loading from server
    isLoading$: Observable<boolean>;
    isLoading: boolean;

    paginators$: Observable<{[key: string]: Paginator}>;
    paginator: Paginator;

    // Object of entities indexed by key
    entities$: Observable<any>;

    fragment$: Observable<string>;

    constructor(public route: ActivatedRoute,
                public router: Router,
                public baseUrl: string,
                public store: Store<AppState>,
                public entityParams: EntityParams,
                public pageless: boolean = false) { }

    ngOnInit() {
        this.isLoading$  = this.store.select(getIsLoading(this.entityParams.etype));
        this.entities$   = this.store.select(getEntitiesCurPage(this.entityParams.etype));
        this.paginators$ = this.store.select(getPaginators(this.entityParams.etype));

        this.subLoad   = this.isLoading$.subscribe(i => this.isLoading = i);
        this.subPager  = this.paginators$.subscribe(p => this.paginator =
            Object.assign({}, p[this.key]));

        this.dispatchLoadEntities();
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
        this.subLoad.unsubscribe();
        this.subPager.unsubscribe();
    }

    /**
     * Kick an action to load entities when URL changes.
     * TODO: Can we kick this action in entity effect since we can use
     * TODO: ROUTER_NAVIGATION action
     */
    dispatchLoadEntities() {
        this.fragment$ = this.route.fragment;

        this.subParams = this.route.params.subscribe(params => {
            // Check if elements of url params change
            if (JSON.stringify(this.params) != JSON.stringify(params)) {
                this.updateEntityParams(params);

                // For first page entity, always clean up the idsCurPage.

                if (this.pageless && params['page'] > 1)
                    this.store.dispatch(new EntityActions.LoadEntitiesOnScroll(
                        {etype: this.entityParams.etype, data: this.entityParams}));
                else

                    this.store.dispatch(new EntityActions.LoadEntities(
                        {etype: this.entityParams.etype, data: this.entityParams}));
            }
        });
    }

    /**
     * Pageless loading
     * Load next page of entities when scroll to page bottom
     */
    @HostListener('window:scroll', [])
    loadEntitiesOnScroll() {
        if (this.pageless && !this.isLoading && !this.isLastPage &&
            (window.innerHeight * 1.2 + window.scrollY) >= document.body.offsetHeight) {
            // Navigate to next page to trigger the load
            this.router.navigate([this.nextPage]);
        }
    }

    get nextPage() {
        let np: number = +this.params['page'] + 1;
        return this.baseUrl + this.params['filter'] + '/' + np;
    }

    get isLastPage() {
        if (!this.paginator) return true;

        if (this.paginator.cur_page == this.paginator.last_page)
            return true;
        return false;
    }

    updateEntityParams(params) {
        // Keep a copy of route.params
        this.params = params;

        // TODO: Extract 'featured' from this.params['filter'].
        // FIXME: We can't use this.entityParams.page = +this.params['page'].

        if (this.params['filter'] && this.params['filter'].length == 1)
            // Update page number and filter
            this.entityParams = Object.assign({}, this.entityParams, {
                page: +this.params['page'],
                topic_guid_starts: this.params['filter'].toLowerCase()
            });
        else
            // Update current page number
            this.entityParams = Object.assign({}, this.entityParams, {
                page: +this.params['page'],
                topic_guid_starts: ''
            });
    }
}
