/**
 * Entity reducer
 */

import { Entity }        from '../models';
import { ENTITY }        from '../models';
import { Paginator }     from '../models';
import * as entity       from '../actions/entity';

export interface EntitiesState {
    // Every entities query comes with a key
    keys: string[];

    params: {[key: string]: {pkey: string, pvalue: string}};

    // IDs with key as index
    ids: {[key: string]: string[]};

    // IDs of current page entities
    idsCurPage: {[key: string]: string[]};

    paginators: {[key: string]: Paginator};

    // all IDs with no key as index
    plainIds: string[];

    entities: {[id: string]: Entity};

    // Current active entity id
    activeId: string | null;

    // If the entity/entities is currently loading from server
    isLoading: boolean;
}

/**
 * Initial state
 */
const initState: EntitiesState = {
    keys: [],
    params: {},
    ids: {},
    idsCurPage: {},
    paginators: {},
    plainIds: [],
    entities: {},
    activeId: null,
    isLoading: false,
};


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
 * Advertise reducer
 */
export function advertiseReducer(state = initState,
                             action: entity.Actions): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.ADVERTISE)
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
        case entity.SEARCH:
        case entity.LOAD_ENTITY:
        case entity.LOAD_ENTITIES:
        case entity.LOAD_ENTITIES_ON_SCROLL: {
            // TODO: Store key and query parameters
            console.log("TODO: Cache entities query paramerters with key");
            return Object.assign({}, state, {isLoading: true});
        }

        // NOTE: This case will never be triggered.
        /*
        case entity.LOAD_GROUP_ENTITIES: {
            console.log("TODO: Cache entities query paramerters with key");
            return Object.assign({}, state, {isLoading: true});
        }
        */

        case entity.SEARCH_SUCCESS:
        case entity.LOAD_ENTITIES_SUCCESS:
        case entity.LOAD_ENTITIES_ON_SCROLL_SUCCESS:
        {
            let key     = action.payload.data.key;
            let pager   = action.payload.data.paginator;
            let entities: Entity[] = action.payload.data.entities;

            if (!entities || !entities.length)
                return state;

            let idx: string = getIdx(etype);

            // Extract entity ids and form new group of entities
            let ids         = entities.map(e => e[idx]);
            let idsCurPage  = ids;

            // Add new 'key' to keys
            let newKeys = state.keys.indexOf(key) == -1 ?
                [...state.keys, key] : state.keys;

            if (action.type == entity.LOAD_ENTITIES_ON_SCROLL_SUCCESS) {
                if (!idsCurPage.length)
                    return Object.assign({}, state, {
                        keys: newKeys,
                        isLoading: false
                    });

                // Merge idsCurPage with previously loaded ones
                if (typeof state.idsCurPage[key] !== 'undefined')
                    idsCurPage = [...state.idsCurPage[key], ...idsCurPage].filter(
                        (elem, idx, self) => idx == self.indexOf(elem));
            } else {
                if (!idsCurPage.length)
                    return Object.assign({}, state, {
                        keys: newKeys,
                        idsCurPage: Object.assign({}, state.idsCurPage, {[key]: []}),
                        paginators: Object.assign({}, state.paginators, {[key]: pager}),
                        isLoading: false
                    });
            }

            // Create an object of entities indexed by their id
            let newEntities = entities.reduce((entities, entity) =>
                Object.assign(entities, {[entity[idx]]: entity}), {});

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
                idsCurPage: Object.assign({}, state.idsCurPage, {[key]: idsCurPage}),
                paginators: Object.assign({}, state.paginators, {[key]: pager}),
                plainIds: newPlainIds,
                entities: Object.assign({}, state.entities, newEntities),
                isLoading: false
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

        case entity.CLEAN_CACHE:
        {
            return Object.assign({}, state, {
                params: {},
                ids: {},
                idsCurPage: {},
                paginators: {},
                activeId: null,
                isLoading: false
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
export const getIdsCurPage = (state: EntitiesState) => state.idsCurPage;
export const getParams = (state: EntitiesState) => state.params;
export const getPaginators = (state: EntitiesState) => state.paginators;
export const getPlainIds = (state: EntitiesState) => state.plainIds;
export const getEntities = (state: EntitiesState) => state.entities;
export const getIsLoading = (state: EntitiesState) => state.isLoading;
