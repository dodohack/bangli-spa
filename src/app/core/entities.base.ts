/**
 * This is the base class of those pages which only load 1 type of entity
 * in single group.
 */
import {
    HostListener,
    OnInit, OnDestroy
} from '@angular/core';

import { ActivatedRoute, Router }    from '@angular/router';
import { Observable }      from 'rxjs/Rx';
import { Store }           from '@ngrx/store';

import {
    ENTITY,
    Entity,
    ENTITY_INFO,
    EntityParams
}  from './models';

import * as fromEntities   from './reducers';
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

    entities: Observable<Entity[]>;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected router: Router,
                protected baseUrl: string,
                protected store: Store<fromEntities.AppState>,
                protected pageless: boolean = false) { }

    ngOnInit() {
        this.isLoading$ = this.store.select(getIsLoading(this.etype));
        this.entities   = this.store.select(getEntitiesCurPage(this.etype));

        this.subLoad   = this.isLoading$.subscribe(i => this.isLoading = i);

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
                this.setupEntityParams(params);
                if (this.pageless)
                    this.store.dispatch(new EntityActions.LoadEntitiesOnScroll(
                        {etype: this.etype, data: this.entityParams}));
                else
                    this.store.dispatch(new EntityActions.LoadEntities(
                        {etype: this.etype, data: this.entityParams}));
            }
        });
    }



    /**
     * Pageless loading
     * Load next page of entities when scroll to page bottom
     */
    @HostListener('window:scroll')
    loadEntitiesOnScroll() {
        if (this.pageless && !this.isLoading &&
            (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(() => {
                if (this.isLoading) return;

                // Navigate to next page to trigger the load
                this.router.navigate([this.baseUrl, +this.params['page'] + 1]);
            }, 10);
        }
    }

    setupEntityParams(params) {
        this.params = params;

        this.entityParams = new EntityParams(
            this.key,
            this.etype,
            20/*per_page*/,
            +this.params['page'],
            this.params['category'],
            null,
            null
        );
    }
}