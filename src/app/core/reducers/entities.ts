/**
 * Entity reducer
 */

//import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Observable } from 'rxjs/Observable';

import { Entity }        from '../models';
import { ENTITY }        from '../models';
import { Paginator }     from '../models';
import * as entity       from '../actions/entity';

//
// FIXME: We need to simplify EntitiesState!
// 1. Put key
//


export interface EntityFilter {
    key: string;
    params: [{key: string, value: string}];
    paginator: Paginator;
    ids: string[];
}

/*
export interface EntitiesState {
    keys: string[];
    efilters: { [key: string]: EntityFilter };

    ids: string[];
    entities: {[id: string]: Entity };

    // Current active entity id
    activeId: string | null;
}
*/

export interface EntitiesState {
    // Every entities query comes with a key
    keys: string[];

    //filters: {[key: string]: EntityFilter};

    params: {[key: string]: {pkey: string, pvalue: string}};

    // Ids with key as index
    ids: {[key: string]: string[]};

    paginators: {[key: string]: Paginator};

    // Ids with no key as index
    plainIds: string[];

    entities: {[id: string]: Entity};

    // Current active entity id
    activeId: string | null;
}


/*
export const adapter: EntityAdapter<Entity> = createEntityAdapter<Entity>({
    selectId: (entity: Entity) => entity.id,
    sortComparer: false
});
*/

/**
 * Initial state
 */
const initState: EntitiesState = { //adapter.getInitialState({
    keys: [],
    params: {},
    ids: {},
    paginators: {},
    plainIds: [],
    entities: {},
    activeId: null
}; //);


/**
 * Topic reducer
 */
export function topicReducer(state = initState,
                             action: entity.Actions): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.TOPIC)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Post reducer
 */
export function postReducer(state = initState,
                            action: entity.Actions): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.POST)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Page reducer
 */
export function pageReducer(state = initState,
                            action: entity.Actions): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.PAGE)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Offer reducer
 */
export function offerReducer(state = initState,
                             action: entity.Actions): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.OFFER)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Helper function to return the index type of entities
 * @param etype
 * @returns {any}
 */
function getIdx(etype: string)
{
    if (etype === ENTITY.TOPIC) return 'guid';
    else return 'id';
}

/**
 * A generic reducer for all entity types
 */
function entitiesReducer(etype: string,
                         state: EntitiesState,
                         action: entity.Actions): EntitiesState {

    switch (action.type)
    {
        case entity.LOAD_ENTITIES: {
            // TODO: Store key and query parameters
            console.log("TODO: Cache entities query paramerters with key");
            return state;
        }
        case entity.LOAD_GROUP_ENTITIES: {
            // TODO: Store key and query parameters
            console.log("TODO: Cache entities query paramerters with key");
            return state;
        }

        case entity.LOAD_ENTITIES_SUCCESS:
        {
            let key     = action.payload.data.key;
            let pager   = action.payload.data.paginator;
            let entities: Entity[] = action.payload.data.entities;

            let idx: string = getIdx(etype);

            // Extract entity ids and form new group of entities
            let ids         = entities.map(e => e[idx]);

            // Create an object of entities indexed by their id
            let newEntities = entities.reduce((entities, entity) =>
                Object.assign(entities, {[entity[idx]]: entity}), {});

            // Add new 'key' to keys
            let newKeys = state.keys.indexOf(key) == -1 ?
                [...state.keys, key] : state.keys;

            // Add new 'ids' to key indexed ids
            let newIds = ids;
            if (typeof state.ids[key] !== 'undefined')
                newIds = [...state.ids[key], ...ids].filter(
                    (elem, idx, self) => idx == self.indexOf(elem));

            // Add new 'ids' to plainIds
            let newPlainIds = [...state.plainIds, ...ids].filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            // Create a new state
            return Object.assign({}, state, {
                keys: newKeys,
                params: state.params,
                ids: Object.assign({}, state.ids, {[key]: newIds}),
                paginators: Object.assign({}, state.paginators, {[key]: pager}),
                plainIds: newPlainIds,
                entities: Object.assign({}, state.entities, newEntities)
            });
        }

        // Load individual entity, we don't put this entity in to the filters
        case entity.LOAD_ENTITY_SUCCESS:
        {
            let idx: string = getIdx(etype);
            let id: string = action.payload.data[idx];

            // Merge loaded entity into the top level id array
            // FIXME: We can't use state.ids.indexOf(id) due to TSC build error
            let newIds = [...state.plainIds, id].filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            return Object.assign({}, state, {
                plainIds: newIds,
                entities: Object.assign({}, state.entities,
                    {[id]: action.payload.data}),
                activeId: id,
            });
        }

        // DO NOT MISS THIS!
        default:
            return state;
    }

}

/*****************************************************************************
 * Helper functions
 *****************************************************************************/

/**
 * Get an entity by it's id
 */
/*
export function getEntity(eid: any) {
    return (state$: Observable<EntitiesState>) => state$
        .select(s => s.entities[eid]);
}
*/

/**
 * Get current loaded entity
 */
/*
export function getCurEntity() {
    return (state$: Observable<EntitiesState>) => state$
        .select(s => s.entities[s.id]);
}
*/

export const getCurID = (state: EntitiesState) => state.activeId;

export const getCurEntity =
    (state: EntitiesState) => state.activeId && state.entities[state.activeId];

export const getKeys = (state: EntitiesState) => state.keys;
export const getIds = (state: EntitiesState) => state.ids;
export const getParams = (state: EntitiesState) => state.params;
export const getPaginators = (state: EntitiesState) => state.paginators;
export const getPlainIds = (state: EntitiesState) => state.plainIds;
export const getEntities = (state: EntitiesState) => state.entities;

