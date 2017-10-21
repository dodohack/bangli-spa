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
    advertiseReducer,
} from './entities';

export interface AppState {
    topics: EntitiesState;
    posts:  EntitiesState;
    offers: EntitiesState;
    pages: EntitiesState;
    advertises: EntitiesState;
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
};

export const reducers: ActionReducerMap<AppState> = {
    topics: topicReducer,
    posts:  postReducer,
    offers: offerReducer,
    pages: pageReducer,
    advertises: advertiseReducer,
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
export const getAdvertisesState  = (state: AppState) => state.advertises;

export const getCurTopicId = createSelector(getTopicsState,fromEntities.getCurID);
export const getCurOfferId = createSelector(getOffersState,fromEntities.getCurID);
export const getCurPostId  = createSelector(getPostsState,fromEntities.getCurID);
export const getCurPageId  = createSelector(getPagesState,fromEntities.getCurID);
export const getCurAdvertiseId = createSelector(getAdvertisesState,fromEntities.getCurID);

export const getTopicIds = createSelector(getTopicsState, fromEntities.getIds);
export const getOfferIds = createSelector(getOffersState, fromEntities.getIds);
export const getPostIds  = createSelector(getPostsState, fromEntities.getIds);
export const getPageIds  = createSelector(getPagesState, fromEntities.getIds);
export const getAdvertiseIds = createSelector(getAdvertisesState, fromEntities.getIds);

export const getTopicIdsCurPage = createSelector(getTopicsState, fromEntities.getIdsCurPage);
export const getOfferIdsCurPage = createSelector(getOffersState, fromEntities.getIdsCurPage);
export const getPostIdsCurPage  = createSelector(getPostsState, fromEntities.getIdsCurPage);
export const getPageIdsCurPage  = createSelector(getPagesState, fromEntities.getIdsCurPage);
export const getAdvertiseIdsCurPage = createSelector(getAdvertisesState, fromEntities.getIdsCurPage);

export const getTopicPaginators = createSelector(getTopicsState, fromEntities.getPaginators);
export const getOfferPaginators = createSelector(getOffersState, fromEntities.getPaginators);
export const getPostPaginators  = createSelector(getPostsState, fromEntities.getPaginators);
export const getPagePaginators  = createSelector(getPagesState, fromEntities.getPaginators);
export const getAdvertisePaginators = createSelector(getAdvertisesState, fromEntities.getPaginators);

export const getTopicIsLoading = createSelector(getTopicsState, fromEntities.getIsLoading);
export const getOfferIsLoading = createSelector(getOffersState, fromEntities.getIsLoading);
export const getPostIsLoading  = createSelector(getPostsState, fromEntities.getIsLoading);
export const getPageIsLoading  = createSelector(getPagesState, fromEntities.getIsLoading);
export const getAdvertiseIsLoading = createSelector(getAdvertisesState, fromEntities.getIsLoading);

export const getTopicEntities = createSelector(getTopicsState, fromEntities.getEntities);
export const getOfferEntities = createSelector(getOffersState, fromEntities.getEntities);
export const getPostEntities  = createSelector(getPostsState, fromEntities.getEntities);
export const getPageEntities  = createSelector(getPagesState, fromEntities.getEntities);
export const getAdvertiseEntities = createSelector(getAdvertisesState, fromEntities.getEntities);

export const getTopicKeys = createSelector(getTopicsState, fromEntities.getKeys);
export const getOfferKeys = createSelector(getOffersState, fromEntities.getKeys);
export const getPostKeys  = createSelector(getPostsState, fromEntities.getKeys);
export const getPageKeys  = createSelector(getPagesState, fromEntities.getKeys);
export const getAdvertiseKeys = createSelector(getAdvertisesState, fromEntities.getKeys);

// Helper projector which product object: {[key:string]: Entity[]}
export const entitiesProjector = (entities, ids, keys) =>
    keys.map(key => {return {[key]: ids[key].map(id => entities[id])};})
        .reduce((entities, entity) => {
            let key = Object.keys(entity)[0];
            entities[key] = entity[key];
            return entities;
        }, {/* Empty object as initial value */});

export const getTopics = createSelector(
    getTopicEntities, getTopicIds, getTopicKeys, entitiesProjector);
export const getOffers = createSelector(
    getOfferEntities, getOfferIds, getOfferKeys, entitiesProjector);
export const getPosts = createSelector(
    getPostEntities, getPostIds, getPostKeys, entitiesProjector);
export const getPages = createSelector(
    getPageEntities, getPageIds, getPageKeys, entitiesProjector);
export const getAdvertises = createSelector(
    getAdvertiseEntities, getAdvertiseIds, getAdvertiseKeys, entitiesProjector);

// getEntities factory method
export function getEntities(etype: string) {
    switch(etype) {
        case ENTITY.TOPIC:
            return getTopics;
        case ENTITY.OFFER:
            return getOffers;
        case ENTITY.POST:
            return getPosts;
        case ENTITY.PAGE:
            return getPages;
        case ENTITY.ADVERTISE:
            return getAdvertises;
        default:
            console.error("REDUCER EXCEPTION!");
    }
}

export const getTopicsCurPage = createSelector(
    getTopicEntities, getTopicIdsCurPage, getTopicKeys, entitiesProjector);
export const getOffersCurPage = createSelector(
    getOfferEntities, getOfferIdsCurPage, getOfferKeys, entitiesProjector);
export const getPostsCurPage = createSelector(
    getPostEntities, getPostIdsCurPage, getPostKeys, entitiesProjector);
export const getPagesCurPage = createSelector(
    getPageEntities, getPageIdsCurPage, getPageKeys, entitiesProjector);
export const getAdvertisesCurPage = createSelector(
    getAdvertiseEntities, getAdvertiseIdsCurPage, getAdvertiseKeys, entitiesProjector);

// getEntitiesCurPage factory method
export function getEntitiesCurPage(etype: string) {
    switch(etype) {
        case ENTITY.TOPIC:
            return getTopicsCurPage;
        case ENTITY.OFFER:
            return getOffersCurPage;
        case ENTITY.POST:
            return getPostsCurPage;
        case ENTITY.PAGE:
            return getPagesCurPage;
        case ENTITY.ADVERTISE:
            return getAdvertisesCurPage;
        default:
            console.error("REDUCER EXCEPTION!");
    }
}

export function getPaginators(etype: string) {
    switch(etype) {
        case ENTITY.TOPIC:
            return getTopicPaginators;
        case ENTITY.OFFER:
            return getOfferPaginators;
        case ENTITY.POST:
            return getPostPaginators;
        case ENTITY.PAGE:
            return getPagePaginators;
        case ENTITY.ADVERTISE:
            return getAdvertisePaginators;
        default:
            console.error("REDUCER EXCEPTION!");
    }
}


export function getIsLoading(etype: string) {
    switch(etype) {
        case ENTITY.TOPIC:
            return getTopicIsLoading;
        case ENTITY.OFFER:
            return getOfferIsLoading;
        case ENTITY.POST:
            return getPostIsLoading;
        case ENTITY.PAGE:
            return getPageIsLoading;
        case ENTITY.ADVERTISE:
            return getAdvertiseIsLoading;
        default:
            console.error("REDUCER EXCEPTION!");
    }
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

export const getCurPage = createSelector(
    getPageEntities,
    getCurPageId,
    (entities, id) => { return id && entities[id]; }
);

export const getCurAdvertise = createSelector(
    getAdvertiseEntities,
    getCurAdvertiseId,
    (entities, id) => { return id && entities[id]; }
);
