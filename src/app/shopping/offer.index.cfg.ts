/**
 * This file defines the grouped parameters used to query offers for
 * offer's home page.
 */
import { ENTITY, EntityParams } from "../core/models";

export const GROUP_KEYS = {
    TOP_FEATURED_OFFER: 'ch_offer_top_featured_offers',
    FEATURED_BEAUTY_OFFER: 'ch_offer_beauty_featured_offers',
    FEATURED_HEALTHCARE_OFFER: 'ch_offer_healthcare_featured_offers',
    FEATURED_FASHION_OFFER: 'ch_offer_fashion_featured_offers',
};

/**
 * Client side display parameters
 */
export const DISPLAY_PARAMS = [
    {
        key: GROUP_KEYS.FEATURED_BEAUTY_OFFER,
        category: 'beauty',
        title: '药妆优惠推荐'
    },
    {
        key: GROUP_KEYS.FEATURED_HEALTHCARE_OFFER,
        category: 'healthcare',
        title: '保健品优惠推荐'
    },
    {
        key: GROUP_KEYS.FEATURED_FASHION_OFFER,
        category: 'fashion',
        title: '时尚优惠推荐'
    }
];


// 8 featured offers
export const FEATURED_OFFER: EntityParams = {
    key: GROUP_KEYS.TOP_FEATURED_OFFER,
    //name: '推荐优惠',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 2, // Only query top featured topic
    topic_type: 'merchant',
    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 8,
    page: 1,
    order_by: 'published_at',
    order: 'desc',
    // Query offers with their topic
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

// 8 featured offers of beauty category
export const FEATURED_BEAUTY_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_BEAUTY_OFFER,
    //name: '美妆优惠',
    category: 'beauty',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 1, // Only query featured topic
    topic_type: 'merchant',
    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 8,
    page: 1,
    order_by: 'published_at',
    order: 'desc',
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

// 8 featured offers of health category
export const FEATURED_HEALTHCARE_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_HEALTHCARE_OFFER,
    //name: '保健优惠',
    category: 'healthcare',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 1, // Only query featured topic
    topic_type: 'merchant',
    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 8,
    page: 1,
    order_by: 'published_at',
    order: 'desc',
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

// 8 featured offers of fashion category
export const FEATURED_FASHION_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_FASHION_OFFER,
    //name: '服饰箱包',
    category: 'clothes-bag',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 1, // Only query featured topic
    topic_type: 'merchant',
    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 8,
    page: 1,
    order_by: 'published_at',
    order: 'desc',
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

