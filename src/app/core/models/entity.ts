
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
    ATTACHMENT: 'attachment'
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
    'attachment': { selector: 'attachment',  name: '图片', slug: 'attachment' },
};

/**
 * Entity model
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
    title_cn: string;  // Topic only
    // FIXME
    categories: any; //Category[];
    // FIXME
    topics: any; //Topic[];
    content: string;
    updated_at: string;
    offers: any; // FIXME: Replace 'any' with proper type
    posts: any;
    logo: string;
    image_idx: number; // Default featured image index, starts from 1

    // Attachment only
    path: string;
    thumb_path: string;
    filename: string;
    thumbnail: any;
}


/**
 *TODO: add more attributes
 */
export interface EntityParams {
    // Some property that does not send to api server
    // TODO: Need to put some non query params into seperated interface.
    /*
    name?: string;  // display name
    style?: string; // css style
    */

    // Query parameters that will send to API server
    key: string;       // key to idx EntitiesState
    etype: string;     // Entity type
    per_page: number;  // How many entities per page
    page: number;      // Which page going to be load
    featured?: number | number[]; // Is level 1 or 2 featured entity
    topic_has_featured_offer?: boolean; // Has featured offer
    topic_type?: string; // Topic type only if when querying topics
    topic_has_offer?: boolean; // If the topic has offer associated
    topic_guid_starts?: string; // topic guid starts with character
    category?: string;  // Category this entity belongs
    topic?: string;     // Topic this entity belongs
    relations?: string[]; // Relationships to be queried together
    order_by?: string;  // Sort entites by which column
    order?: string; // Sort order: asc or desc

    position?: string; // Advertisement position

    query?: string;    // search text
}
