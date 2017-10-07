/**
 * Ref: https://github.com/ngrx/platform/blob/master/example-app/app/reducers/index.ts
 */

import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { Observable }  from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

// Debug tools
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';

import { RouterStateUrl } from '../utils';
import * as fromEntities  from './entities';
import { EntitiesState }  from './entities';
import {ENTITY_INFO, ENTITY}      from "../models/entity";

import {
    topicReducer,
    postReducer,
    pageReducer,
    offerReducer,
} from './entities';



export interface AppState {
    topics: EntitiesState;
    posts:  EntitiesState;
    offers: EntitiesState;
    pages: EntitiesState;
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
};

export const reducers: ActionReducerMap<AppState> = {
    topics: topicReducer,
    posts:  postReducer,
    offers: offerReducer,
    pages: pageReducer,
    routerReducer: fromRouter.routerReducer,
};

// Console.log all actions

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return storeLogger()(reducer);
}


/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of
 * meta-reducers that will be composed to from the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger, storeFreeze]
    : [];



/*****************************************************************************
 * Entities - must be called with entity type
 *****************************************************************************/

// TODO: Read https://github.com/reactjs/reselect/blob/master/README.md#q-how-do-i-create-a-selector-that-takes-an-argument
// TODO: https://stackoverflow.com/questions/45108947/selectors-for-multiple-instance-of-ngrx-reducers

export const getTopicsState = (state: AppState) => state.topics;
export const getOffersState = (state: AppState) => state.offers;
export const getPostsState  = (state: AppState) => state.posts;
export const getPagesState  = (state: AppState) => state.pages;

export const getCurTopicId = createSelector(
    getTopicsState,
    fromEntities.getCurID
);

export const getCurOfferId = createSelector(
    getOffersState,
    fromEntities.getCurID
);

export const getCurPostId = createSelector(
    getPostsState,
    fromEntities.getCurID
);



export const getTopicIds = createSelector(getTopicsState, fromEntities.getIds);
export const getOfferIds = createSelector(getOffersState, fromEntities.getIds);
export const getPostIds = createSelector(getPostsState, fromEntities.getIds);
export const getPageIds = createSelector(getPagesState, fromEntities.getIds);

export const getTopicFilters = createSelector(getTopicsState, fromEntities.getFilters);
export const getOfferFilters = createSelector(getOffersState, fromEntities.getFilters);
export const getPostFilters = createSelector(getPostsState, fromEntities.getFilters);
export const getPageFilters = createSelector(getPagesState, fromEntities.getFilters);

export const getTopicEntities = createSelector(getTopicsState, fromEntities.getEntities);
export const getOfferEntities = createSelector(getOffersState, fromEntities.getEntities);
export const getPostEntities = createSelector(getPostsState, fromEntities.getEntities);
export const getPageEntities = createSelector(getPagesState, fromEntities.getEntities);

export const getOffersByKey = (key: string) => createSelector(createFeatureSelector(key), getOfferEntities, getOfferFilters);

export function getEntitiesByKey(etype: string, key: string) {
    let ids: any;
    let entities: any;
    switch(etype) {
        case ENTITY.TOPIC:
            ids = getTopicFilters[key];
            entities = getTopicEntities;
            break;
        case ENTITY.OFFER:
            ids = getOfferFilters[key];
            entities = getOfferEntities;
            break;
        case ENTITY.POST:
            ids = getPostFilters[key];
            entities = getOfferEntities;
            break;
        case ENTITY.PAGE:
            ids = getPageFilters[key];
            entities = getPageEntities;
            break;
        default:
            console.error("REDUCER EXCEPTION!");
    }

    // FIXME: This factory should return a selector!!!
    return ids.map(id => entities[id]);
}


export const getCurTopic = createSelector(
    getTopicEntities,
    getCurTopicId,
    (entities, id) => { return id && entities[id]; }
);

export const getCurOffer = createSelector(
    getOfferEntities,
    getCurOfferId,
    (entities, id) => { return id && entities[id]; }
);

export const getCurPost = createSelector(
    getPostEntities,
    getCurPostId,
    (entities, id) => { return id && entities[id]; }
);
