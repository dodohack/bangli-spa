
/**
 * Entity type constant
 */
export const ENTITY = {
    INVALID: 'invalid',
    OFFER:   'offer',
    PAGE:    'page',
    TOPIC:   'topic',
    POST:    'post',
    ADVERTISE: 'advertise',
    COMMENT: 'comment',
};

/**
 * Entity name, reducer selector and its url
 */
export const ENTITY_INFO = {
    'topic':     { selector: 'topics',     name: '专题', slug: 'topic' },
    'post':      { selector: 'posts',      name: '文章', slug: 'post'  },
    'offer':     { selector: 'offers',     name: '优惠', slug: 'offer' },
    'page':      { selector: 'pages',      name: '页面', slug: 'page'  },
    'advertise': { selector: 'advertises', name: '广告', slug: 'ads'   },
    'comment':   { selector: 'comments',   name: '评论', slug: 'comment' },
};

/**
 * Entity model of topic
 */
export interface Entity {
    id: string;
    guid: string;
    channel_id: number;
    type_id: number;
    editor_id: number;
    author_id: number;
    image_id: number;
    images: any;
    type: number | string;
    status: string;
    // FIXME
    locations: any; //GeoLocation[]; // This array only contains 0 or 1 element
    title: string;
    // FIXME
    categories: any; //Category[];
    // FIXME
    topics: any; //Topic[];
    content: string;
    updated_at: string;
    offers: any; // FIXME: Replace 'any' with proper type
}


/**
 *TODO: add more attributes
 */
export interface EntityParams {
    // Some property that does not send to api server
    name?: string;  // display name
    style?: string; // css style

    // Query parameters that will send to API server
    key: string;       // key to idx EntitiesState
    etype: string;     // Entity type
    per_page: number;  // How many entities per page
    page: number;      // Which page going to be load
    featured?: boolean; // Is featured entity
    topic_has_featured_offer?: boolean; // Has featured offer
    topic_type?: string; // Topic type only if when querying topics
    topic_has_offer?: boolean; // If the topic has offer associated
    topic_guid_starts?: string; // topic guid starts with character
    category?: string;  // Category this entity belongs
    topic?: string;     // Topic this entity belongs
    relations?: string; // Relationships to be queried together
    order_by?: string;  // Sort entites by which column
    order?: string; // Sort order: asc or desc
}
