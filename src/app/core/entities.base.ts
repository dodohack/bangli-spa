/**
 * This is the base class of those pages which only load 1 type of entity
 * in single group.
 */
import {
    HostListener,
    OnInit, OnDestroy
} from '@angular/core';

import { ActivatedRoute, Router }  from '@angular/router';
import { DOCUMENT }        from '@angular/common';
import { Observable }      from 'rxjs/Rx';
import { Store }           from '@ngrx/store';

import { EntityParams }  from './models';

import { AppState } from '../core/reducers';

import * as EntityActions  from '../core/actions/entity';

import { getIsLoading, getEntitiesCurPage } from './reducers';

export abstract class EntitiesBase implements OnInit, OnDestroy
{
    subParams: any;
    subLoad: any;

    // For single gropued entities page, we only need a default key to
    // index EntitiesState
    key: string = 'default';

    // A copy of route.params
    params: any;

    // Entities query parameters for API request
    entityParams: EntityParams;

    // If the list of entities is loading from server
    isLoading$: Observable<boolean>;
    isLoading: boolean;

    // Object of entities indexed by key
    entities$: Observable<any>;

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected baseUrl: string,
                protected store: Store<AppState>,
                protected PARAMS: EntityParams,
                protected pageless: boolean = false) { }

    ngOnInit() {
        this.isLoading$ = this.store.select(getIsLoading(this.PARAMS.etype));
        this.entities$  = this.store.select(getEntitiesCurPage(this.PARAMS.etype));

        this.subLoad   = this.isLoading$.subscribe(i => this.isLoading = i);

        this.setupEntityParams();
        this.dispatchLoadEntities();
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
        this.subLoad.unsubscribe();
    }

    /**
     * Kick an action to load entities when URL changes.
     * TODO: Can we kick this action in entity effect since we can check
     * on NAVIGATION action
     */
    dispatchLoadEntities() {
        this.subParams = this.route.params.subscribe(params => {
            // Check if elements of url params change
            if (JSON.stringify(this.params) != JSON.stringify(params)) {
                this.updateEntityParams(params);

                if (this.pageless)
                    this.store.dispatch(new EntityActions.LoadEntitiesOnScroll(
                        {etype: this.PARAMS.etype, data: this.entityParams}));
                else
                    this.store.dispatch(new EntityActions.LoadEntities(
                        {etype: this.PARAMS.etype, data: this.entityParams}));
            }
        });
    }



    /**
     * Pageless loading
     * Load next page of entities when scroll to page bottom
     */
    /*
    @HostListener('window:scroll', [])
    loadEntitiesOnScroll() {
        console.error("Window scrolled");
        if (this.pageless && !this.isLoading &&
            (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(() => {
                if (this.isLoading) return;

                // Navigate to next page to trigger the load
                this.router.navigate([this.baseUrl, +this.params['page'] + 1]);
            }, 10);
        }
    }
    */

    get nextPage() { return +this.params['page'] + 1; }

    setupEntityParams() {
        this.entityParams = new EntityParams(
            this.PARAMS.key,
            this.PARAMS.etype,
            this.PARAMS.topic_type,
            this.PARAMS.topic_has_offer,
            this.PARAMS.topic_guid_starts,
            this.PARAMS.per_page,
            1 /* page */,
            this.PARAMS.category,
            this.PARAMS.topic,
            this.PARAMS.relations,
            this.PARAMS.order_by,
            this.PARAMS.order,
        );
    }

    updateEntityParams(params) {
        // Keep a copy of router params
        this.params = params;
        // Update current page number
        this.entityParams =
            Object.assign({}, this.entityParams, {page: +this.params['page']});
        // FIXME: We can't use this.entityParams.page = +this.params['page'].
    }
}
