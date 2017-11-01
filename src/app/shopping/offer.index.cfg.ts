/**
 * This file defines the grouped parameters used to query offers for
 * offer's home page.
 */
import { ENTITY, EntityParams } from "../core/models";

export const GROUP_KEYS = {
    TOP_FEATURED_OFFER: 'ch_offer_top_featured_offers',
    FEATURED_BEAUTY_OFFER: 'ch_offer_beauty_featured_offers',
    FEATURED_CLOTHES_OFFER: 'ch_offer_clothes_featured_offers',
    FEATURED_JEWELLERY_OFFER: 'ch_offer_jewellery_featured_offers',
    FEATURED_HOUSEHOLD_OFFER: 'ch_offer_household_featured_offers',
    FEATURED_BOOKING_OFFER: 'ch_offer_booking_featured_offers',
};

/**
 * Client side display parameters
 */
export const DISPLAY_PARAMS = [
    {
        key: GROUP_KEYS.FEATURED_BEAUTY_OFFER,
        category: 'beauty-health',
        title: '医药美妆优惠推荐'
    },
    {
        key: GROUP_KEYS.FEATURED_CLOTHES_OFFER,
        category: 'clothes-bag',
        title: '服饰箱包优惠推荐'
    },
    {
        key: GROUP_KEYS.FEATURED_JEWELLERY_OFFER,
        category: 'jewellery-watch',
        title: '珠宝腕表优惠推荐'
    },
    {
        key: GROUP_KEYS.FEATURED_HOUSEHOLD_OFFER,
        category: 'household',
        title: '日用百货优惠推荐'
    },
    {
        key: GROUP_KEYS.FEATURED_BOOKING_OFFER,
        category: 'booking',
        title: '票务预订优惠推荐'
    },
];


// 8 featured offers
export const FEATURED_OFFER: EntityParams = {
    key: GROUP_KEYS.TOP_FEATURED_OFFER,
    //name: '推荐优惠',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 2, // Only query top featured topic
    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 8,
    page: 1,
    order_by: 'updated_at',
    order: 'desc',
    // Query offers with their topic
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

// 8 featured offers of beauty-health category
export const FEATURED_BEAUTY_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_BEAUTY_OFFER,

    category: 'beauty-health',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 1, // Only query featured topic
    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 8,
    page: 1,
    order_by: 'updated_at',
    order: 'desc',
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

export const FEATURED_CLOTHES_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_CLOTHES_OFFER,

    category: 'clothes-bag',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 1, // Only query featured topic
    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 8,
    page: 1,
    order_by: 'updated_at',
    order: 'desc',
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

export const FEATURED_JEWELLERY_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_JEWELLERY_OFFER,

    category: 'jewellery-watch',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 1, // Only query featured topic

    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 4,
    page: 1,
    order_by: 'updated_at',
    order: 'desc',
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

export const FEATURED_HOUSEHOLD_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_HOUSEHOLD_OFFER,

    category: 'household',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 1, // Only query featured topic

    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 8,
    page: 1,
    order_by: 'updated_at',
    order: 'desc',
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};


export const FEATURED_BOOKING_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_BOOKING_OFFER,

    category: 'booking',
    //style: '',
    etype: ENTITY.TOPIC,
    featured: 1, // Only query featured topic

    topic_has_offer: true,
    //topic_has_featured_offer: true, // Only query topic which at least has 1 featured offer
    per_page: 8,
    page: 1,
    order_by: 'updated_at',
    order: 'desc',
    relations: [ENTITY.OFFER, ENTITY.ATTACHMENT]
};

