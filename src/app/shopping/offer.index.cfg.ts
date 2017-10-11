/**
 * This file defines the grouped parameters used to query offers for
 * offer's home page.
 */
import { ENTITY, EntityParams } from "../core/models";

export const GROUP_KEYS = {
    FEATURED_OFFER: 'ch_offer_featured_offers',
    FEATURED_BEAUTY_OFFER: 'ch_offer_beauty_featured_offers',
    FEATURED_HEALTHCARE_OFFER: 'ch_offer_healthcare_featured_offers',
    FEATURED_FASHION_OFFER: 'ch_offer_fashion_featured_offers',
};

// 6 featured offers
export const FEATURED_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_OFFER,
    name: '推荐优惠',
    style: '',
    etype: ENTITY.OFFER,
    per_page: 6,
    page: 1,
    order_by: 'published_at',
    order: 'desc',
    // Query offers with their topic
    relations: ENTITY.TOPIC
};

// 6 featured offers of beauty category
export const FEATURED_BEAUTY_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_BEAUTY_OFFER,
    name: '美妆优惠',
    category: 'beauty',
    style: '',
    etype: ENTITY.OFFER,
    per_page: 6,
    page: 1,
    order_by: 'published_at',
    order: 'desc',
    relations: ENTITY.TOPIC
};

// 6 featured offers of health category
export const FEATURED_HEALTHCARE_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_HEALTHCARE_OFFER,
    name: '保健优惠',
    category: 'healthcare',
    style: '',
    etype: ENTITY.OFFER,
    per_page: 6,
    page: 1,
    order_by: 'published_at',
    order: 'desc',
    relations: ENTITY.TOPIC
};

// 6 featured offers of fashion category
export const FEATURED_FASHION_OFFER: EntityParams = {
    key: GROUP_KEYS.FEATURED_FASHION_OFFER,
    name: '服饰箱包',
    category: 'clothes-bag',
    style: '',
    etype: ENTITY.OFFER,
    per_page: 6,
    page: 1,
    order_by: 'published_at',
    order: 'desc',
    relations: ENTITY.TOPIC
};

