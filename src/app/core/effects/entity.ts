/**
 * Side effects of entity
 */

import { Action }           from '@ngrx/store';
import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Rx';
import { Effect, Actions, toPayload }  from '@ngrx/effects';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import { API }                   from '../api';
import { ENTITY, EntityParams }  from '../models';
import * as EntityActions        from '../actions/entity';

@Injectable()
export class EntityEffects {

    constructor (private actions$: Actions,
                 private http: Http) {}

    get headers() {
        return new Headers({'Content-Type': 'application/json'});
    }

    /************************************************************************
     * Entity
     ************************************************************************/

    /**
     * Search entities by given etype and search text
     * We only support single group of entities currently, will support multi
     * in second phase.
     */
    @Effect() search$: Observable<Action> =
        this.actions$.ofType(EntityActions.SEARCH)
            .switchMap((action: EntityActions.Search) =>
                this.getEntities(action.payload.etype, action.payload.data)
                    .map(ret => new EntityActions.SearchSuccess({etype: ret.etype, data: ret}))
                    .catch(() => Observable.of(new EntityActions.SearchFail()))
            );

    /**
     * Load group of entities with same entity type
     */
    @Effect() loadEntities$: Observable<Action> =
        this.actions$.ofType(EntityActions.LOAD_ENTITIES)
            .switchMap((action: EntityActions.LoadEntities) =>
                    this.getEntities(action.payload.etype, action.payload.data)
                    .map(ret => new EntityActions.LoadEntitiesSuccess({etype: ret.etype, data: ret}))
                    .catch(() => Observable.of(new EntityActions.LoadEntitiesFail()))
            );

    /**
     * Load group of entities with same entity type with pageless style
     */
    @Effect() loadEntitiesScroll$: Observable<Action> =
        this.actions$.ofType(EntityActions.LOAD_ENTITIES_ON_SCROLL)
            .switchMap((action: EntityActions.LoadEntitiesOnScroll) =>
                this.getEntities(action.payload.etype, action.payload.data)
                    .map(ret => new EntityActions.LoadEntitiesOnScrollSuccess({etype: ret.etype, data: ret}))
                    .catch(() => Observable.of(new EntityActions.LoadEntitiesOnScrollFail()))
            );


    /**
     * Load multiple group of entities, dispatch N actions for N groups when success.
     */
    @Effect() loadGroupEntities$ = this.actions$.ofType(EntityActions.LOAD_GROUP_ENTITIES)
        .switchMap((action: EntityActions.LoadGroupEntities) =>
            this.getGroupEntities(action.payload)
            .mergeMap(ret => {
                let actions: Action[] = [];
                let i = 0;
                for(i; i < ret.length; i++)
                    actions[i] = new EntityActions.LoadEntitiesSuccess({etype: ret[i].etype, data: ret[i]});
                // This last action is just an indicator of the finish state
                // actions[i] = AlertActions.loadCompleted();
                return actions;
            })
            .catch(() => Observable.of(new EntityActions.LoadEntitiesFail()))
        );

    /**
     * Load single entity
     */
    @Effect() loadEntity$: Observable<Action> =
        this.actions$.ofType(EntityActions.LOAD_ENTITY)
            .switchMap((action: EntityActions.LoadEntity) =>
                this.getEntity(action.payload.etype, action.payload.data)
                    .filter(ret => ret.data != null)
                    .map(ret => new EntityActions.LoadEntitySuccess({etype: ret.etype, data: ret.data}))
                    /*
                    .mergeMap(ret => {
                        let actions: Action[] = [];
                        actions[0] = new EntityActions.LoadEntitySuccess({etype: ret.etype, data: ret.entity});
                        // The second action is just an indicator of the finish status
                        //action[1] = AlertActions.loadCompleted();
                        return Observable.from(actions);
                    })
                    */
                    .catch(() => Observable.of(new EntityActions.LoadEntityFail()))
            );


    // TODO: Ref https://github.com/vsavkin/state_management_ngrx4/blob/master/clientapp/src/app/model.ts
    /*
    @Effect() navToEntity$ =
        this.actions$.ofType(ROUTER_NAVIGATION)
            .map(this.firstSegment)
            //.filter(s => s.urlseg[0].path == 'deal')
            .map(s => {
                console.log("PAYLOAD OF ROUTER_NAVIGATION: ", s);
                return new EntityActions.LoadEntity({etype: 'topic', data: 'vitabiotics' });
            });
    */

    /************************************************************************
     * Helper functions
     ************************************************************************/

    /*
    private firstSegment(r: RouterNavigationAction) {
        return r.payload.routerState.root.firstChild;
    }
    */

    /**
     * Get API base by given entity type
     */
    private getApi(t: string, group = false) {
        switch (t) {
            case ENTITY.TOPIC:
                return API('topics');
            case ENTITY.POST:
                return API('posts');
            case ENTITY.OFFER:
                return API('offers');
            case ENTITY.PAGE:
                return API('pages');
            case ENTITY.ADVERTISE:
                return API('advertises');
            case ENTITY.COMMENT:
                return API('comments');
            default:
                return null;
        }
    }

    /**
     * Generalized function to convert EntityParams object into API get
     * parameters.
     * @param e
     * @param delimiter - ';' for multiple group entities, '&' for single group entities
     * @returns {string}
     */
    params2String(e: EntityParams, delimiter: string) {
        let s = '';

        for (let key in e) {
            if (e.hasOwnProperty(key)) {
                if (Array.isArray(e[key]))
                    s += key + '=' + e[key].toString() + delimiter;
                else if (e[key] !== '' && e[key] !== null)
                    s += key + '=' + e[key] + delimiter;
            }
        }

        // Return the string with last delimiter trimmed
        return s.substring(0, s.length-1);
    }

    /**
     * Convert an array of entities filters into a url string.
     * Multi group entity version
     */
    private buildMultiGroupFilters(filterGroups: EntityParams[]): string {
        let ret = '[';
        let length = filterGroups.length;
        for(let i = 0; i < length; i++) {
            ret += '{"params":"' + this.params2String(filterGroups[i], ';') + '"}';
            if (i + 1 != length) ret += ',';
        }
        ret += ']';
        return ret;
    }

    /************************************************************************
     * Network functions
     ************************************************************************/

    /**
     * Request a entity from API server
     */
    protected getEntity(etype: string, id: string): Observable<any> {
        let api = this.getApi(etype, false) + '/' + id + '?etype=' + etype;
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Request a group of entities with the same entity type from API server
     */
    protected getEntities(etype: string, filters: any): Observable<any> {
        // FIXME: We have double 'etype' in this api request for non grouped
        // requested.
        let api = this.getApi(etype, false)
            + '?etype=' + etype + '&' + this.params2String(filters, '&');

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Get multiple group of entities, return multiple group of entities
     *
     * URL pattern:
     * ?group=[{"params": "key=<string>;etype=<etypt>;..."}, {...}, ...]
     *
     * E.g:
     * ?group=[{"params": "key=latest_post;etype=cms-post;channel=shopping;per_page=6"},
     *         {"params": "key=featured_deal;etype=deal-topic;channel=shopping;per_page=10;type=brand;order_by=ranking;order=desc"}
     *        ]
     *
     * Any parameters used in common entities queries can be used in the group
     * query.
     */
    protected getGroupEntities(paramGroups: EntityParams[]): Observable<any> {
        let api = API('batch') + '?group=' + this.buildMultiGroupFilters(paramGroups);
        return this.http.get(api).map(res => res.json());
    }

}