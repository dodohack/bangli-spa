/**
 * This is the base class of those pages which need to load multiple groups
 * of different type of entities, e.g channel, category page etc.
 * route.params is required to trigger the load.
 */
import { OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title }             from '@angular/platform-browser';
import { Observable }        from 'rxjs/Rx';
import { Store }             from '@ngrx/store';

//import { Channel }           from './models';
//import { Category }          from './models';
import { ENTITY, Paginator, Entity, EntityParams } from './models';

import * as EntityActions    from './actions/entity';
import {IMG_SERVER, THUMBS, SITE, CAT_NAMES} from "../../../.config";
import {
    AppState,
    getEntitiesCurPage,
    getIsLoading,
    getPaginators } from './reducers';


export abstract class GroupEntitiesBase implements OnInit, OnDestroy
{
    sub1: any;
    sub2: any;
    sub3: any;

    // A copy of route.params
    params: any;

    // In page navigation, hash anchor
    //fragment$:   Observable<string>;
    // Group entity load status
    //isComplete$: Observable<boolean>;

    // Used in pageless load for last group
    isLastGroupLoading$: Observable<boolean>;
    isLastGroupLoading: boolean;
    paginators$: Observable<{[key:string]:Paginator}>;
    paginators: {[key: string]: Paginator};

    offers$: Observable<any>;
    topics$: Observable<any>;
    posts$: Observable<any>;

    /**
     *
     * @param title
     * @param route
     * @param store
     * @param router
     * @param groupKeys
     * @param groupParams - group of parameters to query group of entities
     * @param pageless - pageless loading for the last entity group
     */
    constructor(public title: Title,
                public route: ActivatedRoute,
                public store: Store<AppState>,
                public router: Router,
                public groupKeys: any,
                public groupParams: EntityParams[],
                public pageless: boolean = false) { }

    ngOnInit() {
        //this.fragment$ = this.route.fragment;
        this.offers$ = this.store.select(getEntitiesCurPage(ENTITY.OFFER));
        this.topics$ = this.store.select(getEntitiesCurPage(ENTITY.TOPIC));
        this.posts$  = this.store.select(getEntitiesCurPage(ENTITY.POST));

        let etype = this.groupParams[this.groupParams.length - 1].etype;
        this.isLastGroupLoading$ = this.store.select(getIsLoading(etype));
        this.paginators$ = this.store.select(getPaginators(etype));

        this.sub2 = this.isLastGroupLoading$.subscribe(i => this.isLastGroupLoading = i);
        this.sub3 = this.paginators$.subscribe(p => this.paginators = Object.assign({}, p));

        // Kick the batch load
        this.batchLoadEntities();
    }

    ngOnDestroy() {
        //this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
    }

    /**
     * Kick batch load action when groupParams is not empty.
     */
    batchLoadEntities() {
        this.sub1 = this.route.params.subscribe(params => {
            // Check if elements of url change
            if (JSON.stringify(this.params) != JSON.stringify(params)) {
                //this.cleanupCache(params);

                // Update last group parameters and keep a copy of route.params
                let gps = this.updateLastGroupParams(params);

                this.title.setTitle(CAT_NAMES[params['slug']] + ' - ' + SITE.NAME);

                // Load all grouped entities when this is page number 1
                if (typeof params['page'] === 'undefined' || params['page'] == 1) {
                    this.store.dispatch(new EntityActions.LoadGroupEntities(gps));
                }

            }
        });
    }


    /**
     * Pageless loading
     * Load next page of entities when scroll to page bottom
     */
    @HostListener('window:scroll', [])
    loadEntitiesOnScroll() {
        if (this.pageless && !this.isLastGroupLoading &&
            !this.isLastGroupLastPage &&
            (window.innerHeight *1.2 + window.scrollY) >= document.body.offsetHeight) {

            // Update query parameter to next page for last group
            let lastIdx = this.groupParams.length - 1;
            this.groupParams[lastIdx] = Object.assign({}, this.groupParams[lastIdx],
                {page: this.groupParams[lastIdx].page + 1});

            // Dispatch load action
            this.store.dispatch(new EntityActions.LoadEntitiesOnScroll(
                {etype: this.groupParams[lastIdx].etype, data: this.groupParams[lastIdx]}));
        }
    }

    /**
     * FIXME: We couldn't rewrite this.groupParams which causes errors.
     * Update grouped entities query parameters based on url parameters
     * @param params - url parameters, contains current :page and cat :slug
     */
    updateLastGroupParams(params) {
        // Keep a copy of route.params
        this.params = params;

        //console.error("Updated localParams: ", this.localParams);

        let newGPS: EntityParams[] = [];
        let idx = this.groupParams.length - 1;

        // Update category.slug of all group params
        if (this.params['slug']) {
            for(let i = 0; i <= idx; i++)
                newGPS[i] = Object.assign({}, this.groupParams[i], {
                    category: this.params['slug']
                });
        }

        // FIXME: We always assume params['slug'] is category.slug
        // Add category of the query to groupParams
        if (this.params['page']) {
            newGPS[idx] = Object.assign({}, newGPS[idx], {
                page: +this.params['page']
            });
        }

        return newGPS;
    }

    /**
     * If we category.slug is changed, we will clean the entities cache
     * @param params
     */
    /*
    cleanupCache(params) {
        if (this.params && params['slug'] != this.params['slug'])
            this.store.dispatch(new EntityActions.CleanCache());
    }
    */

    /**
     * Check if it is the last page of current group entity
     * @param key
     * @returns {boolean}
     */
    isLastPage(key: string) {
        if (!this.paginators) return true;
        if (!this.paginators.hasOwnProperty(key)) return true;

        // last_page can be 0 if empty entities is loaded
        return this.paginators[key].cur_page >= this.paginators[key].last_page;
    }

    get lastGroupKey() {
        return this.groupParams[this.groupParams.length - 1].key;
    }

    /**
     * If the last group of entities reaches last page
     * @returns boolean
     */
    get isLastGroupLastPage () {
        return this.isLastPage(this.lastGroupKey);
    }

    get nextPage() {
        let next = 2;
        if (this.params['page']) next = +this.params['page'] + 1;
        return next;
    }
}
