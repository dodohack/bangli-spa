/**
 * This file defines the grouped parameters used to query topics with
 * offers for offer category page.
 * NOTE: We are not querying offers with topics.
 */
import { ENTITY } from "../core/models";
import {EntityParams} from "../core/models/entity";

export const GROUP_KEYS = {
    CATEGORY_FEATURED_TOPIC_W_OFFER: 'ch_offer_featured_topic_w_offer',
    CATEGORY_TOPIC_W_OFFER: 'ch_offer_topic_w_offer',
};

// We have simplified the GROUP_PARAMS based on previous generation.
// In previous generation, we manually group params into sub-group so that
// we can separate big API requests into small ones. But now, we will let
// the code to decide how to divide big API requests into small ones.

// Featured topics with featured offers belongs to given category
export const FEATURED_TOPIC_PARAMS: EntityParams = {
    key: GROUP_KEYS.CATEGORY_FEATURED_TOPIC_W_OFFER,
    //name: '推荐优惠',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: [1, 2],      // Only query featured topic
    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 6,
    page: 1,
    order_by: 'published_at',
    order: 'desc',
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

// Topics with offers belongs to given category order by featured topics
// at the front.
export const TOPIC_PARAMS: EntityParams = {
    key: GROUP_KEYS.CATEGORY_TOPIC_W_OFFER,
    //name: '更多优惠',
    //style: '',
    etype: ENTITY.TOPIC,
    topic_has_offer: true, // Only query topic which at least has 1 offer
    per_page: 6,
    page: 1,
    order_by: 'ranking',
    order: 'desc',
    // NOTE: We must have ENTITY.ATTACHMENT here even we don't use it, cause
    // some topics loaded here may overwrite the featured topics.
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};
