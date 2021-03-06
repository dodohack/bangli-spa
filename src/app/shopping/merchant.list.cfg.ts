/**
 * Defines the query parameters of entity list for merchant.list page
 */

import { ENTITY, EntityParams } from '../core/models';


export const SINGLE_PARAMS: EntityParams  = {
    key: 'default',
    etype: ENTITY.TOPIC,
    //topic_type: 'merchant', // Only query merchant topic
    topic_has_offer: true,  // Only query topic which at least has 1 offer
    per_page: 20,
    page: 1,
    order_by: 'guid',
    order: 'asc'
};
