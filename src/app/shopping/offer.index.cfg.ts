/**
 * This file defines the grouped parameters used to query offers for
 * offer's home page.
 */
import { ENTITY } from "../core/models";

export const GROUP_KEYS = {
    FEATURED_OFFER: 'ch_offer_featured_offers',
    FEATURED_BEAUTY_OFFER: 'ch_offer_beauty_featured_offers',
    FEATURED_HEALTHCARE_OFFER: 'ch_offer_healthcare_featured_offers',
};

export const GROUP_PARAMS = [
    // Group 1
    [
        // 6 featured offers
        {
            key: GROUP_KEYS.FEATURED_OFFER,
            name: '推荐优惠',
            style: '',
            etype: ENTITY.OFFER,
            per_page: 6,
            order_by: 'published_at',
            order: 'desc',
            // Query offers with their topic
            relations: ENTITY.TOPIC
        },
        // 6 featured offers of beauty category
        {
            key: GROUP_KEYS.FEATURED_BEAUTY_OFFER,
            name: '美妆优惠',
            category: 'beauty',
            style: '',
            etype: ENTITY.OFFER,
            per_page: 6,
            order_by: 'published_at',
            order: 'desc',
            relations: ENTITY.TOPIC
        },
        // 6 featured offers of health category
        {
            key: GROUP_KEYS.FEATURED_HEALTHCARE_OFFER,
            name: '保健优惠',
            category: 'healthcare',
            style: '',
            etype: ENTITY.OFFER,
            per_page: 6,
            order_by: 'published_at',
            order: 'desc',
            relations: ENTITY.TOPIC
        }
    ],
    // Group 2
    [

    ],
];
